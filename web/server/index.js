const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const initDependencies = require("./config/init");
const log = require("log-beautify");
const path = require("path");

// Init dotenv
dotenv.config();

// Init app
const app = express();

// CORS
app.use(cors());
app.options("*", cors());

// Set RootDir
app.use("/", express.static(path.join(__dirname, "../client/dist")));

// Set Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
require("./routes/text.routes")(app);
require("./routes/result.routes")(app);

// Initialize application dependencies
initDependencies.initStorage();

// Config https and https servers
const httpServer = http.createServer(app);

// Run servers
httpServer.listen(process.env.HTTP_PORT, () => {
  console.log(
    `HTTP Server is running: http://localhost:${process.env.HTTP_PORT}`
  );
});

// Config HTTPS server if certs exist
if (
  fs.existsSync(process.env.CERT_PATH + "privkey.pem") &&
  fs.existsSync(process.env.CERT_PATH + "cert.pem") &&
  fs.existsSync(process.env.CERT_PATH + "fullchain.pem")
) {
  const privateKey = fs.readFileSync(
    process.env.CERT_PATH + "privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    process.env.CERT_PATH + "cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(process.env.CERT_PATH + "fullchain.pem", "utf8");

  const ca_creds = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpsServer = https.createServer(ca_creds, app);

  httpsServer.listen(process.env.HTTPS_PORT, () => {
    console.log(
      `HTTPS Server is running https://localhost:${process.env.HTTPS_PORT}`
    );
  });
}

module.exports = (app) => {
  const result = require("../controllers/result.controller");

  var router = require("express").Router();

  // Add new result
  router.post("/", result.addResult);

  app.use(process.env.API_ROOT + "/result", router);
};

const { resultSchemaValidation } = require("../models/result.model");
const fs = require("fs");

exports.addResult = async (req, res) => {
  const result = req.body;

  if (!(await resultSchemaValidation(result)))
    return res.status(500).send("Received incompatible data");

  let results = JSON.parse(
    fs.readFileSync(process.env.DATA_PATH + process.env.RESULTS_FILENAME)
  );
  results.push(result);
  fs.writeFileSync(
    process.env.DATA_PATH + process.env.RESULTS_FILENAME,
    JSON.stringify(results)
  );

  res.send("Received all results");
};

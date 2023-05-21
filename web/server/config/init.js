const fs = require("fs");

exports.initStorage = () => {
  const textsModel = [
    {
      body: "One day when Wendy was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she must have looked rather delightful, for Mrs. Darling put her hand to her heart and cried - Oh, why can not you remain like this for ever?! This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.",
      lang: "en",
      title: "English",
    },
    {
      body: "Kiedy Wendy miała dwa lata, bawiła się pewnego dnia w ogrodzie: zerwała kwiatek i pobiegła z nim do swojej mamy. Przypuszczam, że musiała wyglądać zachwycająco, bo pani Darling położyła rękę na sercu i zawołała - Ach, dlaczego nie możesz pozostać taka na zawsze?! To było wszystko, co sobie powiedziały, ale od owej chwili Wendy wiedziała, że musi dorosnąć. Zawsze się o tym wie, kiedy się ma już ponad dwa lata. Dwa lata to początek końca.",
      lang: "pl",
      title: "Polish",
    },
  ];

  const resultsModel = [];

  if (!fs.existsSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME))
    fs.writeFileSync(
      process.env.DATA_PATH + process.env.TEXTS_FILENAME,
      JSON.stringify(textsModel)
    );

  if (!fs.existsSync(process.env.DATA_PATH + process.env.RESULTS_FILENAME))
    fs.writeFileSync(
      process.env.DATA_PATH + process.env.RESULTS_FILENAME,
      JSON.stringify(resultsModel)
    );
};

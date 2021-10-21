const fs = require("fs");
const path = require("path");

module.exports = {
  getData,
};

function getData(cb) {
  const filepath = path.join(__dirname, "test.json");
  fs.readFile(filepath, "utf8", (err, contents) => {
    if (err) {
      console.error(err.message);
      cb(new Error("Unable to load the file"));
      return;
    }
    try {
      const parseData = JSON.parse(contents);
      cb(null, parseData);
    } catch (parseErr) {
      console.error(err.message);
      cb(new Error("Unable to parse the data file"));
    }
  });
}

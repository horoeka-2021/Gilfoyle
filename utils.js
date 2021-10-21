const fs = require("fs");
const path = require("path");

module.exports = {
  getData, updateData
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
            console.error(parseErr);
            cb(new Error("Unable to parse the data file"));
        }
    });
}

function updateData (newData, cb){
    try {
        const stringData = JSON.stringify(newData, null, 2)
        const filepath = path.join(__dirname, "test.json");
        
        fs.writeFile(filepath, stringData, 'utf-8', (err) =>{
            if (err) {
                console.error(err.message)
                cb(new Error('oh no, its broken'))
            }
            cb()
        })
    } catch (err) {
        console.error(err.message)
        cb(new Error('oh no it didn\'t change'))
    }
}
var fs = require('fs');
var path = require('path');


function readFile(file_Name) {
  const fileName = path.join(__dirname,file_Name);
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err)
      }
      var lines = data.toString().split("\r\n");
      resolve(lines);
    })
  })
}
function getName(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}
async function makeTestData(total, init) {
  if(total === undefined || !(typeof total === "number" )){
    console.log("First argument(mandatory) must a number representing the amount of names to create!");
    process.exit();
  }

  if (init !== undefined && !(typeof init === "object")) {
    console.log("Second argument (if provided) must an object with initialization parameters");
    process.exit();
  }
  if(init && init.fileName && !(typeof init.fileName === "string")){
    console.log("Initialization Parameter 'fileName' must be a string");
    process.exit();
  }
  if(init && init.mapCallback && !(typeof init.mapCallback === "function")){
    console.log("Initialization Parameter 'mapCallback' must be a function");
    process.exit();
  }
  let fileName;
  if (init && init.fileName) {
    fileName = init.fileName;
  }

  const names = await makeDataArray(total);
  if (!init || (init && init.mapCallback === undefined)) {
    fileName = fileName || "db.json";
    fs.writeFile(fileName, JSON.stringify({ api: names }, null, 2), (err) => {
      if (err) {
        return console.log(`UPPS, could not save '${fileName}',  ${err}`);
      }
      console.log(`Created ${total} names in the file ${fileName}`)
    })
  } else if (init && init.mapCallback) {
    fileName = fileName || "db.sql";
    const mappedData = names.map(init.mapCallback).join("\n");
    fs.writeFile(fileName, mappedData, (err) => {
      if (err) {
        return console.log(`UPPS, could not save '${fileName}',  ${err}`)
      }
      console.log(`Created the file ${fileName}, using the supplied callback`)
    })
  }

}
async function makeDataArray(total) {
  const all = await Promise.all([readFile("names/males.txt"), readFile("names/females.txt"), readFile("names/surnames.txt")]);
  const genderVal = ["male", "female"];
  let names = [];
  for (let id = 0; id < total; id++) {
    const gender = genderVal[Math.round(Math.random())];
    const firstName = (gender === "male") ? getName(all[0]) : getName(all[1]);
    const lastName = getName(all[2]);
    const email = `${firstName.toLowerCase()}${Math.ceil(Math.random() * 100 + 5)}@somewhere.dk`;
    const name = { id, gender, firstName, lastName, email }
    names.push(name);
  }
  return names;
}

module.exports = makeTestData

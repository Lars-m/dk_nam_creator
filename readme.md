# dk_test_names

- Quick way to create simple, but large JSON-data samples, meant to be used with [json-server](https://www.npmjs.com/package/json-server)
- Data representa legal danish names, with gender and a fake email.

# Installation

`$ npm install dk_test_names`

### In Node.js:

```javascript
const makeTestData = require('dk_test_names');
```

```javascript
//Create 3 JSON-elements in a file db.json
makeTestData(3)
```

```javascript
//Create 3 JSON-elements in a file mySample.json
makeTestData(3,{fileName:"mySample.json"})
```
*Internally data are created as sketched below, which is how it will be reflected in the generated  data using the examples above*
```javascript
{ id: 0,gender: 'male',firstName: 'Rupendra',  lastName: 'Bendtsen',  email: 'rupendra21@somewhere.dk' }
```
*You can provide a callback to manipulate content into another (string) format, that will be written to the file, as sketched below*

```javascript
makeTestData(2,{fileName:"dbsetup.sql",arrayManipulator:m})
function m(names) {
  return names.map(n => `(${n.id},'${n.firstName} ${n.lastName}')`)
    .reduce((acc, cur, idx, src) => {
      let val = acc + "\n" + cur + (idx < src.length - 1 ? "," : ";")
      return val
    }, initValForReducer);
}
const initValForReducer = `
CREATE TABLE Names (
  id INT(6) PRIMARY KEY,
  name VARCHAR(90) NOT NULL
);
INSERT INTO names (id,name) VALUES`
```
*This will provide content as sketched below:*
```sql
CREATE TABLE Names (
  id INT(6) PRIMARY KEY,
  name VARCHAR(90) NOT NULL
);
INSERT INTO names (id,name) VALUES
(0,'Bangin Lorentzen'),
(1,'Tius Müller');
```
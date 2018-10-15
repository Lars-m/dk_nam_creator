# dk_name_creator

- Quick way to create simple, but large JSON-data samples, meant to be used with [json-server](https://www.npmjs.com/package/json-server)
- Data represent (hardcoded like this) legal danish names, with gender and a fake email.

# Installation

`$ npm install dknamecreator`

### In Node.js:

```javascript
const makeTestData = require('dknamecreator');
```

```javascript
//Create 3 JSON-elements in a file db.json
makeTestData(3)
```

```javascript
//Create 3 JSON-elements in a file mySample.json
makeTestData(3,{fileName:"mySample.json"})
```
*Internally data are creates as sketched below, which is how it will be reflected in the generated  data using the examples above*
```javascript
{ id: 0,gender: 'male',firstName: 'Rupendra',  lastName: 'Bendtsen',  email: 'rupendra21@somewhere.dk' }
```
*You can provide a callback to map into another format as sketched below*

```javascript
//Create 3 SQL-insert statements in a file called dbsetup.sql
makeTestData(3,{fileName:"dbsetup.sql",mapCallback:mapper}})
function mapper(n) {
  return `INSERT INTO names (id,gender,fullName,email) VALUES (${n.id},'${n.gender}','${n.firstName} ${n.lastName}','${n.email}');`;
}
```
*This will provide content as sketched below:*
```sql
INSERT INTO names (id,gender,fullName,email) VALUES (0,'female','Elisia Henriksen','elisia101@somewhere.dk');
...
```
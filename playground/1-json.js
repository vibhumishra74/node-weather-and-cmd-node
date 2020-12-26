const fs = require('fs')

// const info = {name:"Andrew",planet:"Earth",age:27}

const data = fs.readFileSync('1json.json')

const user1 = data.toString()

const parsejson = JSON.parse(user1)

 parsejson.name='Ram'
 parsejson.age=100

const user_name_json = JSON.stringify(parsejson);


console.log('json info: ',user1, 'parsejson: ', user_name_json);

fs.writeFileSync('1json.json',user_name_json)
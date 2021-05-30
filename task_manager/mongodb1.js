let mongodb = require('mongodb')

let MongoClient = mongodb.MongoClient

let URL = "mongodb://127.0.0.1:27017"
let dataBaseNAme = 'task-manager'

MongoClient.connect(URL,{useNewUrlParser: true,useUnifiedTopology: true },(error,client)=>{
    if(error){
        return console.log('not connected to Data Base');
    } 
    console.log('connections successful with Data Base');
    // data inserted with insertOne method
    // let db = client.db(dataBaseNAme)
    // db.collection('user').insertOne({
    //     name:'vibhu',
    //     leaning:'node'
    // })

    let db = client.db(dataBaseNAme)
    // db.collection('tasks').insertMany([{
    //     description:"started learning backend with node",
    //     status:true
    // },
    //     {description:"take the udemy course ",
    //     status:true},

    //     {description:"completed node course",
    //     status:false},

    //     {description:"having basic knowledge of react",
    //     status:true}
    //     ],(error,result)=>{
    //     if(error){
    //         return console.log('data not inserted in data base');
    //     }
    //     console.log(result.ops);
    // })
    // db.collection('tasks').updateMany({
    //     status:false 
    // }, {$set:{

    //     status:true }
    // })
    //     .then((res) =>{console.log('updated successfully',res)})
    //     .catch(err=>console.log('error:',err))

    db.collection('user').deleteOne({
        name:"vibhu"
    }).then(data=>console.log('deleted ',data))
        .catch(err =>console.log('error',err))
})
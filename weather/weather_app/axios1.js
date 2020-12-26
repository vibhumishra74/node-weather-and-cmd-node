let axios = require('axios');
let chalk = require('chalk');
let express = require('express')
let app = express()
let address 
app.get('/',async (req,res)=>{
  if(!req.query.address){
    res.send({error:'error pease provide a valid address'})
  }
    address = ()=> req.query.address
   let response = await axios.request(option(req.query.address))
   console.log(response);
   res.send(response.data)
}).listen(5500, function(err){
    if(err){
        console.log("Error in running the server ", err);
    }
    console.log(`Server up and running. Listening on port 5500`);
});
// let search = require('./../src/app')
let option = (city = 'india')=>{    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather?q='+city,
        params: {
        //   q: 'varanasi',
        // address:[req][query][address]
        //   address:address,
          // q: city(),
        //   lat: '25',
        //   lon: '83',
          // id: '2172797',
          // lang: 'null',
          // units: '"imperial"',
          // mode: 'xml, html'
        },
        headers: {
          'x-rapidapi-key': '0f712d9933msh1d1a7ea560788d9p1f3205jsn976cb6e6bd5a',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
      };
      return options
    }
    
    axios.request(option).then( function (response) {
      let parse1 = chalk.green(JSON.stringify(response.data))
      
      console.log('parse11 :-',parse1);
    }).catch(function (error) {
      // console.error('please try again',error.toJSON().message);
      console.error('please try again..',error.toJSON().message);
    });
    // option('varanasi')
    // console.log(option('varanasi'));
  /** city name for weather */
//  function city(){return search}

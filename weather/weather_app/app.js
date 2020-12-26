let axios = require('axios');
let chalk = require('chalk');
// let search = require('./../src/app')
      let option = (city="india")=>{    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather?q='+encodeURIComponent(city),
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
      
      
      axios.request(options).then( function (response) {
        let parse1 = chalk.green(JSON.stringify(response.data))
        
        console.log('parse1 :-',parse1);
      }).catch(function (error) {
        // console.error('please try again',error.toJSON().message);
        console.error('please try again..',error.toJSON().message);
      });
      return
    }
// option('=varanasi')
module.exports = option
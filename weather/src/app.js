let path = require('path')
var axios = require("axios");
var chalk = require('chalk');
var express = require('express');
let hbs = require('hbs');
let api = require('./../weather_app/app');
let app = express();

//set up static directory location
let public_directory = path.join(__dirname,'./../public');
let template_path = path.join(__dirname,'./../template/views');
let partials_path = path.join(__dirname,'./../template/partials');
// set up handler hsb engine and location
app.set('view engine', 'hbs');
// app.set('views','template')   this also work
app.set('views',template_path)
hbs.registerPartials(partials_path);
// option('varanasi')

// server looking at this 
app.use(express.static(public_directory))
app.get('/',(req,res)=>{
  res.render('index',{
    title:"Weather",
    name:"vibhu"
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:"About Me",
    name:"vibhu"
  })
});
app.get('/help',(req,res)=>{
  res.render('help',{
    name:"vibhu",
    title:"help page",
    info:"type your city name for which you are looking for "
  })
});


// module.exports = cityName




/**
 * 
 *     axios request ....................
 */

app.get('/weather',async (req,res)=>{
  if(!req.query.address){
    res.send({error:'error pease provide a valid address'})
  }
   let response = await axios.request(option(req.query.address))
   console.log(response);
   res.send(response.data)
})
let option = (city = 'india')=>{    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather?q='+encodeURIComponent(city),
        timeout: 1000*5 ,
        params: {
        //   q: 'varanasi'
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
      console.error('please type search key words and try again..');
    });
let port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`port listing at ${port}`);
})


app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:"404",
    name:"vibhu",
    msg:"Help article not found"
  })
})
app.get('*',(req,res)=>{
  res.render('404',{
    title:" 404",
    msg:" Page Not Found",
    name:"vibhu"
  })
})
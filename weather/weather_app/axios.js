let axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const express = require('express');
const app = express();
let html_file = fs.readFileSync('axios.html')

app.get('/',async (req,res)=>{
    // const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    const response = await axios.request(options)
    // let city = req.query.q 
    console.log(response);
    const str = response.toString();
    return ([res.status('200').send(response.data.name)])
    
    
})

const port = 8000;
app.listen(port, function(err){
    if(err){
        console.log("Error in running the server ", err);
    }
    console.log(`Server up and running. Listening on port ${port}`);
});


options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      q: 'varanas i',
      // q: city(),
      // lat: '0',
      // lon: '0',
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
// GET REQUEST

function getTodos() {
    axios.request(options)
      .then(res => {          
        // showOutput(res)
    })
      
    //   .then(res => console.log(res))
      .catch(err => console.error('axios..',err));

  }
  getTodos()

 showOutput=(res)=> {
    ele.innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// showOutput(res)
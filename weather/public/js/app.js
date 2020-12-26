

 let form = document.querySelector('form');
 let search = document.querySelector('input')
 let first = document.querySelector('#first')
 let second = document.querySelector('#second')

 form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let location = search.value
    first.textContent = 'Loading...';
    second.textContent = ''
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q="+location, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0f712d9933msh1d1a7ea560788d9p1f3205jsn976cb6e6bd5a",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }
    })
    .then(response => {
        // console.log(response);
        response.json().then(data=>{
            let country = JSON.stringify(data.sys.country)
            let name = JSON.stringify(data.name)
            let main_temp = JSON.stringify(data.main.temp)
            let main_feels_like = JSON.stringify(data.main.feels_like)
            let main_temp_min = JSON.stringify(data.main.temp_min)
            let main_temp_max = JSON.stringify(data.main.temp_max)
            let main_humidity = JSON.stringify(data.main.humidity)
            let weather = JSON.stringify(data.weather[0].main)
            let description = JSON.stringify(data.weather[0].description)

            first.textContent ='name of city '+name+' and country code is '+country;
            
            second.textContent = `cloude is ${description} and temp ${Math.ceil(main_temp-273)} degree, feel like ${Math.ceil(main_feels_like -273)} degree, minimum temperature is ${Math.ceil(main_temp_min - 273)} degree and max temprature is ${Math.ceil(main_temp_max - 273)} degree, humidity is ${Math.ceil(main_humidity)} `
            
            console.log(data)})
    })
    .catch(err => {
        first.textContent = err.message
        second.textContent = ` please enter the valid key `

        console.error(err);
    });
})
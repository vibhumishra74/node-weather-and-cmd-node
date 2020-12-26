const http = require("https");

const options = {
	"method": "GET",
	"hostname": "community-open-weather-map.p.rapidapi.com",
	"port": null,
	"path": "/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
	"headers": {
		"x-rapidapi-key": "0f712d9933msh1d1a7ea560788d9p1f3205jsn976cb6e6bd5a",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();
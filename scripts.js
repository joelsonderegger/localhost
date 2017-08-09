var tempUnit = "c";
var tempText = "";
var temp = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log(" Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
	console.log("Lat: " + position.coords.latitude + " Lng: " + position.coords.longitude);
	var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	$.get(url, function( data ) {
		console.log(data);
		console.log(data.name);
		$(".location-name").html( data.name );
		temp = data.main.temp;
		console.log(temp);
		$(".weather-temp").html( getTemp(temp) );
		
		// set the icon
		var src = data.weather[0].icon
		$("#weather-img").attr("src", src);
		$(".main-container").show();
	});
}

function changeTempUnit() {
	if (tempUnit === "c") {
		tempUnit = "f";
	} else {
		tempUnit = "c";
	}
	console.log(temp);
	$(".weather-temp").html(getTemp(temp));
}

function getTemp(tempc) {
	if (tempUnit === "c") {
		return Math.round(tempc) + "°C";
	} else {
		return Math.round(tempc)*1.8+32 + "°F";
	}
}

$(document).ready(function(){
	getLocation();


	$(".slider").on("click", function(){
		changeTempUnit();
	});
});
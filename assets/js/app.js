const apiKey = "ce3ca444193b92b8f1160e27760a8aee"; // A minha chave da API OpenWeatherMap
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="; //Definir a URL da API para obter os dados climáticos
const search = document.querySelector(".search input"); //Selecionar o elemento de entrada de pesquisa no DOM
const searchbtn = document.querySelector(".search button"); //Selecionar o botão de pesquisa
const icon = document.querySelector(".weathericon"); //Selecionar o ícone do clima
const currentDate = new Date(); //Obter a data e hora atual ()

//Função assíncrona para verificar o clima
async function checkWeather(loc){
    const response = await fetch(apiURL + loc + `&appid=${apiKey}`);
    let data = await response.json();

    //Conseguir calcular a hora do nascer do sol
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    //Conseguir calcular a hora do pôr do sol
    const sunsetTime = new Date(data.sys.sunset * 1000);
    //Conseguir calcular se é dia ou noite
    const isDaytime = currentDate > sunriseTime && currentDate < sunsetTime;

    document.querySelector(".location").innerHTML = data.name + " - " + data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        icon.src = isDaytime ? "assets/icons/clounds.png" : "assets/icons/cloundsnight.png";
    }
    else if(data.weather[0].main == "Clear"){
        icon.src = isDaytime ?  "assets/icons/clear.png" : "assets/icons/clearnight.png";
    }
    else if(data.weather[0].main == "Rain"){
        icon.src = isDaytime ?  "assets/icons/rain.png" : "assets/icons/rainnight.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        icon.src = isDaytime ?  "assets/icons/drezze.png" : "assets/icons/drezzenight.png";
    }
    else if(data.weather[0].main == "Mist"){
        icon.src = isDaytime ?  "assets/icons/mist.png" : "assets/icons/mistnight.png";
    }
}

// Adicionar um ouvinte de evento para a tecla Enter pressionada no campo de pesquisa
search.addEventListener('keydown', (event) => {
    // Verificar se a tecla pressionada é a tecla Enter
    if (event.keyCode === 13) {
      checkWeather(search.value);
    }
});

searchbtn.addEventListener('click', ()=> {
    //Chamando a função "checkWeather" com o valor digitado no campo de pesquisa
    checkWeather(search.value);
});
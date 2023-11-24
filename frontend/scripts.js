let counter = 2;
setInterval(() => {
    counter === 12 ? counter = 1 : counter++;
    document.querySelector('.video').src = `../assets/videos/video${counter}.mp4`;
}, 12000);

const getWeather = async (inputValue) => {
    const serverUrl = "http://localhost:3000";
    console.log(document.getElementById("input-busca").value);
    const response = await axios.post(serverUrl, { city: inputValue });
    showWeatherOnScreen(response.data[0]);
};

const input = document.getElementById("input-busca");
input.addEventListener('keyup', function (event){
    if (event.keyCode === 13) {
        const inputValue = input.value;
        isNaN(inputValue) ? getWeather(inputValue) : alert("Insira um valor válido na caixa de pesquisa");
    }
    document.addEventListener("DOMContentLoaded", () => {
        closeInput();
    });
});

const showWeatherOnScreen = (response) => {
    document.querySelector('.nome-cidade').innerHTML = `${response["name"]}`;
    document.querySelector('.temperatura').innerHTML = `${response["temperature"].toFixed(0)}°C`; /*a função tofixed é para determinar quantos numeros apos a virgula queremos, como a gnt nao quer nenhum numero apos a virgula a gente deixa o tofixed como 0*/
    document.querySelector('.maxTemperatura').innerHTML = `Máx: ${response["max"].toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `Min: ${response["min"].toFixed(0)}°C`;
    document.querySelector('.latTemperatura').innerHTML = `Lat: ${response["lat"].toFixed(0)}°`;
    document.querySelector('.lonTemperatura').innerHTML = `Lon: ${response["lon"].toFixed(0)}°`;
    document.querySelector('.descricao-cidade').innerHTML = response["description"];
    document.querySelector('.icone-tempo').src = `../assets/images/${response["weather_image"]}.png`;
};

const searchButton = () => {
    input.value.length >= 1 ? getWeather(input.value) : null;
    const visibility = document.getElementById('input-busca').style.visibility;
    visibility === 'hidden' ? openInput() : closeInput();
};

const closeInput = () => {
    input.style.width = '40px';
    input.style.visibility = 'hidden';
    input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";
};

const openInput = () => {
    input.style.visibility = 'visible';
    input.style.width = '300px';
    input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
    input.style.transition = 'all 0.5s ease-in-out 0s';
    input.value = "";
};

require('./server.js');
require('dotenv').config();

let input = document.getElementById("input-busca");
let openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const waitDomLoad = () => {
    input.addEventListener('keyup', () => {
        (event.keyCode === 13 ? () => {
                const inputValue = input.value;
                movimentoInput(inputValue);
            } : () => {
                document.addEventListener("DOMContentLoaded", () => {/*Arrow function, pesquisar sobre isso*/
                    fecharInput()
                });
                }
            )();
        }
    )
};

const searchButton = () => {
    const inputValue = input.value;
    inputMovement(inputValue);
};

const inputMovement = (inputValue) => {
    const visibility = document.getElementById('input-busca').style.visibility
    inputValue && searchCity(inputValue);
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

const searchCity = async (inputValue) => {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${openWeatherApiKey}&units=metric&lang=pt_br`);
        await (data.status === 200 ? async () => {
            const result = await data.json();
            await getTopAlbumByCountry(result.sys.country);
            showWeatherOnScreen(result);
        } : throw new Error)();
    }catch {
        alert("A pesquisadeu errado");
    }
};

const showWeatherOnScreen = (result) => {
    document.querySelector('.nome-cidade').innerHTML = `${result.name}`;
    document.querySelector('.temperatura').innerHTML = `${result.main.temp.toFixed(0)}°C`;
    document.querySelector('.maxTemperatura').innerHTML = `Máx: ${result.main.temp_max.toFixed(0)}°C`;
    document.querySelector('.minTemperatura').innerHTML = `Min: ${result.main.temp_min.toFixed(0)}°C`;
    document.querySelector('.icone-tempo').src = `./images/${result.weather[0].icon}.png`
};

const getAccessToken = async () => {
    const credentials = `${clientID}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch('https://accounts.spotify.com/api/token',{
        method: "POST",
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    }) //o fetch pode demorar um pouco por isso ele tem que aguardar o fetch ser executado
    const data = await response.json()
    return data.access_token;
};

const getTopAlbumByCountry = async (country) => {
    try{
        const accessToken = await getAccessToken();
        const currentDate = getCurrentDate();
        const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${currentDate}T09%3A00%3A00&limit=3`;
        const result = await fetch(`${url}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if( result.status === 200){
            const data = await result.json()
            const result = data.playlists.items.map(item => ({
                        name: item.name,
                        image: item.images[0].url
                    }
                )
            )// o método map percorre por todos os meus objetos
            console.log(result)
            mostrarMusicaNaTela(result);
        }
        else{
            throw new Error
        }
    }
    catch {
        alert("A pesquisa por MÚSICA deu errado!")
    }
};

const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`
};

const ulElement = document.querySelector('.playlist-caixa');
const liElement = ulElement.querySelectorAll('li');

const getMusicOnScreen = (data) => {
    liElement.forEach((liElement, index) => {
        const imgElement = liElement.querySelector('img');
        const pElement = liElement.querySelector('p');
        imgElement.src = data[index].image;
        pElement.textContent = data[index].name;
    });
};


 
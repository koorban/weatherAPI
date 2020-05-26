const form = document.querySelector('#weather-form');

form.addEventListener('submit', spinner);

function spinner(e) {
    e.preventDefault();
    document.querySelector('.spinner').style.display = 'block';
    document.querySelector('#results').style.display = 'none';
    setTimeout(getWeather, 1500)
}

function getWeather() {
    
    const cityUI = document.querySelector('#city').value.trim().toLowerCase()

    let url = `http://api.weatherstack.com/current?access_key=88acb465ea5b6d435372dfe8b70a4829&query=${cityUI}`;

    let array = [];
    
    function createLi (array) {
        array.forEach(function (item) {
            let ul = document.getElementById('outputs');
            let li = document.createElement('li');
            li.textContent = `${item}`;
            ul.appendChild(li);
        })
    };

    async function getWeatherAPI () {
        try {
            let response = await axios.get(url);

            let country = response.data.location.country;
            let localTime = response.data.location.localtime;
            let temperature = response.data.current.temperature
            array.push(country);
            array.push(localTime);
            array.push(temperature);

            createLi(array);

            let cardTitle = document.querySelector('.card-title').innerHTML = cityUI[0].toUpperCase() + cityUI.slice(1);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    getWeatherAPI()

    document.querySelector('.spinner').style.display = 'none';
    document.querySelector('#results').style.display = 'block';
};  


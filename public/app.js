
const apiKey = '8917d9698fff12503bc6855626356ac3'; 

let date = new Date();
let newDate = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear(); 


document.getElementById('generate').addEventListener('click', performAction);


function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    
    getWeatherData(zipCode)
        .then(data => {
            
            return postData('http://localhost:3000/addWeatherData', {
                 temperature: data.main.temp, 
                 date: newDate, 
                 userResponse: feelings });
        })
        .then(() => {
         
            updateUI();
        })
        .catch(error => {
            console.error('Error performing action: ', error);
        });
}

const getWeatherData = async (zip) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data: ', error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error posting data: ', error);
    }
};

const updateUI = async () => {
    const request = await fetch('http://localhost:3000/all');
    try {
        const allData = await request.json();
        const latestEntry = allData[allData.length - 1]; 

        if (latestEntry) {
            document.getElementById('date').innerHTML = `Date : ${latestEntry.date}`;
            document.getElementById('temp').innerHTML = `Temperature : ${latestEntry.temperature} °C`;
            document.getElementById('content').innerHTML = `Feeling : ${latestEntry.userResponse}`;
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.log('Error updating UI: ', error);
    }
};

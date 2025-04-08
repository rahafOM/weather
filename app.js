// Personal API Key for OpenWeatherMap API
const apiKey = '&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(baseURL, zipCode, apiKey)
    .then(function(data){
        postData('/add', { temp: data.main.temp, feel: feelings, date: newDate});
        updateUI();
    })
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }  catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
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
        console.log(newData);
        return newData;
    }catch(error) {
    console.log("error", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('temp').innerHTML = `${Math.round(allData.temp)} degrees`;
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch(error) {
        console.log("error", error);
    }
}

async function getFacts() {
    let response = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
    let data = await response.json();
    let fact = data.data[0].attributes.body;
    let finalText = document.getElementById('responseBody');
    finalText.innerText = fact;
}
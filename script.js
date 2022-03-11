const ctx = document.getElementById('myChart');
ctx.style.display = 'none';
let txtHiria = document.getElementById('txtHiria');
let bilatzekoHiria;
let lat, long;
let temp, tempSens, tempMin, tempMax;



const btnStart = document.getElementById('btn').addEventListener('click', function(){
  bilatzekoHiria = txtHiria.value;
  ctx.style.display = 'block';
  getHiria(bilatzekoHiria);
});

async function getHiria(hr){
  try {
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${hr}&limit=1&appid=195824fd3a223678e885e518b934926f`)
    let data = await response.json();
    console.log(hr);
    Koordenadak = data;
    lat = Koordenadak[0].lat;
    long = Koordenadak[0].lon;
    deituAPI(lat,long);
    //return data;
  } catch (error) {
    console.log("Ha ocurrido un error buscando las coordenadas: " + error);
    alert(error);
    return error;
  };
};

async function deituAPI(latitud, longitud){
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=195824fd3a223678e885e518b934926f`)
    let data = await response.json();
    temp = parseFloat(data.main.temp);
    tempSens =parseFloat(data.main.feels_like);
    tempMin = parseFloat(data.main.temp_min);
    tempMax =parseFloat(data.main.temp_max);
    //myChart.data.datasets[0].data.push(temp, tempSens, tempMin, tempMax);
    console.log(data);
  } catch (error) {
    console.log("Ha ocurrido un error buscando la ciudad: " + error);
    alert(error);
  };
};
//let RESULTADO = deituAPI(lat, long);
//console.log(RESULTADO);



let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Temperatura', 'Sensación térmica', 'Tª Mín', 'Tª Máx'],//, 'Purple', 'Orange'],
      datasets: [{
          label: `Temperaturas en ${bilatzekoHiria}`,
          data: [temp, tempSens, tempMin, tempMax], // Hemen Tªk jarri behar, 2, 3],
          //data: [],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});
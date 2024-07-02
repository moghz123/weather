let getData = document.getElementById("getData");
let submitData = document.getElementById("submit");
let theData = "";
let theData1='';
document.addEventListener('keyup',function(e){
  if (e.key=="Enter") {
    getWeather().then(function () {
      return displayData();
    });
  }
})

function getWeather() {
 
 try{return new Promise(async function (callback) {
  let myData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=95d53145337a4c2dbac230542242806&q=${getData.value}&days=7`,
  );
  let response = await myData.json();
  theData = response;
  console.log(theData);
  callback();
});}
catch(error){
}
}
function getWeatherEtc() {
  try{
    return new Promise(async function (callback) {
      let myData = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=95d53145337a4c2dbac230542242806&q=lond`,
      );
      let response = await myData.json();
      theData1 = response;
      callback();
    });
  }
  catch(error){}
}
submitData.addEventListener("click", function () {
  getWeather().then(function () {
    return displayData();
  });
});

  getData.addEventListener("keypress", function () {
    getWeatherEtc().then(function () {
      return getWeather();
    }).then(function () {
      return displayData();
    });
  });

function displayData() {
  return new Promise(function (callback) {
    let dataArray = theData.forecast.forecastday;
  let cartona = "";
  let dataDays = new Date(dataArray[0].date);
  let weekDay1 = dataDays.toLocaleDateString('en-us', { weekday: "long" });
  let dataDay2 = new Date(dataArray[1].date);
  let weekDay2 = dataDay2.toLocaleDateString('en-us', { weekday: "long" });
  let dataDay3 = new Date(dataArray[2].date);
  let weekDay3 = dataDay3.toLocaleDateString('en-us', { weekday: "long" });
    
    cartona += `<div class="card col-md-4 ">
            <div class="card" >
                <div class="card-header d-flex justify-content-between">
                  <div>${weekDay1}</div>
                  <div>${dataArray[0].date}</div>
                </div>
                <div class="card-body d-flex justify-content-between">
                    <div>
                    <span>${theData.location.name}</span>
                        <h1 >${theData.current.temp_c}<sup>o</sup>C</h1>
                    </div>
                   
                    <div class="img">
                        <img src= 'https:${theData.current.condition.icon}' alt="">
                    </div>
                </div>
                <div>${theData.current.condition.text}</div>
                <div class="card-footer d-flex">
                    <span><img src="icon-umberella@2x.png" alt="">
                    20%
                    </span>
                    <span><img src="icon-wind@2x.png" alt="">
                        18km/h
                    </span>
                    <span><img src="icon-compass@2x.png" alt="">
                   east
                    </span>
                </div>
              </div>
        </div>
        <div class="card col-md-4 ">
            <div class="card text-center" >
                <div class="card-header ">
                 <span>${weekDay2}</span>
                </div>
                <div class="card-body ">
                    <div>
                         <div class="img">
                        <img src="https:${dataArray[1].day.condition.icon}" alt="">
                    </div>
                        <h3 >${dataArray[1].day.maxtemp_c}<sup>o</sup>C</h3>
                    </div>
                    <div>
                        <h4 >${dataArray[1].day.mintemp_c}<sup>o</sup>C</h4>
                    </div> 
                </div>
                <div>${dataArray[1].day.condition.text}</div>
              </div>
        </div>
        <div class="card col-md-4 ">
            <div class="card text-center" >
                <div class="card-header ">
                 <span>${weekDay3}</span>
                </div>
                <div class="card-body ">
                    <div>
                         <div class="img">
                        <img src="https:${dataArray[1].day.condition.icon}" alt="">
                    </div>
                        <h3 >${dataArray[2].day.maxtemp_c}<sup>o</sup>C</h3>
                    </div>
                    <div>
                        <h4 >${dataArray[2].day.mintemp_c}<sup>o</sup>C</h4>
                    </div> 
                </div>
                <div>${dataArray[2].day.condition.text}</div>
              </div>
        </div>`;

    document.getElementById("putData").innerHTML = cartona;
    callback();
  });
}

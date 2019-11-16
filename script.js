$(document).ready(function() {
  var map = AmCharts.makeChart("mapdiv", {
    type: "map",
    theme: "dark",
    projection: "mercator",
    panEventsEnabled: true,
    backgroundColor: "#535364",
    backgroundAlpha: 1,
    zoomControl: {
      zoomControlEnabled: true
    },
    dataProvider: {
      map: "worldHigh",
      getAreasFromMap: true,
      areas: []
    },
    areasSettings: {
      autoZoom: true,
      color: "#B4B4B7",
      colorSolid: "#84ADE9",
      selectedColor: "#84ADE9",
      outlineColor: "#666666",
      rollOverColor: "#9EC2F7",
      rollOverOutlineColor: "#000000"
    },
    listeners: [
      {
        event: "clickMapObject",
        method: function(event) {
          console.log(event.mapObject.id);
        }
      }
    ]
  });

  let correctAnswers = [];
  let wrongAnswers = [];

  const populateDropdown = function(options) {
    let select = document.getElementById("selectCountry");
    for (let i = 0; i < options.length; i++) {
      let opt = options[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
    }
  };

  // Todo - update host for JSON file
  $.getJSON("https://api.myjson.com/bins/1du42e.json", function(result) {
    let codes = Object.keys(result);
    let countries = Object.values(result);
    populateDropdown(countries);
    console.log(codes);
    $("#count").text(codes.length);
    let countryCode = codes[Math.floor(Math.random() * codes.length)];
    let mapObject = map.getObjectById(countryCode);
    map.clickMapObject(mapObject);
    $("#countryCode").text(countryCode);
  });
});

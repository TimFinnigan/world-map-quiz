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
    $("#selectCountry").prepend(
      "<option value='' selected='selected'></option>"
    );
    for (let i = 0; i < options.length; i++) {
      let opt = options[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      $("#selectCountry").append(el);
    }
  };

  let guessedCount = 0;

  // Todo - update host for JSON file
  $.getJSON("https://api.myjson.com/bins/1du42e.json", function(result) {
    let codes = Object.keys(result);
    let countries = Object.values(result);

    populateDropdown(countries);

    $("#count").text(codes.length);

    let randomCountry = codes[Math.floor(Math.random() * codes.length)];
    let mapObject = map.getObjectById(randomCountry);
    map.clickMapObject(mapObject);

    let country = result[randomCountry];
    $("#hint").text("Country code is: " + randomCountry);

    $("#hintButton").click(function() {
      $("#hint").show();
    });

    $("#selectCountry").change(function() {
      guessedCount++;
      
      let selected = $("#selectCountry option:selected").val();
      if (selected === country) {
        correctAnswers.push(country);
      } else {
        wrongAnswers.push(country);
      }
      $("#correctAnswers").text(correctAnswers.length);
      $("#wrongAnswers").text(wrongAnswers.length);

      codes = codes.filter(e => e !== randomCountry);

      $("#count").text(codes.length);
    });
  });
});

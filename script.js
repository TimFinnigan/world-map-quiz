$(document).ready(function () {
  var map = AmCharts.makeChart("map_container", {
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
        method: function (event) {
          console.log(event.mapObject.id);
        }
      }
    ]
  });

  let correct_answers = [];
  let wrong_answers = [];

  const populateDropdown = function (options) {
    $("#select_country").prepend(
      "<option value='' selected='selected'></option>"
    );

    for (let i = 0; i < options.length; i++) {
      let opt = options[i];
      let el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      $("#select_country").append(el);
    }
  };

  let guessedCount = 0;

  // Todo - update host for JSON file
  $.getJSON("https://api.myjson.com/bins/fdygq.json", function (result) {
    let codes = Object.keys(result);
    let countries = Object.values(result);
    let guesses = codes.length;

    populateDropdown(countries);

    $("#count").text(guesses);

    let randomCountry = codes[Math.floor(Math.random() * codes.length)];
    let mapObject = map.getObjectById(randomCountry);
    map.clickMapObject(mapObject);

    let country = result[randomCountry];
    $("#hint").text("Country code is: " + randomCountry);

    $("#hint_button").click(function () {
      $("#hint").show();
    });

    $("#select_country").change(function () {
      $("#response_container").css("display", "block");
      $("#response_container").css("margin", "11px 0");
      $("#select_country").prop("disabled", true);
      $("#next_button").css("display", "inline");
      $("#skip_button").css("display", "none");
      $("#hint_button").css("display", "none");
      $("#hint").css("display", "none");

      guessedCount++;

      let selected = $("#select_country option:selected").val();

      if (selected === country) {
        correct_answers.push(country);
        $("#response_text").text("Congrats, you got it!");
      } else {
        wrong_answers.push(country);
        $("#response_text").text("Sorry, the answer is " + country + "!");
      }

      $("#correct_answers").text(correct_answers.length);
      $("#wrong_answers").text(wrong_answers.length);

      $("#count_guessed").text(guessedCount);
      $("#count").text(guesses - guessedCount);
    });

    $("#next_button").click(function () {
      $("#response_container").css("display", "none");
      $("#response_container").css("margin-bottom", "0px")
      $("#skip_button").css("display", "inline");
      $("#hint_button").css("display", "inline");
      $("#hint").css("display", "inline");
      $("#response_text").text("");
      $("#select_country").prop("disabled", false);
      $("#hint").hide();
      $("#next_button").css("display", "none");
      $("#select_country").empty();

      delete result[randomCountry];

      codes = Object.keys(result);
      countries = Object.values(result);

      populateDropdown(countries);

      randomCountry = codes[Math.floor(Math.random() * codes.length)];
      mapObject = map.getObjectById(randomCountry);
      map.clickMapObject(mapObject);

      country = result[randomCountry];

      $("#hint").text("Country code is: " + randomCountry);
    });

    $("#skip_button").click(function () {
      $("#response_container").css("display", "none");
      $("#hint_button").css("display", "inline");
      $("#hint").css("display", "inline");
      $("#response_text").text("");
      $("#select_country").prop("disabled", false);
      $("#hint").hide();
      $("#next_button").css("display", "none");
      $("#select_country").empty();

      codes = Object.keys(result);
      countries = Object.values(result);

      populateDropdown(countries);

      randomCountry = codes[Math.floor(Math.random() * codes.length)];
      mapObject = map.getObjectById(randomCountry);
      map.clickMapObject(mapObject);

      country = result[randomCountry];

      $("#hint").text("Country code is: " + randomCountry);
    })
  });
});

$(document).ready(function(){
    var map = AmCharts.makeChart("chartdiv", {
        type: "map",
        theme: "black",
        fontSize:15,
        pathToImages:"https://www.amcharts.com/lib/3/images/",
        addClassNames: true,
        defs: {
            filter: [
                {
                    id: "blur",
                    width:"200%",
                    height:"200%",
                    x:"-50%",
                    y:"-50%",
                    feGaussianBlur: {
                        in: "SourceGraphic",
                        stdDeviation: 3
                    }
                }
            ] 
        },
        areasSettings: {
          autoZoom: false,
          rollOverOutlineColor: "#000000",
          outlineAlpha: 12,
          outlineColor: "#fff",
          outlineThickness: 0.3,
          color: "#828282",
          rollOverColor: "#022154",
          unlistedAreasAlpha: 0.2,
          unlistedAreasOutlineAlpha: 0.2,
          unlistedAreasOutlineColor: "#000000"
        },
        linesSettings: {
          color: "#000000",
          thickness: 2
        },
        dataProvider: {
          zoomLevel:1.2,
          map: "worldLow",
          getAreasFromMap: true
        },
        zoomControl: {}
      });
  });
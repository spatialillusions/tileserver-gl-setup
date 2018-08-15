// Paths to the tileserver config file (I guess you don't want to change them)
// http://tileserver.readthedocs.io/en/latest/config.html
const paths = {
  root: "",
  styles: "styles",
  mbtiles: "geodata",
  fonts: "fonts"
};

// Set paths to the styles that you want to use
const styles = [
  "osm-bright-gl/style-local.json",
  "positron-gl-style/style-local.json"
];

// This is the predefined style for the spot layer
const spottarStyle = require("./style-additions/spottar/style.json");

// File that contains the spot layer
var spottarGeodata = "./geodata/spottar.shp";

// Configuration file for tileserver, will be automatically updated so don't try to change it
const configFile = "./config.json";
var config = require(configFile);

// DON'T GO BELOW THIS LINE IF YOU DON'T KNOW WHAT YOU ARE DOING
// =============================================================
const fs = require("fs");
const shapefile = require("shapefile");
shapefile.read(spottarGeodata).then(result => {
  config.styles = {};
  config.options.paths = paths;

  // Loop over all styles and add them to config
  for (var i = 0; i < styles.length; i++) {
    var style = require("./" + paths.styles + "/" + styles[i]);
    // Add styles to to config
    config.styles[style.name.replace(/\s/g, "")] = {
      style: styles[i].replace(".json", "-spottar.json")
    };
    // Add data and style to the styles
    style.sources["geojson-spottar"] = {
      type: "geojson",
      data: result
    };
    style.layers = style.layers.concat(spottarStyle);
    const outputFilename =
      "./" + paths.styles + "/" + styles[i].replace(".json", "-spottar.json");
    // Write out updated files
    fs.writeFile(outputFilename, JSON.stringify(style, null, 2), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
    });
  }
  // Write updated config.json
  fs.writeFile(configFile, JSON.stringify(config, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("config.json SAVED TO " + configFile);
    }
  });
});

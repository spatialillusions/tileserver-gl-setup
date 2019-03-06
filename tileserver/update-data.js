const fs = require("fs");
const path = require("path");
const shapefile = require("shapefile");
const sitaware_slf = require("./sitaware_slf.js");

// Configuration file for tileserver, will be automatically updated so don't try to change it
const configFile = "./config.json";
var config = require(configFile);

const paths = {
  root: "",
  styles: "styles",
  styleAdditions: "style-additions",
  geodata: "geodata"
};

var p = "./" + paths.styles;
const styles = fs
  .readdirSync(p)
  .filter(f => fs.lstatSync(path.join(p, f)).isDirectory());

p = "./" + paths.styleAdditions;
const styleAdditions = fs
  .readdirSync(p)
  .filter(f => fs.lstatSync(path.join(p, f)).isDirectory());

var additions = [];
for (let i = 0; i <= styleAdditions.length; i++) {
  if (fs.existsSync("./" + paths.geodata + "/" + styleAdditions[i] + ".shp") || 
      fs.existsSync("./" + paths.geodata + "/" + styleAdditions[i] + ".slf")) {
    additions.push({
      baseName: styleAdditions[i],
      style: require("./" +
        paths.styleAdditions +
        "/" +
        styleAdditions[i] +
        "/style.json")
    });
  }
}

// Update config with all our styles
config.styles = {};
var styleConfigurations = [];
for (var i = 0; i < styles.length; i++) {
  styleConfigurations[i] = require("./" +
    paths.styles +
    "/" +
    styles[i] +
    "/style-local.json");
// This should be style-custom.json if we want to use spots
  config.styles[styles[i]+"-custom"] = {
    style: styles[i] + "/style-custom.json"
  };
  config.styles[styles[i]+"-local"] = {
    style: styles[i] + "/style-local.json"
  };
}

// Write updated config-custom.json
fs.writeFile(
  configFile.replace(".json", "-custom.json"),
  JSON.stringify(config, null, 2),
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Config saved to: " + configFile.replace(".json", "-custom.json")
      );
    }
  }
);

// Read the first data file
readData(0);

function readData(i) {
  var shp = "./" + paths.geodata + "/" + additions[i].baseName + ".shp";
  if (fs.existsSync(shp)){
    console.log("convert file: " + shp)
	  shapefile
	    .read(shp)
	    .then(result => {
	      for (var j = 0; j < styleConfigurations.length; j++) {
		var style = styleConfigurations[j];
		style.sources[additions[i].baseName] = {
		  type: "geojson",
		  data: result
		};
		style.layers = style.layers.concat(additions[i].style);
	      }
	      if (i < additions.length - 1) {
		// If more shp files read next one
		readData(++i);
	      } else {
		// If no more shp files write styles to disk
		writeStylesToDisk();
	      }
	    });
  }
  var slf = "./" + paths.geodata + "/" + additions[i].baseName + ".slf"
  if (fs.existsSync(slf)){
    console.log("convert file: " + slf)
      fs.readFile(slf, 'utf8',function (err, data) {
        var result = sitaware_slf(data)
	      for (var j = 0; j < styleConfigurations.length; j++) {
		var style = styleConfigurations[j];
		style.sources[additions[i].baseName] = {
		  type: "geojson",
		  data: result
		};
		style.layers = style.layers.concat(additions[i].style);
	      }
	      if (i < additions.length - 1) {
		// If more shp files read next one
		readData(++i);
	      } else {
		// If no more shp files write styles to disk
		writeStylesToDisk();
	      }
    });
  }
}

function writeStylesToDisk() {
  for (let i = 0; i < styles.length; i++) {
    const outputFilename =
      "./" + paths.styles + "/" + styles[i] + "/style-custom.json";
    // Write out updated files
    fs.writeFile(
      outputFilename,
      JSON.stringify(styleConfigurations[i], null, 2),
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Style saved to: " + outputFilename);
        }
      }
    );
  }
}

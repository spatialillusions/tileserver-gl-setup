const fs = require("fs");
const path = require("path");
const shapefile = require("shapefile");

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
  if (fs.existsSync("./" + paths.geodata + "/" + styleAdditions[i] + ".shp")) {
    additions[i] = {
      baseName: styleAdditions[i],
      style: require("./" +
        paths.styleAdditions +
        "/" +
        styleAdditions[i] +
        "/style.json")
    };
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
  config.styles[styles[i]] = {
    style: styles[i] + "/style-custom.json"
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

// Read the first SHP file
readSHP(0);

function readSHP(i) {
  shapefile
    .read("./" + paths.geodata + "/" + additions[i].baseName + ".shp")
    .then(result => {
      for (var j = 0; j < styleConfigurations.length; j++) {
        var style = styleConfigurations[j];
        style.sources["geojson-" + additions[i].baseName] = {
          type: "geojson",
          data: result
        };
        style.layers = style.layers.concat(additions[i].style);
      }
      if (i < additions[i].length - 1) {
        readSHP(i++);
      } else {
        writeStylesToDisk();
      }
    });
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

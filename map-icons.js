const fs = require("fs");
const categories = fs.readdirSync(__dirname + "/png").filter((d) => {
  if (d !== "." && d !== "..") {
    return true;
  }
  return false;
});
const iconsData = {};
const iconsFinalData = {};
const iconHost = "https://github.com/pureflexai/material-icons/tree/master/";
for (const c of categories) {
  const icons = fs.readdirSync(__dirname + "/png/" + c).filter((d) => {
    if (d !== "." && d !== "..") {
      return true;
    }
    return false;
  });
  for (const i of icons) {
    const baseFolder = "png/" + c + "/" + i + "/";
    const outlineExists = fs.existsSync(
      __dirname + "/" + baseFolder + "materialiconsoutlined"
    );
    const roundedExists = fs.existsSync(
      __dirname + "/" + baseFolder + "materialiconsround"
    );
    const twoToneExists = fs.existsSync(
      __dirname + "/" + baseFolder + "materialiconstwotone"
    );
    const sharpExists = fs.existsSync(
      __dirname + "/" + baseFolder + "materialiconssharp"
    );
    iconsData[i] = {
      category: c,
      outlined:
        outlineExists === true
          ? "png/" + c + "/" + i + "/materialiconsoutlined/48dp/2x"
          : "png/" + c + "/" + i + "/materialicons/48dp/2x",
      sharp:
        sharpExists === true
          ? "png/" + c + "/" + i + "/materialiconssharp/48dp/2x"
          : "png/" + c + "/" + i + "/materialicons/48dp/2x",
      rounded:
        roundedExists === true
          ? "png/" + c + "/" + i + "/materialiconsround/48dp/2x"
          : "png/" + c + "/" + i + "/materialicons/48dp/2x",
      twoTone:
        twoToneExists === true
          ? "png/" + c + "/" + i + "/materialiconstwotone/48dp/2x"
          : "png/" + c + "/" + i + "/materialicons/48dp/2x",
    };
  }
}
for (const i of Object.keys(iconsData)) {
  iconsFinalData[i] = {};
  const icon = iconsData[i];
  const iconTypes = Object.keys(icon);
  for (const t of iconTypes) {
    if (t === "category") {
      continue;
    }
    const typedIcon = icon[t];
    let iconFile;
    if (fs.existsSync(__dirname + "/" + typedIcon) === false) {
      iconFile = null;
    } else {
      iconFile = fs.readdirSync(__dirname + "/" + typedIcon).filter((d) => {
        if (d !== "." && d !== "..") {
          return true;
        }
        return false;
      })[0];
    }
    iconsFinalData[i][t] =
      iconFile === null ? null : iconHost + typedIcon + "/" + iconFile;
  }
}
fs.writeFileSync("./icons-map.txt", JSON.stringify(iconsFinalData, null, 2));

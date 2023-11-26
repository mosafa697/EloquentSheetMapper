import fs from "fs";
import xml2js from "xml2js";
import writeTo from "./writeTo.js";

function readFromXmlFile(from, to) {
  var parser = new xml2js.Parser();

  fs.readFile(from, "utf-8", (err, xmlData) => {
    console.log("Trying to read file...");
    if (err) console.error("Error reading XML fil", err);
    else {
      console.log("file read successfully.");
      parser.parseString(xmlData, (parseError, result) => {
        if (parseError) console.error("Error parsing XML:", parseError);
        else {
          console.log("writing to file...");
          writeTo(to, result.Workbook.Worksheet[0].Table[0].Row);
        }
      });
    }
  });
}

export default readFromXmlFile;

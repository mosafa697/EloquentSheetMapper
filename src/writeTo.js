import fs from "fs";
import govArr from "./governmentsNames.js";
import path from "path";

let governmentColumn = 'gov_key';

function getGovId(govName) {
  if (Object.keys(govArr).indexOf(govName) > -1) {
    return govArr[govName];
  }
  return null;
}

function writeTo(fileName, rows) {
  let tableName = path.parse(fileName).name;
  let headers = rows.shift();

  headers = headers.Cell.map((header) => header.Data[0]._);
  rows.forEach((row) => {
    let attributes = "";
    for (let i = 0; i < headers.length; i++) {
      attributes =
        attributes +
        `\t'${headers[i]}' => ${
          row.Cell?.[i]?.Data
            ? `${headers[i]}` == governmentColumn
              ? getGovId(`${row.Cell[i].Data[0]._}`)
              : `'${row.Cell[i].Data[0]._}'`
            : null
        },\n`;
    }
    let data = `${tableName}::create([\n` + attributes + `]); \n`;
    fs.appendFileSync(fileName, data);
  });
  console.log(`wrote ${rows.length} rows successfully`);
}

export default writeTo;

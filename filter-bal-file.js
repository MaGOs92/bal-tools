import { csvScript } from "./utils/csv.js";

csvScript(
  ["./csv_input/adresses-71.csv",
  "./csv_input/deploiement-bal.csv"],
  ([adresses71Data, deploiementBALData]) => {
    const { headers: deploiementBALHeaders, rows: deploiementBALRows } = deploiementBALData
    const { headers, rows } = adresses71Data;

    const codesInsee = deploiementBALRows.map((row) => row[0]);

    const filteredRows = rows.filter((row) => {
        const codeInsee = row[2];
        return codesInsee.includes(codeInsee);
    });

    return {
      headers,
      rows: filteredRows,
    };
  },
  "./csv_output/adresses-grand-chalon.csv"
);
import fs from "fs"
import { parse } from "csv-parse"
import { stringify as stringifySync } from 'csv-stringify/sync';


const loadData = async (filePaths) => {
    return Promise.all(filePaths.map((filePath) => {
        return new Promise((resolve, reject) => {
            const rows = [];
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ";", relax_quotes: true, relax_column_count: true }))
                .on("data", function (row) {
                    rows.push(row);
                })
                .on("end", function (row) {
                    resolve({
                        headers: rows[0],
                        rows: rows.slice(1)
                    })
                })
                .on("error", function (error) {
                    reject(error)
                });
            return rows
        })
    }))
}


const exportData = (outFilePath, data) => {
    const { headers, rows } = data
    const stringifiedData = stringifySync([headers, ...rows])
    fs.writeFileSync(outFilePath, stringifiedData)
}

const csvScript = async (inFilePaths, migrateData, outFilePath) => {
    const data = await loadData(inFilePaths)
    const migratedData = await migrateData(data)
    if (outFilePath){
        exportData(outFilePath, migratedData)
    }
}

export {
    csvScript
}

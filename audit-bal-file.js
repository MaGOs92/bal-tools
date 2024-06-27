import { csvScript } from "./utils/csv.js";

const balHeaders = [
     'id_ban_commune',
     'id_ban_toponyme',
     'id_ban_adresse',
     'cle_interop',
     "commune_insee",
     'commune_nom',
     'commune_deleguee_insee',
     'commune_deleguee_nom',
     'voie_nom',
     'lieudit_complement_nom',
     'numero',
     'suffixe',
     'position',
     'x',
     'y',
     'long',
     'lat',
     'cad_parcelles',
     'source',
     'date_der_maj',
     'certification_commune'
];


csvScript(
  ["./csv_input/bal-51454.csv"],
  ([balData]) => {
    const { headers, rows } = balData;

    const adressesToPositions = rows.reduce((acc, row, index) => {
        const curAdresse = `${row[balHeaders.indexOf('numero')]} ${row[balHeaders.indexOf('suffixe')]} ${row[balHeaders.indexOf('voie_nom')]}`;
        const curPosition = `${row[balHeaders.indexOf('position')]} ${row[balHeaders.indexOf('long')]} ${row[balHeaders.indexOf('lat')]}`
        if (!acc[curAdresse]) {
            acc[curAdresse] = [];
        } else if (acc[curAdresse].includes(curPosition)) {
            console.log('Position ' + curPosition + ' en doublon pour ladresse ' + curAdresse, ' ligne ' + index + 1)
        }
      acc[curAdresse].push(curPosition);

      return acc;
    }, {});


    console.log('Le fichier comporte ' + rows.length + ' positions')
    console.log('Le fichier comporte ' + Object.keys(adressesToPositions).length + ' adresses')

    Object.keys(adressesToPositions).filter((adresse) => adressesToPositions[adresse].length > 1).forEach((adresse) => {
        console.log(adresse + ' : ' + adressesToPositions[adresse].length + ' positions')
    })
  }
);
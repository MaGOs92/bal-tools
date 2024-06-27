const fs = require("fs");

const API_DEPOT = "https://plateforme-bal.adresse.data.gouv.fr/api-depot";

const codesInsee = [
  71003, 71005, 71019, 71051, 71076, 71078, 71081, 71102, 71107, 71109, 71117,
  71118, 71122, 71154, 71170, 71171, 71182, 71189, 71194, 71202, 71204, 71215,
  71221, 71241, 71253, 71257, 71269, 71283, 71292, 71294, 71333, 71369, 71378,
  71391, 71403, 71404, 71425, 71430, 71442, 71443, 71444, 71445, 71447, 71459,
  71475, 71480, 71496, 71502, 71520, 71555, 71585,
];

async function retriveBalFiles() {
  for (const codeInsee of codesInsee) {
    const dowloadUrl = `${API_DEPOT}/communes/${codeInsee}/current-revision/files/bal/download`;
    const balFile = await fetch(dowloadUrl);
    const csvData = await balFile.text();
    fs.writeFileSync(`./bal-${codeInsee}.csv`, csvData);
  }
}

retriveBalFiles();

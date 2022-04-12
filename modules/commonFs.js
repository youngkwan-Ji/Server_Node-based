'use strict';

const fs = require('fs');

function saveArrayToCSV(fileNm, arr){
    let csv = arr.map(e => e.join(",")).join("\n");
    fs.writeFile(fileNm + '.csv', csv, 'utf8', function(err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log('It\'s saved!');
        }
    });
}
module.exports.saveArrayToCSV = saveArrayToCSV
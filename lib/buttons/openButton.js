const {dialog} = require('electron').remote;
const fs = require('fs');
const s2m = require('../spectrum2mpe');
let filepath;
let partials;

document.getElementById('openButton').onclick = () => {
    dialog.showOpenDialog(async _filepaths => {
        if (_filepaths === undefined){
            alert("No File Selected!");
        }else if(_filepaths.length > 1){
            alert("You can select only one file.")
        }else{
            filepath = _filepaths[0];
            partials = await s2m.txtImport(filepath);            
        }
    });
};

module.exports = {filepath, partials};
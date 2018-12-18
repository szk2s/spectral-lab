const {dialog} = require('electron').remote;
const fs = require('fs');
const S2M = require('./lib/spectrum2mpe');
const environmentConfig = require('./config');
const s2m = S2M.build(environmentConfig);
const currentData = {};

document.getElementById('openButton').onclick = () => {
    dialog.showOpenDialog(async filepaths => {
        if (filepaths === undefined){
            alert("No File Selected!");
        }else if(filepaths.length > 1){
            alert("You can select only one file.")
        }else{
            currentData.partials = await s2m.txtImport(filepaths[0]);
            currentData.filepath = filepaths[0];
            
        }
    });
};


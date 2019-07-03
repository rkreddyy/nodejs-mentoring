import DirWatcher from "./dirWatcher";
const fs = require('fs');
const nodePath = require('path');
const csvjson = require('csvjson')

class Importer {
    constructor() {
        this.dirWatcher = new DirWatcher();
    }

    import(path) {
        this.dirWatcher.on('changed', (path) => {
            console.log("You got it......." + path);
            fs.readdir(path, (err, fileNames) => {
                console.log(fileNames);

            });
        });
        this.dirWatcher.watch(path, 2000);
    }

    importSync(path) {
        this.dirWatcher.on('changed', (path) => {
            fs.readdirSync(path).forEach(fileName => {
                var data = fs.readFileSync(nodePath.join(__dirname, path, fileName), { encoding : 'utf8'});
                let newFileContent = csvjson.toObject(data);
                console.log(newFileContent);
            });
        });
        this.dirWatcher.watch(path, 2000);
    }
}

export default Importer;
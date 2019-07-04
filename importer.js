const fs = require('fs');
const nodePath = require('path');
const csvjson = require('csvjson');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const readDirAsync = util.promisify(fs.readdir);

class Importer {
    constructor(dirWatcher) {
        dirWatcher.on('changed', (path) => {
            // For sychronous import
            // this.importSync(path);
            this.import(path).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    async import(path) {
        let jsonData, newFileData;
        try {
            let fileNames = await readDirAsync(path);
            for (const fileName of fileNames) {
                let data = await readFileAsync(nodePath.join(__dirname, path, fileName), { encoding: 'utf8' });
                newFileData = csvjson.toObject(data);
                jsonData = jsonData ? jsonData.concat(newFileData) : newFileData;
            }

            return jsonData;
        } catch (error) {
            console.log(error);
        }
    }

    importSync(path) {
        let jsonData, newFileData;
        fs.readdirSync(path).forEach(fileName => {
            var data = fs.readFileSync(nodePath.join(__dirname, path, fileName), { encoding: 'utf8' });
            newFileData = csvjson.toObject(data);
            jsonData = jsonData ? jsonData.concat(newFileData) : newFileData;
        });

        return jsonData;
    }
}

export default Importer;
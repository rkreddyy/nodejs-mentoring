import fs from "fs";
import nodePath from "path";
import csvjson from "csvjson";
import { promisify } from "util";
const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

class Importer {
    constructor(dirWatcher) {
        dirWatcher.on('changed', (path) => {
            // For sychronous import
            // this.importSync(path);
            this.import(path).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.error(err);
            });
        });
    }

    async import(path) {
        try {
            let jsonData = [], newFileData = [];
            let fileNames = await readDirAsync(path);
            for (const fileName of fileNames) {
                let data = await readFileAsync(nodePath.join(__dirname, path, fileName), { encoding: 'utf8' });
                newFileData = csvjson.toObject(data);
                jsonData = jsonData ? [...jsonData, ...newFileData] : newFileData;
            }

            return jsonData;
        } catch (error) {
            console.err(error);
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
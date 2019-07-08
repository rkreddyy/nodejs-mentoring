import fs from "fs";
import EventEmitter from "eventemitter3";

class DirWatcher extends EventEmitter {
    constructor() {
        super();
    }

    watch(path, delay) {
        try {
            let lastModifiedTime;
            setInterval(() => {
                let stats = fs.statSync(path);

                if (!stats.isDirectory()) {
                    throw ("Invalid folder path")
                }

                if (!lastModifiedTime) {
                    lastModifiedTime = stats.mtimeMs;
                }

                if (lastModifiedTime !== stats.mtimeMs) {
                    this.emit('changed', path);
                }
                lastModifiedTime = stats.mtimeMs;
            }, delay);
        } catch (error) {
            console.error("An internal error occured: " + error);
        }
    }
}

export default DirWatcher;


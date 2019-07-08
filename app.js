import config from "./config/config";
import { Product, User } from "./models";
import Importer from "./importer";
import DirWatcher from "./dirWatcher";

console.log("App Name: " + config.name);
new Product();
new User();

let dirWatcher = new DirWatcher();
new Importer(dirWatcher);

dirWatcher.watch("data", 2000);

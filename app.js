import config from "./config/config";
import { Product, User } from "./models";
import Importer from "./importer";

console.log("App Name: " + config.name);
new Product();
new User();

new Importer();

import config from "./config/config";
import { Product, User } from "./models";

console.log("App Name: " + config.name);

let product = new Product();
let user = new User();

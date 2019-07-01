import config from "./config/config";
import { Product, User } from "./models";

console.log("App Name: " + config.name);

new Product();
new User();

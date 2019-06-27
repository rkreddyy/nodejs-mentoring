import { config } from "./config/json"
import { Product, User } from "./models/models"

console.log("App Name: " + config.name);

let product = new Product();
let user = new User();

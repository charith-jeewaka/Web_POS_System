import CustomerDTO from "../dto/CustomerDTO.js";
import ItemDTO from "../dto/ItemDTO.js";

let customer_db = [ new CustomerDTO("C001", "Number One", "0771234567", "123 Main Street"),
    new CustomerDTO("C002", "Number two", "0719876543", "456 Park Avenue"),
    new CustomerDTO("C003", "Number three", "0755551234", "789 Oak Road"),
    new CustomerDTO("C004", "Number four", "0724445678", "321 Pine Lane")];
let item_db =[new ItemDTO("I001", "Ball Pen", 50, 200),
    new ItemDTO("I002", "Pencil HB", 30, 350),
    new ItemDTO("I003", "A4 Notebook", 120, 150),
    new ItemDTO("I008", "Marker Black", 100, 170),
    new ItemDTO("I009", "Ruler 30cm", 60, 220),
    new ItemDTO("I010", "File Cover", 25, 400)];

let order_db = [];   // all order headers
let orderItemDB = []; // all ordered items (optional if needed)

export {customer_db ,item_db , order_db , orderItemDB};
import CustomerDTO from "../dto/CustomerDTO.js";

let customer_db = [ new CustomerDTO("C001", "John Doe", "0771234567", "123 Main Street"),
    new CustomerDTO("C002", "Jane Smith", "0719876543", "456 Park Avenue"),
    new CustomerDTO("C003", "Alice Johnson", "0755551234", "789 Oak Road"),
    new CustomerDTO("C004", "Bob Williams", "0724445678", "321 Pine Lane")];
let item_db =[];

export {customer_db ,item_db};
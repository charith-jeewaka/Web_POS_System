import { customer_db , item_db } from "../db/DB.js";

function searchCustomerById(customerId) {
    return customer_db.find(customer => customer.customer_id === customerId) || null;
}
function searchItemById(itemId) {
    return item_db.find(item => item.item_id === itemId) || null;
}

export {searchCustomerById,searchItemById} ;

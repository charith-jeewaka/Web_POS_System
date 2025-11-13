import { customer_db } from "../db/DB.js";
import CustomerDTO from "../dto/CustomerDTO.js";

const generateCustomerId = () => {
    if (customer_db.length === 0) {
        return "C001";
    } else {
        // get last customer's ID (example: C005)
        const lastCustomer = customer_db[customer_db.length - 1];
        const lastId = lastCustomer.customer_id; // fix property name
        const numericPart = parseInt(lastId.substring(1)); // remove 'C'
        const newId = numericPart + 1;
        return "C" + newId.toString().padStart(3, '0'); // C006
    }
};

// Add new customer
function add_customer(id, name, phone, address) {
    const dto = new CustomerDTO(id, name, phone, address);
    customer_db.push(dto);

    // After adding → update next ID in UI
    const nextId = generateCustomerId();
    $("#generated-c-id").text(nextId);
}

// Delete customer by ID
function delete_customer(customer_id) {
    const index = customer_db.findIndex(c => c.customer_id === customer_id);
    if (index !== -1) {
        customer_db.splice(index, 1);
        return true;
    }
    return false;
}

// UPDATE customer by ID
function update_customer(customer_id, name, phone, address) {
    const customer = customer_db.find(c => c.customer_id === customer_id);
    if (!customer) return false;

    customer.customer_name = name;
    customer.phone_number = phone;
    customer.address = address;

    return true; // successfully updated
}


export { add_customer, delete_customer, generateCustomerId , update_customer };






import {item_db} from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

const generateItemId = () => {
    if (item_db.length === 0) {
        return "I001";
    } else {
        // get last Item's ID (example: I005)
        const last_item = item_db[item_db.length - 1];
        const last_id = last_item.item_id; // fix property name
        const numericPart = parseInt(last_id.substring(1)); // remove 'I'
        const new_id = numericPart + 1;
        return "I" + new_id.toString().padStart(3, '0'); // C006
    }
};

function add_item(id, name, price, qoh) {
    const item_dto = new ItemDTO(id, name, price, qoh);
    item_db.push(item_dto);

    // After adding → update next ID in UI
    const nextId = generateItemId();
    $("#generated-i-id").text(nextId);
}

export {add_item, generateItemId};

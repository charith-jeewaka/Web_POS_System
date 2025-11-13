import { item_db } from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

// Generat next id
const generateItemId = () => {
    if (item_db.length === 0) {
        return "I001";
    } else {
        const lastItem = item_db[item_db.length - 1];
        const lastId = lastItem.item_id;
        const numericPart = parseInt(lastId.substring(1));
        const newId = numericPart + 1;
        return "I" + newId.toString().padStart(3, '0');
    }
};

// add new itm
function add_item(id, name, price, qoh) {
    const item_dto = new ItemDTO(id, name, price, qoh);
    item_db.push(item_dto);
}

// delete
function delete_item(item_id) {
    const index = item_db.findIndex(i => i.item_id === item_id);
    if (index !== -1) {
        item_db.splice(index, 1);
        return true;
    }
    return false;
}

// update
function update_item(id, name, price, qoh) {
    const item = item_db.find(i => i.item_id === id);
    if (!item) return false;

    item.item_name = name;
    item.item_price = price;
    item.qoh = qoh;
    return true;
}

export { add_item, generateItemId, delete_item, update_item };

class ItemDTO {
    constructor(item_id,item_name,item_price,qoh) {
        this._item_id = item_id;
        this._item_name = item_name;
        this._item_price = item_price;
        this._qoh = qoh;
    }

    get item_id() {
        return this._item_id;
    }
    get item_name() {
        return this._item_name;
    }
    get item_price() {
        return this._item_price;
    }
    get qoh() {
        return this._qoh;
    }

    set item_id(item_id) {
        this._item_id = item_id;
    }
    set item_name(item_name) {
        this._item_name = item_name;
    }
    set item_price(item_price) {
        this._item_price = item_price;
    }
    set qoh(qoh) {
        this._qoh = qoh;
    }
}

export default ItemDTO;

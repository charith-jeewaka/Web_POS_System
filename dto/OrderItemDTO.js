class OrderItemDTO {

    constructor(order_item_id, order_item_name, order_item_unit_price, rq_qty, rq_item_sub_total, order_customer_name) {
        this._order_item_id = order_item_id;
        this._order_item_name = order_item_name;
        this._order_item_unit_price = order_item_unit_price;
        this._rq_qty = rq_qty;
        this._rq_item_sub_total = rq_item_sub_total;
        this._order_customer_name = order_customer_name;
    }

    // Getters
    get order_item_id() {
        return this._order_item_id;
    }

    get order_item_name() {
        return this._order_item_name;
    }

    get order_item_unit_price() {
        return this._order_item_unit_price;
    }

    get rq_qty() {
        return this._rq_qty;
    }

    get rq_item_sub_total() {
        return this._rq_item_sub_total;
    }

    get order_customer_name() {
        return this._order_customer_name;
    }

    // Setters
    set order_item_id(value) {
        this._order_item_id = value;
    }

    set order_item_name(value) {
        this._order_item_name = value;
    }

    set order_item_unit_price(value) {
        this._order_item_unit_price = value;
    }

    set rq_qty(value) {
        this._rq_qty = value;
    }

    set rq_item_sub_total(value) {
        this._rq_item_sub_total = value;
    }

    set order_customer_name(value) {
        this._order_customer_name = value;
    }
}
export default OrderItemDTO;

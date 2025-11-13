class CustomerDTO {
    constructor(customer_id,customer_name,phone_number,address) {
        this._customer_id = customer_id;
        this._customer_name = customer_name;
        this._phone_number = phone_number;
        this._address = address;
    }

    get customer_id() {
        return this._customer_id;
    }
    get customer_name() {
        return this._customer_name;
    }
    get phone_number() {
        return this._phone_number;
    }
    get address() {
        return this._address;
    }

    set customer_id(customer_id) {
        this._customer_id = customer_id;
    }
    set customer_name(customer_name) {
        this._customer_name = customer_name;
    }
    set phone_number(phone_number) {
        this._phone_number = phone_number;
    }
    set address(address) {
        this._address = address;
    }
}

export default CustomerDTO;

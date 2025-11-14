import {searchCustomerById ,searchItemById} from "../model/OrderModel.js";

//search customer by id
$("#btn-search-customer").on("click", function(event) {
    event.preventDefault();

    const inputId = $("#order-customer-id").val().trim();

    if (inputId === "") {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Please enter a Customer ID",
        });
        return;
    }

    const customer = searchCustomerById(inputId);

    if (customer) {
        console.log(customer.customer_name);
        $("#order-customer-name").val(customer.customer_name);
    } else {
        Swal.fire({
            icon: "error",
            title: "Error !",
            text: "Cannot Find Customer",
        });
        $("#order-customer-name").val("");
        $("#order-customer-id").val("");

    }
});
//search item by id
$("#btn-search-item").on("click", function(event) {
    event.preventDefault();

    const inputId = $("#order-item-id").val().trim();

    if (inputId === "") {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Please enter an Item ID",
        });
        return;
    }

    const item = searchItemById(inputId);

    if (item) {
        console.log(item.item_name);
        $("#order-item-name").val(item.item_name);
        $("#rq-item-qoh").val(item.qoh);
        $("#rq-item-unit-price").val(item.item_price);
    } else {
        Swal.fire({
            icon: "error",
            title: "Error !",
            text: "Cannot Find Item",
        });
        $("#order-item-name").val("");
        $("#rq-item-qoh").val("");
        $("#order-item-id").val("");
        $("#rq-item-unit-price").val("");

    }
});
//getitem sub total
$("#rq-order-qty").on("input", function () {

    let unit = $("#rq-item-unit-price").val().trim();
    let qty = $("#rq-order-qty").val().trim();

    if (unit === "") {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Please Select an Item",
        });
        $("#rq-order-qty").val("");
        return;
    }

    if (qty < 0) {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Minus Values Not Allowed",
        });
        $("#rq-order-qty").val("");
        $("#rq-qty-sub-total").val("");
        return;
    }

    let value = unit * qty;

    $("#rq-qty-sub-total").val(value);
});

$("#btn-add-to-cart").on("click", function(event) {

});

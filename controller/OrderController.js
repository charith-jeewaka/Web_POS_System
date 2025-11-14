import {searchCustomerById ,searchItemById} from "../model/OrderModel.js";

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
    } else {
        Swal.fire({
            icon: "error",
            title: "Error !",
            text: "Cannot Find Item",
        });
        $("#order-item-name").val("");
        $("#rq-item-qoh").val("");
        $("#order-item-id").val("");
    }
});

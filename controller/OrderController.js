import {searchCustomerById ,searchItemById} from "../model/OrderModel.js";
import OrderItemDTO from "../dto/OrderItemDTO.js";

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
//validate form data
function validateForm(){
    let customer = $("#order-customer-name").val().trim();
    let item = $("#order-item-name").val().trim();
    let qty = $("#rq-order-qty").val().trim();
    let stock = $("#rq-item-qoh").val().trim();

    // Check empty fields
    if (customer === "" || item === "" || qty === "" || stock === "") {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Fill All Fields To Place Order",
        });
        return;
    }

    // Convert to numbers
    qty = Number(qty);
    stock = Number(stock);

    // Zero qty not allowed
    if (qty === 0) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Quantity",
            text: "Quantity must be greater than 0",
        });
        return;
    }

    // Out of stock
    if (stock <= 0) {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Item is Out of Stock",
        });
        return;
    }

    // not much qty
    if (qty > stock) {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Requested Quantity Exceeds Available Stock",
        });
        return;
    }

    return true;

}
//clancel order
$("#btn-reset-order").on("click", function() {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#020102",
            cancelButtonColor: "#020102",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                $("#order-customer-id").prop("readonly", false);
                $("#order-table-body").empty();
                $("#rq-item-id, #rq-item-name, #rq-item-unit-price, #rq-order-qty ,#rq-item-qoh ,#order-item-name , #order-item-id , #order-customer-name , #order-customer-id").val("");
            }
        });
    })
//add to cart
$("#btn-add-to-cart").on("click", function (event) {
    if (validateForm()){
        $("#order-customer-id").prop("readonly", true);


        let orderItems = []; // Temporary array for the current order

            // Get values from UI fields
            let customerName = $("#order-customer-name").val().trim();
            let itemId = $("#order-item-id").val().trim();
            let itemName = $("#order-item-name").val().trim();
            let unitPrice = parseFloat($("#rq-item-unit-price").val().trim());
            let qty = parseInt($("#rq-order-qty").val().trim());

            let subTotal = unitPrice * qty;

            // Create OrderItemDTO object
            let orderItem = new OrderItemDTO(itemId, itemName, unitPrice, qty, subTotal, customerName);

            // Add DTO to array
            orderItems.push(orderItem);

            // Append to table
            $("#order-table-body").append(`
        <tr>
            <td>${orderItem.order_customer_name}</td>
            <td>${orderItem.order_item_id}</td>
            <td>${orderItem.order_item_name}</td>
            <td>${orderItem.order_item_unit_price.toFixed(2)}</td>
            <td>${orderItem.rq_qty}</td>
            <td>${orderItem.rq_item_sub_total.toFixed(2)}</td>
        </tr>
    `);

            // Clear input fields
            $("#rq-item-id, #rq-item-name, #rq-item-unit-price, #rq-order-qty ,#rq-item-qoh ,#order-item-name , #order-item-id").val("");


    }

});



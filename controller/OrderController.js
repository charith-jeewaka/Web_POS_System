import {searchCustomerById ,searchItemById} from "../model/OrderModel.js";
import OrderItemDTO from "../dto/OrderItemDTO.js";
import {orderItemDB , order_db} from "../db/DB.js";

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
//update grand total
function updateGrandTotal() {
    let grandTotal = 0;

    $("#order-table-body tr").each(function () {
        let subTotal = parseFloat($(this).find("td:nth-child(6)").text());
        if (!isNaN(subTotal)) {
            grandTotal += subTotal;
        }
    });

    // Update span text
    $("#cart-total").text(grandTotal.toFixed(2));
}
//add to cart
let orderItems = []; // tempory array for current order
let orders = [];       // order history array
$("#btn-add-to-cart").on("click", function (event) {
    if (validateForm()){
        $("#order-customer-id").prop("readonly", true);

            // get values from ui
            let customerName = $("#order-customer-name").val().trim();
            let itemId = $("#order-item-id").val().trim();
            let itemName = $("#order-item-name").val().trim();
            let unitPrice = parseFloat($("#rq-item-unit-price").val().trim());
            let qty = parseInt($("#rq-order-qty").val().trim());

            let subTotal = unitPrice * qty;

            // create orderitemdto object
            let orderItem = new OrderItemDTO(itemId, itemName, unitPrice, qty, subTotal, customerName);

            // Add DTO to array
            orderItems.push(orderItem);

            // append to table
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
            updateGrandTotal();
            console.log(orderItems);

            // Clear input fields
            $("#rq-item-id," +
                " #rq-item-name," +
                " #rq-item-unit-price," +
                " #rq-order-qty ,#rq-item-qoh ," +
                "#order-item-name ," +
                " #order-item-id").val(""
            );
    }

});

//place order
function placeOrder() {

    if (orderItems.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "No Items",
            text: "Please add items before placing the order."
        });
        return;
    }

    let orderId = $("#generated-o-id").val().trim();
    let customerId = $("#order-customer-id").val().trim();
    let customerName = $("#order-customer-name").val().trim();
    let date = new Date().toLocaleString();
    let total = parseFloat($("#cart-total").text());

    // Create the order header object
    let order = {
        orderId: orderId,
        customerId: customerId,
        customerName: customerName,
        date: date,
        total: total,
        items: [...orderItems]   // deep copy of cart items
    };

    // Save to DB.js arrays
    order_db.push(order); // save full bill
    // orderItemDB.push(...orderItems);

    Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Order has been successfully saved!"
    });
    console.log(order_db);

    // RESET UI
    $("#order-customer-id").prop("readonly", false);
    $("#order-table-body").empty();
    $("#rq-item-id, #rq-item-name, #rq-item-unit-price, #rq-order-qty ,#rq-item-qoh ,#order-item-name , #order-item-id , #order-customer-name , #order-customer-id").val("");

    // Reset order items array
    orderItems = [];
}

//place order on action
$("#btn-place-order").on("click", function () {

    let payment = $("#customer-payment").val();
    let total   = Number($("#cart-total").text());

    validateForm();

    // Check empty span
    if ($("#customer-payment").val() === 0) {
        Swal.fire({
            icon: "warning",
            title: "No Items",
            text: "Enter Payment"
        });
        return;
    }

    // Compare numbers
    if (payment >= total) {
        placeOrder();
        var balance = payment - total;
        $("#customer-balance").text(balance);
    } else {
        Swal.fire({
            icon: "warning",
            title: "No Items",
            text: "Not Enough Money"
        });    }
});




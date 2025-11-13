import { add_customer, delete_customer, generateCustomerId } from "../model/CustomerModel.js";
import { customer_db } from "../db/DB.js";


$(document).ready(function () {
    // Set generated ID when page loads
    $("#generated-c-id").text(generateCustomerId());

    // Save customer
    $('#btn-save-customer').on('click', function () {
        const id = $('#generated-c-id').text();
        const name = $('#c-name').val();
        const phone = $('#m-number').val();
        const address = $('#address').val();

        if (!name || !phone || !address) {   //validate save customer
            Swal.fire({
                icon: "warning",
                title: "Information",
                text: "Fill all fields",
            });
            return;
        }

        add_customer(id, name, phone, address);
        loadCustomerTable();

        //if added successfully
        Swal.fire({
            icon: "success",
            title: "successful",
            text: "Customer added successfully",
        });
        refresh_customer_page();
    });
});


// refresh page on click
$('#btn-reset-customer').on('click', function () {
    refresh_customer_page();
});



//load table
function loadCustomerTable() {
    const tbody = $('#customer-table-body');
    tbody.empty();

    customer_db.forEach(c => {
        const row = `
            <tr data-id="${c.customer_id}">
                <td>${c.customer_id}</td>
                <td>${c.customer_name}</td>
                <td>${c.phone_number}</td>
                <td>${c.address}</td>
            </tr>`;
        tbody.append(row);
    });

    $('#customer-table-body tr').on('click', function() {
        const id = $(this).data('id'); // get customer id
        fillFormById(id);
        $("#btn-save-customer").hide();

    });
}

function fillFormById(id) {
    const customer = customer_db.find(c => c.customer_id === id);
    if (!customer) return;

    // Fill the form
    $('#generated-c-id').text(customer.customer_id);
    $('#c-name').val(customer.customer_name);
    $('#m-number').val(customer.phone_number);
    $('#address').val(customer.address);

}

import { update_customer } from "../model/CustomerModel.js";

$('#btn-update-customer').on('click', function() {
    const id = $('#generated-c-id').text(); // get current ID from span
    const name = $('#c-name').val();
    const phone = $('#m-number').val();
    const address = $('#address').val();

    if (!name || !phone || !address) {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "select customer to update",
        });
        return;
    }

    const success = update_customer(id, name, phone, address);

    if (success) {
        Swal.fire({
            icon: "success",
            title: "successful",
            text: "Customer updated successfully",
        });        loadCustomerTable();
        refresh_customer_page();
        $('#generated-c-id').text(generateCustomerId()); // set next ID
    } else {
        Swal.fire({
            icon: "failed",
            title: "Error !",
            text: "Cannot Update Customer",
        });
    }
});


// refresh page
function refresh_customer_page() {
    $('#c-name').val('');
    $('#m-number').val('');
    $('#address').val('');
    loadCustomerTable();
    $("#generated-c-id").text(generateCustomerId());

    $("#btn-save-customer").show();

}

//delete customer
$('#btn-delete-customer').on('click', function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

            const id = $('#generated-c-id').text(); // Get current ID in the span

            if (delete_customer(id)) {
                refresh_customer_page();
                Swal.fire({
                    title: `Customer with ID ${id} deleted successfully.`,
                    icon: "success",
                    draggable: false
                });
                loadCustomerTable();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Cannot find customer.",
                });
            }

        }
    });
});



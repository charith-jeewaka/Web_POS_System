
// refresh page on click
import {item_db} from "../db/DB.js";
import {add_item , generateItemId} from "../model/ItemModel.js";



$('#btn-reset-item').on('click', function () {
    refresh_item_page();
});

// refresh page
function refresh_item_page() {
    $('#i-name').val('');
    $('#unit-price').val('');
    $('#qoh').val('');
    load_item_table();
    $("#generated-i-id").text(generateItemId());
    $("#btn-save-item").show();
}


$(document).ready(function () {
    // Set generated ID when page loads
    $("#generated-i-id").text(generateItemId());

    // Save customer
    $('#btn-save-item').on('click', function () {
        const id = $('#generated-i-id').text();
        const name = $('#i-name').val();
        const price = $('#unit-price').val();
            const qoh = $('#qoh').val();

        if (!name || !price || !qoh) {   //validate save customer
            Swal.fire({
                icon: "warning",
                title: "Information",
                text: "Fill all fields",
            });
            return;
        }

        add_item(id, name, price, qoh);
        load_item_table();

        //if added successfully
        Swal.fire({
            icon: "success",
            title: "successful",
            text: "Customer added successfully",
        });
        refresh_item_page();
    });
});



//load table
function load_item_table() {
    const tbody = $('#item-table-body');
    tbody.empty();

    item_db.forEach(i => {
        const row = `
            <tr data-id="${i.item_id}">
                <td>${i.item_id}</td>
                <td>${i.item_name}</td>
                <td>${i.item_price}</td>
                <td>${i.qoh}</td>
            </tr>`;
        tbody.append(row);
    });

    $('#item-table-body tr').on('click', function() {
        const id = $(this).data('id'); // get item id
        fillFormById(id);
        $("#btn-save-item").hide();
    });
}

function fillFormById(id) {
    const item = item_db.find(i => i.item_id === id);
    if (!item) return;

    // Fill the form
    $('#generated-i-id').text(item.item_id);
    $('#i-name').val(item.item_name);
    $('#unit-price').val(item.item_price);
    $('#qoh').val(item.qoh);

}

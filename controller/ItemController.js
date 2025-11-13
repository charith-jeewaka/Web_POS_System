import { item_db } from "../db/DB.js";
import { add_item, generateItemId, delete_item, update_item } from "../model/ItemModel.js";

$(document).ready(function () {
    // set generated id & load table initially
    $("#generated-i-id").text(generateItemId());
    load_item_table();

    // save item
    $('#btn-save-item').on('click', function () {
        const id = $('#generated-i-id').text();
        const name = $('#i-name').val();
        const price = $('#unit-price').val();
        const qoh = $('#qoh').val();

        if (!name || !price || !qoh) {
            Swal.fire({
                icon: "warning",
                title: "Information",
                text: "Fill all fields",
            });
            return;
        }

        add_item(id, name, price, qoh);
        Swal.fire({
            icon: "success",
            title: "Successful",
            text: "Item added successfully",
        });
        refresh_item_page();
    });
});

// load table
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

    //  on row click
    $('#item-table-body tr').on('click', function() {
        const id = $(this).data('id');
        fillFormById(id);
        $("#btn-save-item").hide();
    });
}

// fill form
function fillFormById(id) {
    const item = item_db.find(i => i.item_id === id);
    if (!item) return;

    $('#generated-i-id').text(item.item_id);
    $('#i-name').val(item.item_name);
    $('#unit-price').val(item.item_price);
    $('#qoh').val(item.qoh);
}

// refresh form
function refresh_item_page() {
    $('#i-name').val('');
    $('#unit-price').val('');
    $('#qoh').val('');
    load_item_table();
    $("#generated-i-id").text(generateItemId());
    $("#btn-save-item").show();
}

// delete item
$('#btn-delete-item').on('click', function() {
    const id = $('#generated-i-id').text();
    if (!id.startsWith('I')) {
        Swal.fire({
            icon: "warning",
            title: "Select an item to delete first!",
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: `Delete Item ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000",
        cancelButtonColor: "#000",
        confirmButtonText: "Yes, delete"
    }).then((result) => {
        if (result.isConfirmed) {
            if (delete_item(id)) {
                Swal.fire({
                    title: "Deleted!",
                    text: `Item ${id} deleted successfully.`,
                    icon: "success"
                });
                refresh_item_page();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `Cannot find Item ${id}.`,
                });
            }
        }
    });
});

// update item
$('#btn-update-item').on('click', function() {
    const id = $('#generated-i-id').text();
    const name = $('#i-name').val();
    const price = $('#unit-price').val();
    const qoh = $('#qoh').val();

    if (!name || !price || !qoh) {
        Swal.fire({
            icon: "warning",
            title: "Information",
            text: "Select an item to update",
        });
        return;
    }

    const success = update_item(id, name, price, qoh);

    if (success) {
        Swal.fire({
            icon: "success",
            title: "Successful",
            text: `Item ${id} updated successfully.`,
        });
        refresh_item_page();
    } else {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: `Cannot update Item ${id}.`,
        });
    }
});

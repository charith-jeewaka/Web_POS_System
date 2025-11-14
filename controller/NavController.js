//navigate to customer page
$('#customer-tab').on('click', function () {
    $("#item-section").removeClass("active").hide();
    $("#order-section").removeClass("active").hide();

    $("#customer-section").show();
    setTimeout(() => $("#customer-section").addClass("active"), 10); // show animation
});

//navigate to item [page]
$('#items-tab').on('click', function () {
    $("#customer-section").removeClass("active").hide();
    $("#order-section").removeClass("active").hide();

    $("#item-section").show();
    setTimeout(() => $("#item-section").addClass("active"), 10);
});

//nativate to order page
$('#place-order-tab').on('click', function () {
    $("#customer-section").removeClass("active").hide();
    $("#item-section").removeClass("active").hide();

    $("#order-section").show();
    setTimeout(() => $("#order-section").addClass("active"), 10);
});

//set time to the clock
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    document.getElementById('current-time').textContent = timeString;
}
updateTime();
setInterval(updateTime, 1000);
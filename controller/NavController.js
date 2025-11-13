$('#customer-tab').on('click', function () {
    $("#item-section").removeClass("active").hide();

    $("#customer-section").show();
    setTimeout(() => $("#customer-section").addClass("active"), 10); // trigger animation
});

$('#items-tab').on('click', function () {
    $("#customer-section").removeClass("active").hide();

    $("#item-section").show();
    setTimeout(() => $("#item-section").addClass("active"), 10);
});

$('#place-order-tab').on('click', function () {
    alert("clicked place order");
})



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
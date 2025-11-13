$("#loginForm").on("submit", function(event) {
    event.preventDefault();

    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    const validUserName = "admin";
    const validPassWord = "1";

    if (username === validUserName && password === validPassWord) {
        $("#login-section").hide().css("opacity", "0");
        $("#customer-section").show().addClass("active");
        $("#nav-bar").show();

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Username or password",
        });
    }

});
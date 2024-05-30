
function enableBtn() {
    email = document.querySelector("#email").value;
    pass = document.querySelector("#pass").value;

    if (email.length > 0 && pass.length > 0) {
        document.querySelector("#btnSubmit").className = "btn btn-success";
    } else {
        document.querySelector("#btnSubmit").className = "btn btn-success disabled";
    }

}

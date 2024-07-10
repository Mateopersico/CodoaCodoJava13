
function enableBtn() {
    const email = document.querySelector("#email").value;
    const pass = document.querySelector("#pass").value;

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    if (isValidEmail(email) && pass.length > 0) {
        document.querySelector("#btnSubmit").classList.remove("disabled");
    } else {
        document.querySelector("#btnSubmit").classList.add("disabled");
    }
}

document.querySelector("#email").addEventListener("input", enableBtn);
document.querySelector("#pass").addEventListener("input", enableBtn);
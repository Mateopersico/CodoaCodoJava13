window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("volver").style.display = "block";
    } else {
        document.getElementById("volver").style.display = "none";
    }
}

document.getElementById("volver").addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
document.getElementById("log-out").addEventListener("click", 
    function (event) {
    event.preventDefault();

    document.getElementById("banner").style.display = "block";
    document.getElementById("footer").style.display = "block";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("Learn").style.display = "none";
    document.getElementById("FAQ").style.display = "none";
});

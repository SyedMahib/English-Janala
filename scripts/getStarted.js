document.getElementById("banner").style.display = "block";
document.getElementById("footer").style.display = "block";
document.getElementById("navbar").style.display = "none";
document.getElementById("Learn").style.display = "none";
document.getElementById("FAQ").style.display = "none";




document.getElementById("get-started").addEventListener("click", 
    function(event){
        event.preventDefault();

        const userName = document.getElementById("user-name").value;
        const loginCode = document.getElementById("login-code").value;
        const convertedLoginCode = parseInt(loginCode);


        if (isNaN(userName)){
            if (convertedLoginCode === 123456){
                document.getElementById("banner").style.display = "none";
                document.getElementById("footer").style.display = "block";
                document.getElementById("navbar").style.display = "block";
                document.getElementById("Learn").style.display = "block";
                document.getElementById("FAQ").style.display = "block";
                swal.fire({
                    title: "Welcome! " + userName,
                    icon: "success"
                  });
            } else{
                swal.fire({
                    title: "Invalid Login Code!",
                    text: "Please enter a valid login code",
                    icon: "error"
                  });
            }
        } else {
            swal.fire({
                title: "Invalid User Name!",
                text: "Please enter a valid user name",
                icon: "error"
              });
        }
})

const logout = document.getElementById("logout");
console.log(logout);

logout.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.setItem("checked", "false");


    
  
});
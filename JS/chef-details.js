document.addEventListener("DOMContentLoaded", () => {
  let details_chef = JSON.parse(localStorage.getItem("chefData"));
  if (details_chef) {
    document.querySelector(".landing-title").textContent = details_chef.name;
    document.querySelector(".page-sec").textContent = details_chef.name;
    // document.querySelector(".chefs span.cont2").textContent=details_chef.name
    // document.querySelector('.page-title h2').textContent = details_chef.name;
    // document.querySelector('.chef-img img').src = details_chef.imgSrc;
    // document.querySelector('.chef-text h2').textContent = details_chef.description;
    // document.querySelector('.chef-detail h2').textContent = details_chef.name;
    // // document.querySelector('.chef-detail p').textContent = details_chef.description;

    const profileDetails = document.querySelector(".chef-content-wrapper");
    profileDetails.innerHTML = `
            <div class="chef-single-wrapper">
   <div class="chef-img">
  <img src="${details_chef.imgSrc}">
      <div class="chef-text">
 <h2>${details_chef.description}</h2>
    </div>
  </div>
<div class="chef-detail">
<h2>${details_chef.name} </h2>
<p>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                </p>
<div class="profile-detail">
 <h4>Personal Details</h4>
 <div class="details">
  <div class="chef-info">
<p>Title</p>
   <strong>: ${details_chef.description}</strong>
  </div>
  <div class="chef-info">
    <p>Recipes</p>
     <strong>: ${details_chef.recipesCount}</strong>
    </div>
                                        
                                                                
       <div class="chef-info">
     <p>Email</p>
     <strong>: ${details_chef.email}</strong>
     </div>
                                        
    <div class="chef-info">
 <p>Phone</p>
 <strong>: ${details_chef.phone}</strong> </div>
                                        
      <div class="chef-info">
    <p>Web</p>
 <strong>:${details_chef.website}</strong>
    </div>
  </div>
  </div>
    <div class="profile-footer">
     <div class="social-icon">
      <ul>
<li><a href="#" class="chef-social-network" target="_blank"><i class="fab fa-facebook"></i></a></li>
 <li><a href="#" class="chef-social-network" target="_blank"><i class="fab fa-twitter"></i></a></li>
  <li><a href="#" class="chef-social-network" target="_blank"><i class="fab fa-linkedin"></i></a></li>
            </ul>
    </div>
        </div>
         </div>
        </div>
        `;


    const socialList = document.querySelector(".social-icon ul");
    socialList.innerHTML = `
            <li><a href="#" class="chef-social-network" target="_blank"><i class="fab fa-facebook"></i></a></li>
            <li><a href="#" class="chef-social-network" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li><a href="#" class="chef-social-network" target="_blank"><i class="fab fa-linkedin"></i></a></li>
        `;
  } else {
    console.error("No chef details found in LocalStorage.");
  }
});



  document.addEventListener("DOMContentLoaded",function() {
    setTimeout(() => {
        document.querySelector(".loading-slide").style.opacity = 1;
        document.querySelector(".loading-slide").style.pointerEvents = "auto";
      }, 0);
      
      setTimeout(() => {
        document.querySelector(".loading-slide").style.opacity = 0;
      // to interact with page
        document.querySelector(".loading-slide").style.pointerEvents = "none";
      }, 2000);

  } ) ;
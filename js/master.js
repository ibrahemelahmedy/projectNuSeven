//( Check If There's Local Storage Color Option) ##########################################
let mainColors = localStorage.getItem("color_option");
// If There's Color Item In Local Storage
if (mainColors !== null) {
  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(localStorage.getItem("color_option"));

  // ******************************************************<=======for catch root's content
  document.documentElement.style.setProperty("--main-color", mainColors); 

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}
// (Random Background Optionb local storage) ###############################################################
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;
// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not EMpty
if (backgroundLocalItem !== null) {
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
// Click On Toggle Settings Gear ###########################################################
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};
// Switch Colors #############################################################################
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root *********************************<=====for catch root's content
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
      );
      
      // Set Color On Local Storage
      localStorage.setItem("color_option", e.target.dataset.color);
      
      handelActive(e);
      
  });
});

// Switch Random Background Option <<######################################################
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      
      randomizeImgs();
      
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      // *****************************************************************?????? search
      clearInterval(backgroundInterval); 
      
      localStorage.setItem("background_option", false);
    }
    handelActive(e);
  });
});
// Select Landing Page Element <<#######################################################
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url
      landingPage.style.backgroundImage=
        'url("./img/landing/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}
randomizeImgs();
//open and close menu bar in mobile media #########################################
// button menu nav
let btnBar=document.querySelector(".header-area .links-container button")
// Select links box
let linksPart=document.querySelector(".header-area .links")
//oberation to add class to make button work
btnBar.onclick=function(e){
  //make button and span like one block*******************
 e.stopPropagation()
  // add arrow menu
  btnBar.classList.toggle("arrow-menu")
// add open class when click
  linksPart.classList.toggle("open")
}
// when click on any place in page
document.addEventListener("click",function(click){
  if(click.target !==btnBar && click.target !== linksPart)
  {
    
      if(linksPart.classList.contains("open"))
      {
        // add arrow menu
    btnBar.classList.toggle("arrow-menu")
    // add open class when click
    linksPart.classList.toggle("open")
      }

  }
})
// mack links and li inside like ablock 
linksPart.onclick=function(e){
  e.stopPropagation()

}

// Select Skills Selector <<#######################################################
let ourSkills = document.querySelector(".skills");
// **************************************************<======important to select part of page
// I need to select bottom of our skills section 
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height 
  let skillsOuterHeight = ourSkills.offsetHeight;
  
  // Window Height
  let windowHeight = this.innerHeight;
  
  // Window ScrollTop 
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// Create Popup With The Image ###########################################################
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span #####################<<=== button to remove elements when click
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});
// Close Popup  ************************* OBJECT DELETE ELEMENT WITH GREATE IDAE 
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// Select All Bullets ########################################################################
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links in Header
const allLinks = document.querySelectorAll(".links a");
// **************************** To Make Soft Scroll On Selected links*********************
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      /********************************** */ 
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
// Handel Active State
function handelActive(ev) {
  // Remove Class Active From much Element
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // add class active to select Element
  ev.target.classList.add("active");
}
// #####################################################################
// Show And Headen Bullet Nav From Right
// select chosen button
let bulletBottun=document.querySelectorAll(".bullet-option span")
// select bullet nav
let bulletNav=document.querySelector(".nav-bullets")
// Get Local Storage
let buletLocalStorage=localStorage.getItem("bullet_option")
if(buletLocalStorage!==null)
{
  bulletBottun.forEach(span=>{
    span.classList.remove("active")
  })
  if(buletLocalStorage==="block")
  {
    bulletNav.style.display="block"
    document.querySelector(".bullet-option .yes").classList.add("active")
  }else{
    bulletNav.style.display="none"
    document.querySelector(".bullet-option .no").classList.add("active")
  }
}

bulletBottun.forEach(span=>{
  span.addEventListener("click",el=>{
    if(el.target.dataset.display=="block")
    {
      localStorage.setItem("bullet_option","block")
      bulletNav.style.display="block"
    }else{
      localStorage.setItem("bullet_option","none")
      bulletNav.style.display="none"
    }
    handelActive(el)
  })
})
// reset all data in local storage with button #################################
document.querySelector(".reset-option").onclick=function(){
//  localStorage.clear()
localStorage.removeItem("color_option")
localStorage.removeItem("background_option")
localStorage.removeItem("bullet_option")
//  reload page after click 
window.location.reload()
}

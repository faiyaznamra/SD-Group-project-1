/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #----START-----------------START-----------------START
      -*/


'use strict';



/**--------------------
 #add event on element
-----------------------*/

const addEventOnelem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**-------------
 # toggle navbar
----------------*/

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnelem(navToggler, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnelem(navbarLinks, "click", closeNavbar);



/**-------------------------------------
 # header active on scroll down to 100px
----------------------------------------*/

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnelem(window, "scroll", activeHeader);




/**----------
 # filter tab
-------------*/

const tabCards = document.querySelectorAll("[data-tab-card]");

tabCards.forEach(card => {
  card.addEventListener("click", () => {
    tabCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});


/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #-----END-------------------END-------------------END
      -*/
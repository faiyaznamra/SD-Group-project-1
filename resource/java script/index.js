/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #----START-----------------START-----------------START
      -*/



'use strict'; // Strict mode enabled for entire file

/**====================
 * PAYMENT MODAL SYSTEM
 *====================*/
document.addEventListener('DOMContentLoaded', function() {
  // 1. Create modal once
  const paymentModal = document.createElement('div');
  paymentModal.className = 'payment-modal';
  paymentModal.innerHTML = `
    <div class="modal-content">
      <h2>পেমেন্ট অপশন</h2>
      <div class="payment-options">
        <button class="btn btn-primary" data-method="bkash">Bkash</button>
        <button class="btn btn-secondary" data-method="nagad">Nagad</button>
        <button class="btn btn-secondary" data-method="rocket">Rocket</button>
      </div>
      <button class="close-btn">&times;</button>
    </div>
  `;
  document.body.appendChild(paymentModal);

  // 2. Payment methods data
  const paymentMethods = {
    bkash: {
      number: "01626712165",
      type: "Personal",
      instructions: "Payment confirmation screenshot required"
    },
    nagad: {
      number: "YOUR_NAGAD_NUMBER", 
      type: "Personal",
      instructions: "Include transaction ID in screenshot"
    },
    rocket: {
      number: "YOUR_ROCKET_NUMBER",
      type: "Personal",
      instructions: "Send screenshot within 1 hour"
    }
  };

  // 3. Core functions
  const showModal = () => {
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const hideModal = () => {
    paymentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  const showPaymentScreen = (method) => {
    const methodData = paymentMethods[method];
    paymentModal.querySelector('.modal-content').innerHTML = `
      <div>
        <h2>${method.toUpperCase()} Payment</h2>
        <p><strong>Number:</strong> ${methodData.number}</p>
        <p><strong>Type:</strong> ${methodData.type}</p>
        <p><strong>Instructions:</strong> ${methodData.instructions}</p>
        <button class="btn btn-primary" id="back-btn">Back to Options</button>
        <button class="close-btn">&times;</button>
      </div>
    `;
  };

  // 4. Event delegation
  document.addEventListener('click', function(e) {
    // Open modal
    if (e.target.closest('.payment-trigger')) {
      e.preventDefault();
      showModal();
    }
    
    // Close modal
    else if (e.target.closest('.close-btn')) {
      hideModal();
    }
    
    // Payment method selection
    else if (e.target.closest('[data-method]')) {
      const method = e.target.closest('[data-method]').getAttribute('data-method');
      showPaymentScreen(method);
    }
    
    // Back button
    else if (e.target.closest('#back-btn')) {
      showModal();
    }
  });
});

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
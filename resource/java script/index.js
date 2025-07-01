'use strict'; // স্ট্রিক্ট মোড চালু করা হয়েছে যাতে কোড আরও নিরাপদভাবে চলে

/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #----START-----------------START-----------------START
*/

// ========== 1. PAYMENT MODAL SYSTEM ==========
document.addEventListener('DOMContentLoaded', function () {
  // ১. একটি পেমেন্ট মডাল তৈরি করা হচ্ছে
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
  document.body.appendChild(paymentModal); // মডালটি বডিতে যুক্ত করা হচ্ছে

  // পেমেন্ট মেথডের জন্য তথ্য সংরক্ষিত একটি অবজেক্ট
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

  // মডাল দেখানোর ফাংশন
  const showModal = () => {
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // স্ক্রল বন্ধ
  };

  // মডাল লুকানোর ফাংশন
  const hideModal = () => {
    paymentModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // স্ক্রল চালু
  };

  // নির্দিষ্ট পেমেন্ট মেথড সিলেক্ট করলে তার তথ্য দেখানো
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

  // ✅ পেমেন্ট সংক্রান্ত সকল ক্লিকের জন্য ইভেন্ট লিসেনার
  document.addEventListener('click', function (e) {
    // পেমেন্ট মডাল ওপেন করা
    if (e.target.closest('.payment-btn')) {
      e.preventDefault();
      showModal();
    }

    // মডাল ক্লোজ করা
    else if (e.target.closest('.close-btn')) {
      hideModal();
    }

    // নির্দিষ্ট পেমেন্ট মেথড সিলেক্ট করলে ডিটেইল দেখানো
    else if (e.target.closest('[data-method]')) {
      const method = e.target.closest('[data-method]').getAttribute('data-method');
      showPaymentScreen(method);
    }

    // ব্যাক বাটনে ক্লিক করলে আবার অপশন লিস্ট দেখানো
    else if (e.target.closest('#back-btn')) {
      paymentModal.querySelector('.modal-content').innerHTML = `
        <h2>পেমেন্ট অপশন</h2>
        <div class="payment-options">
          <button class="btn btn-primary" data-method="bkash">Bkash</button>
          <button class="btn btn-secondary" data-method="nagad">Nagad</button>
          <button class="btn btn-secondary" data-method="rocket">Rocket</button>
        </div>
        <button class="close-btn">&times;</button>
      `;
    }
  });
});

// ========== 2. ADD EVENT UTILITY ==========
const addEventOnelem = function (elem, type, callback) {
  // যদি একাধিক উপাদান থাকে, তাহলে প্রত্যেকটির উপর ইভেন্ট যুক্ত করা
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback); // একটির উপর ইভেন্ট যুক্ত করা
  }
}

// ========== 3. TOGGLE NAVBAR ==========
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

// Navbar টগল করা (show/hide)
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnelem(navToggler, 'click', toggleNavbar);

// Navbar লিংকে ক্লিক করলে navbar বন্ধ করা
const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnelem(navbarLinks, "click", closeNavbar);

// ========== 4. HEADER ACTIVE ON SCROLL ==========
const header = document.querySelector("[data-header]");

// স্ক্রল করলে হেডারে active ক্লাস অ্যাড/রিমুভ করা
const activeHeader = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnelem(window, "scroll", activeHeader);

// ========== 5. পৃষ্ঠা SWAPPING WITH BUTTON CLICK ==========
const tabBtns = document.querySelectorAll('.tab-btn'); // ট্যাব বাটন গুলো
const tabCards = document.querySelectorAll('.tab-card'); // কনটেন্ট স্লাইড গুলো

tabBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // সব বাটন এবং কার্ড থেকে active ক্লাস রিমুভ করা
    tabBtns.forEach(b => b.classList.remove('active'));
    tabCards.forEach(c => c.classList.remove('active'));

    // নির্বাচিত বাটন এবং সংশ্লিষ্ট কনটেন্ট active করা
    btn.classList.add('active');
    tabCards[index].classList.add('active');
  });
});

/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #-----END-------------------END-------------------END
*/

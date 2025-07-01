'use strict'; // স্ট্রিক্ট মোড: এটি কোডে নির্দিষ্ট শৃঙ্খলা বজায় রাখে এবং কিছু সাধারণ ভুল ধরতে সাহায্য করে

/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #----START-----------------START-----------------START
*/

// ========== 1. PAYMENT MODAL SYSTEM ==========
// DOM পুরোপুরি লোড হওয়ার পর নিচের কোড চালু হবে
document.addEventListener('DOMContentLoaded', function () {
  
  // ১. একটি নতুন <div> তৈরি করা হচ্ছে যেটা মডাল হিসেবে কাজ করবে
  const paymentModal = document.createElement('div');
  paymentModal.className = 'payment-modal'; // মডালের জন্য CSS ক্লাস সেট
  
  // মডালের ভিতরের HTML কোড লেখা হয়েছে
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
  
  // তৈরি করা মডালটি body-র শেষে যুক্ত করা হচ্ছে
  document.body.appendChild(paymentModal);

  // পেমেন্ট মেথডের ডেটা একটি অবজেক্টে রাখা হয়েছে
  const paymentMethods = {
    bkash: {
      number: "01626712165",
      type: "Personal",
      instructions: "Payment confirmation screenshot required"
    },
    nagad: {
      number: "YOUR_NAGAD_NUMBER", // এখানে আপনার প্রকৃত নগদ নাম্বার দিতে হবে
      type: "Personal",
      instructions: "Include transaction ID in screenshot"
    },
    rocket: {
      number: "YOUR_ROCKET_NUMBER", // এখানে আপনার প্রকৃত রকেট নাম্বার দিতে হবে
      type: "Personal",
      instructions: "Send screenshot within 1 hour"
    }
  };

  // মডালটি স্ক্রিনে দেখানোর ফাংশন
  const showModal = () => {
    paymentModal.classList.add('active'); // CSS ক্লাস 'active' অ্যাড করলে মডাল দৃশ্যমান হয়
    document.body.style.overflow = 'hidden'; // পেছনের পেজ স্ক্রল বন্ধ করা হয়
  };

  // মডাল বন্ধ করার ফাংশন
  const hideModal = () => {
    paymentModal.classList.remove('active'); // 'active' ক্লাস রিমুভ করলে মডাল গায়েব হয়
    document.body.style.overflow = 'auto'; // পেছনের পেজ স্ক্রল আবার চালু হয়
  };

  // পেমেন্ট মেথড সিলেক্ট করলে তার বিস্তারিত দেখানোর ফাংশন
  const showPaymentScreen = (method) => {
    const methodData = paymentMethods[method]; // নির্বাচিত মেথড অনুযায়ী ডেটা নেয়া হয়

    // মডালের কনটেন্ট পরিবর্তন করে নির্দিষ্ট মেথডের তথ্য দেখানো হয়
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

  // সব ক্লিক ইভেন্ট একসাথে হ্যান্ডেল করা হয়েছে এখানে
  document.addEventListener('click', function (e) {
    
    // যদি ক্লিক করা হয় .payment-btn ক্লাসে, তাহলে মডাল ওপেন হবে
    if (e.target.closest('.payment-btn')) {
      e.preventDefault();
      showModal();
    }

    // যদি ক্লিক হয় .close-btn তে, তাহলে মডাল বন্ধ হবে
    else if (e.target.closest('.close-btn')) {
      hideModal();
    }

    // যদি কোন পেমেন্ট অপশন সিলেক্ট করা হয়
    else if (e.target.closest('[data-method]')) {
      const method = e.target.closest('[data-method]').getAttribute('data-method');
      showPaymentScreen(method);
    }

    // যদি ব্যাক বাটনে ক্লিক করা হয়, তাহলে আবার সব অপশন দেখানো হবে
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
// এটি একটি ইউটিলিটি ফাংশন যা একাধিক অথবা একটি এলিমেন্টে ইভেন্ট যোগ করে
const addEventOnelem = function (elem, type, callback) {
  if (elem.length > 1) {
    // যদি একাধিক এলিমেন্ট থাকে, তাদের প্রত্যেকটিতে ইভেন্ট যুক্ত করা হয়
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    // যদি একটি মাত্র এলিমেন্ট হয়
    elem.addEventListener(type, callback);
  }
}

// ========== 3. TOGGLE NAVBAR ==========
// নিচের কোডে নাভবারের টগল (open/close) ফিচার রয়েছে

const navbar = document.querySelector("[data-navbar]"); // নাভবার এলিমেন্ট
const navbarLinks = document.querySelectorAll("[data-nav-link]"); // প্রতিটি নাভ লিংক
const navToggler = document.querySelector("[data-nav-toggler]"); // নাভবার টগলার বাটন

const toggleNavbar = function () {
  navbar.classList.toggle("active"); // navbar active/inactive হবে
  navToggler.classList.toggle("active"); // toggler icon active/inactive
}

// ক্লিক করলে টগল হবে
addEventOnelem(navToggler, 'click', toggleNavbar);

// যেকোনো লিংকে ক্লিক করলে নাভবার বন্ধ হবে
const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnelem(navbarLinks, "click", closeNavbar);

// ========== 4. HEADER ACTIVE ON SCROLL ==========
// পেজ স্ক্রল করলে হেডারে একটি ক্লাস অ্যাড/রিমুভ করা হয়

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 100) {
    header.classList.add("active"); // স্ক্রল অনেক হলে active
  } else {
    header.classList.remove("active"); // উপরে গেলে remove
  }
}

// উইন্ডো স্ক্রল করলে এই ফাংশন চালু হবে
addEventOnelem(window, "scroll", activeHeader);

// ========== 5. পৃষ্ঠা SWAPPING WITH BUTTON CLICK ==========
// এখানে ট্যাব বাটনের মাধ্যমে কনটেন্ট পরিবর্তন করা হয় (যেমন: ১ম, ২য়, ৩য় পৃষ্ঠা)

const tabBtns = document.querySelectorAll('.tab-btn'); // সব ট্যাব বাটন
const tabCards = document.querySelectorAll('.tab-card'); // সংশ্লিষ্ট কনটেন্ট

tabBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // সব ট্যাব এবং কার্ড থেকে active ক্লাস মুছে ফেলা হচ্ছে
    tabBtns.forEach(b => b.classList.remove('active'));
    tabCards.forEach(c => c.classList.remove('active'));

    // ক্লিককৃত ট্যাব ও সংশ্লিষ্ট কনটেন্ট active করা হচ্ছে
    btn.classList.add('active');
    tabCards[index].classList.add('active');
  });
});

/*
        - #FAIYAZ NAMRA----------FAIYAZ NAMRA----------FAIYAZ NAMRA
        - #-----END-------------------END-------------------END
*/

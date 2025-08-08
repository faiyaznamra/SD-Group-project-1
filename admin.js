// admin.js let products = JSON.parse(localStorage.getItem('products')) || [];

const productForm = document.getElementById('product-form'); const productList = document.getElementById('product-list');

function renderProducts() { productList.innerHTML = ''; products.forEach((product, index) => { const li = document.createElement('li'); li.innerHTML = <strong>${product.title}</strong> - ৳${product.price}<br> <img src="${product.image}" alt="${product.title}" width="100"><br> ${product.description}<br> <button onclick="deleteProduct(${index})">Delete</button>; productList.appendChild(li); }); }

function deleteProduct(index) { products.splice(index, 1); localStorage.setItem('products', JSON.stringify(products)); renderProducts(); }

productForm.addEventListener('submit', function (e) { e.preventDefault();

const title = document.getElementById('title').value; const description = document.getElementById('description').value; const price = document.getElementById('price').value; const image = document.getElementById('image').value;

const newProduct = { title, description, price, image }; products.push(newProduct); localStorage.setItem('products', JSON.stringify(products)); renderProducts(); productForm.reset(); });

// Initial render renderProducts();


document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    
    if (window.location.pathname.endsWith('index.html')) {
        loadHomePage();
    } else if (window.location.pathname.endsWith('products.html')) {
        loadProductsPage();
    } else if (window.location.pathname.endsWith('cart.html')) {
        loadCartPage();
    }
});

function loadHomePage() {
    document.getElementById('main-content').innerHTML = `
        <h2>Welcome to My E-Commerce Website</h2>
        <p>Browse our products and enjoy shopping!</p>
    `;
}

async function loadProductsPage() {
    document.getElementById('main-content').innerHTML = '<h2>Products</h2>';

    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
            </div>
        `;
    });

    document.getElementById('main-content').innerHTML += productsHTML;
}

function loadCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContent = '<h2>Shopping Cart</h2>';
    if (cart.length === 0) {
        cartContent += '<p>Your cart is empty.</p>';
    } else {
        cartContent += '<ul>';
        cart.forEach(item => {
            cartContent += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
        });
        cartContent += '</ul>';
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartContent += `<p>Total: $${total.toFixed(2)}</p>`;
    }
    document.getElementById('main-content').innerHTML = cartContent;
}

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart.`);
}

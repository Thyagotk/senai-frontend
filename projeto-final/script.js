document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');

    const products = [
        { id: 1, name: 'Banho de Mar 300g', price: 100.00, image: 'imagens/01.png' },
        { id: 2, name: 'Passeio na Floresta 300g', price: 150.00, image: 'imagens/02.png' },
        { id: 3, name: 'Trio Bom dia 300g', price: 200.00, image: 'imagens/03.png' },
        { id: 4, name: 'Meus Cristais 300g', price: 250.00, image: 'imagens/04.png' },
        { id: 5, name: 'Campo de Lavanda 300g', price: 300.00, image: 'imagens/05.png' },
        { id: 6, name: 'Minha Rotina 300g', price: 350.00, image: 'imagens/06.png' },
        { id: 7, name: 'Vida no Campo 300g', price: 400.00, image: 'imagens/07.png' },
        { id: 8, name: 'Meu Momento 300g', price: 450.00, image: 'imagens/08.png' },
        { id: 9, name: 'Flores Vivas 300g', price: 500.00, image: 'imagens/09.png' }
    ];

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="overlay">
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
            <p>${product.name}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
        `;
        productList.appendChild(productElement);
    });
});

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        console.log(cart);
        alert(`Produto ${product.name} adicionado ao carrinho.`);
        updateCartUI();
    } else {
        console.error('Produto não encontrado:', productId);
    }
}

function updateCartUI() {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
                <input type="number" min="1" value="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})">Remover</button>
            `;
            cartList.appendChild(cartItem);
        });
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = quantity;
        updateCartUI();
    }
}

function sendOrder() {
    let message = 'Olá, gostaria de encomendar os seguintes produtos:\n';
    cart.forEach(item => {
        message += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `Total: R$ ${total.toFixed(2)}`;

    const whatsappURL = `https://wa.me/SEU_NUMERO_DE_WHATSAPP?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

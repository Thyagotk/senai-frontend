document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('admin-product-list');
    const apiURL = 'https://api.exemplo.com/produtos'; // Substitua pela URL da sua API

    // Carregar produtos ao iniciar
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                renderProduct(product);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const productId = document.getElementById('product-id').value;
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productImage = document.getElementById('product-image').value;

        const product = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            image: productImage
        };

        if (productId) {
            // Editar produto
            fetch(`${apiURL}/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
                .then(response => response.json())
                .then(updatedProduct => {
                    document.querySelector(`#product-${updatedProduct.id}`).remove();
                    renderProduct(updatedProduct);
                    productForm.reset();
                })
                .catch(error => console.error('Erro ao editar produto:', error));
        } else {
            // Adicionar novo produto
            fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
                .then(response => response.json())
                .then(newProduct => {
                    renderProduct(newProduct);
                    productForm.reset();
                })
                .catch(error => console.error('Erro ao adicionar produto:', error));
        }
    });

    function renderProduct(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('admin-product');
        productElement.id = `product-${product.id}`;
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
            <div class="actions">
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Excluir</button>
            </div>
        `;
        productList.appendChild(productElement);
    }

    window.editProduct = function (productId) {
        fetch(`${apiURL}/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('product-id').value = product.id;
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-image').value = product.image;
            })
            .catch(error => console.error('Erro ao buscar produto para edição:', error));
    };

    window.deleteProduct = function (productId) {
        fetch(`${apiURL}/${productId}`, {
            method: 'DELETE'
        })
            .then(() => {
                document.querySelector(`#product-${productId}`).remove();
            })
            .catch(error => console.error('Erro ao excluir produto:', error));
    };
});

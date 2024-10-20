document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const totalPagar = document.getElementById('total-pagar');
    const checkoutButton = document.getElementById('checkout');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const closeModalButton = document.getElementById('close-modal');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Carrito al cargar la página:', carrito);

    function renderCarrito() {
        carritoContainer.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="price">S/ ${producto.precio}</p>
                <div class="quantity-input">
                    <button class="decrementar" data-id="${producto.id}">-</button>
                    <input type="number" value="${producto.cantidad}" min="1" readonly>
                    <button class="incrementar" data-id="${producto.id}">+</button>
                </div>
            `;
            carritoContainer.appendChild(card);

            total += producto.precio * producto.cantidad;
        });

        totalPagar.textContent = total.toFixed(2);
        console.log('Total a pagar:', total);
    }

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    checkoutButton.addEventListener('click', () => {
        openModal();
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    });

    closeButton.addEventListener('click', closeModal);
    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    carritoContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('incrementar')) {
            const id = e.target.getAttribute('data-id');
            const index = carrito.findIndex(item => item.id === id);
            carrito[index].cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        } else if (e.target.classList.contains('decrementar')) {
            const id = e.target.getAttribute('data-id');
            const index = carrito.findIndex(item => item.id === id);
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad -= 1;
            } else {
                carrito.splice(index, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    });

    renderCarrito();
});

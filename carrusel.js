let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.querySelectorAll('.comprar').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const id = button.getAttribute('data-id');
        const nombre = productCard.querySelector('h3').textContent;
        const precio = parseFloat(productCard.querySelector('.price').textContent.replace('S/', ''));
        const imagen = productCard.querySelector('img').src;

        const producto = {
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1
        };

        // Verificar si el producto ya está en el carrito
        const index = carrito.findIndex(item => item.id === id);
        if (index > -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto agregado al carrito');
        console.log('Carrito actualizado:', carrito);
    });
});

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cartItems');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.textContent = 'Ihr Warenkorb ist leer.';
    }

    let total = 0;

    cart.forEach((entry) => {
        const lineTotal = entry.price * entry.amount;
        total += lineTotal;

        const row = document.createElement('div');
        row.classList.add('cart-row');

        const name = document.createElement('span');
        name.textContent = entry.nameDe;

        const qty = document.createElement('input');
        qty.type = 'number';
        qty.min = '1';
        qty.value = entry.amount;
        qty.addEventListener('change', () => {
            updateCartItemAmount(entry.menuItemId, parseInt(qty.value, 10));
            renderCart();
        });

        const price = document.createElement('span');
        price.textContent = lineTotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Entfernen';
        removeButton.addEventListener('click', () => {
            removeFromCart(entry.menuItemId);
            renderCart();
        });

        row.appendChild(name);
        row.appendChild(qty);
        row.appendChild(price);
        row.appendChild(removeButton);
        container.appendChild(row);
    });

    document.getElementById('cartTotal').textContent =
        total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

document.getElementById('checkoutForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
        document.getElementById('checkoutStatus').textContent = 'Ihr Warenkorb ist leer.';
        return;
    }

    const orderRequest = {
        name: document.getElementById('customerName').value,
        phoneNumber: document.getElementById('customerPhone').value,
        items: cart.map((entry) => ({ menuItemId: entry.menuItemId, amount: entry.amount }))
    };

    const statusEl = document.getElementById('checkoutStatus');

    try {
        const response = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderRequest)
        });

        if (response.ok) {
            clearCart();
            statusEl.textContent = 'Bestellung erfolgreich aufgegeben!';
            renderCart();
        } else {
            const errorBody = await response.json();
            statusEl.textContent = 'Fehler: ' + JSON.stringify(errorBody);
        }
    } catch (err) {
        statusEl.textContent = 'Server nicht erreichbar.';
    }
});

renderCart();
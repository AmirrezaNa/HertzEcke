const CART_STORAGE_KEY = 'hertzEckeCart';

function getCart() {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(menuItemId, nameDe, price) {
    const cart = getCart();
    const existing = cart.find((entry) => entry.menuItemId === menuItemId);

    if (existing) {
        existing.amount += 1;
    } else {
        cart.push({ menuItemId, nameDe, price, amount: 1 });
    }

    saveCart(cart);
}

function removeFromCart(menuItemId) {
    const cart = getCart().filter((entry) => entry.menuItemId !== menuItemId);
    saveCart(cart);
}

function updateCartItemAmount(menuItemId, amount) {
    const cart = getCart();
    const entry = cart.find((e) => e.menuItemId === menuItemId);
    if (!entry) return;

    if (amount <= 0) {
        removeFromCart(menuItemId);
        return;
    }

    entry.amount = amount;
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;

    const totalItems = getCart().reduce((sum, entry) => sum + entry.amount, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
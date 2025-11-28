function $(selector, scope = document) {
  return scope.querySelector(selector);
}
function $all(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}
function parseBRL(priceText) {
  // Ex.: "R$ 70,00" -> 70.00
  const num = priceText.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
  return parseFloat(num) || 0;
}
function formatBRL(value) {
  return value.toFixed(2).replace('.', ',');
}
function toast(message) {
  alert(message);
}

// ---------------------------
// API client
// ---------------------------
const API_BASE = (typeof window !== 'undefined' && window.API_BASE) || 'http://localhost:3000';

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
  return res.json();
}
async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ---------------------------
// Carrinho (cart.html)
// ---------------------------
function initCartPage() {
  const cartList = $('#cart-items');
  const cartTotalEl = $('#cart-total');
  const checkoutBtn = $('#checkout');

  if (!cartList || !cartTotalEl || !checkoutBtn) return;

  const cart = loadCart();
  renderCart(cart);

  checkoutBtn.addEventListener('click', async () => {
    const cartItems = loadCart();
    if (cartItems.length === 0) {
      toast('Seu carrinho está vazio.');
      return;
    }
    const payload = {
      items: cartItems.map(i => ({ title: i.title, price: i.price, qty: i.qty })),
      total: cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    };
    const res = await apiPost('/api/checkout', payload);
    if (res.success) {
      clearCart();
      renderCart([]);
      toast('Pedido realizado com sucesso!');
    } else {
      toast(res.message || 'Erro ao finalizar compra.');
    }
  });
}

function loadCart() {
  try {
    const raw = localStorage.getItem('cart_items');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(items) {
  localStorage.setItem('cart_items', JSON.stringify(items));
}
function clearCart() {
  localStorage.removeItem('cart_items');
}
function addToCart(product) {
  const items = loadCart();
  const idx = items.findIndex(i => i.title === product.title && i.price === product.price);
  if (idx >= 0) {
    items[idx].qty += 1;
  } else {
    items.push({ ...product, qty: 1 });
  }
  saveCart(items);
}
function removeFromCart(title) {
  const items = loadCart().filter(i => i.title !== title);
  saveCart(items);
}
function renderCart(items) {
  const cartList = $('#cart-items');
  const cartTotalEl = $('#cart-total');
  if (!cartList || !cartTotalEl) return;

  cartList.innerHTML = '';
  let total = 0;
  items.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    const left = document.createElement('span');
    left.textContent = `${item.title} (x${item.qty})`;
    const right = document.createElement('span');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.style.background = '#eee';
    removeBtn.style.border = '1px solid #ddd';
    removeBtn.style.borderRadius = '8px';
    removeBtn.style.padding = '6px 10px';
    removeBtn.style.cursor = 'pointer';

    removeBtn.addEventListener('click', () => {
      removeFromCart(item.title);
      renderCart(loadCart());
    });

    right.appendChild(document.createTextNode(`R$ ${formatBRL(item.price)}`));
    right.appendChild(document.createTextNode(' '));
    right.appendChild(removeBtn);

    li.appendChild(left);
    li.appendChild(right);
    cartList.appendChild(li);
  });

  cartTotalEl.textContent = total.toFixed(2);
}

// ---------------------------
// Produtos e compra (style.html)
// ---------------------------
function initStylePage() {
  const menSection = $('#men-clothes');
  const womenSection = $('#women-clothes');

  // Se existir qualquer seção de produtos, habilita "comprar" nos botões
  [menSection, womenSection].forEach(section => {
    if (!section) return;
    // Cada produto tem um button que contém img, h5, .buy e .price
    $all('.product button', section).forEach(btn => {
      btn.addEventListener('click', () => {
        const productEl = btn.closest('.product') || btn;
        const titleEl = $('h5', productEl);
        const priceEl = $('.price', productEl);
        if (!titleEl || !priceEl) return;
        const title = titleEl.textContent.trim();
        const price = parseBRL(priceEl.textContent.trim());
        addToCart({ title, price });
        toast(`Adicionado ao carrinho: ${title}`);
      });
    });
  });
}

// ---------------------------
// Validação de formulários (signin.html, signup.html)
// ---------------------------
function initSigninPage() {
  const form = $(`#bodysignin .login form`) || $('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = $('#login', form)?.value.trim();
    const password = $('#password', form)?.value;

    if (!login || !password) {
      toast('Preencha login e senha.');
      return;
    }

    // Decide se é email ou username pela presença de '@'
    const payload = login.includes('@')
      ? { email: login, password }
      : { username: login, password };

    const res = await apiPost('/api/login', payload);
    if (res.success) {
      toast('Login realizado!');
      // Exemplo: redirecionar para style.html
      window.location.href = 'style.html';
    } else {
      toast(res.message || 'Falha no login.');
    }
  });
}

function initSignupPage() {
  const form = $(`#bodysignup .register form`) || $('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = $('#username', form)?.value.trim();
    const email = $('#email', form)?.value.trim();
    const password = $('#password', form)?.value;

    if (!username || !email || !password) {
      toast('Preencha todos os campos.');
      return;
    }

    // Validações adicionais no frontend (além do pattern do HTML)
    if (username.length < 4) {
      toast('Nome de usuário deve ter pelo menos 4 caracteres.');
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      toast('Email inválido.');
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!?#%*&$@]).{8,}/.test(password)) {
      toast('Senha fraca. Inclua maiúscula, minúscula, número e símbolo.');
      return;
    }

    const res = await apiPost('/api/register', { username, email, password });
    if (res.success) {
      toast('Cadastro realizado! Faça login.');
      window.location.href = 'signin.html';
    } else {
      toast(res.message || 'Falha no cadastro.');
    }
  });
}

// ---------------------------
// Header cart icon (navegação)
// ---------------------------
function initHeaderCartIcon() {
  const headerCartIcon = $('.Cart img');
  if (headerCartIcon) {
    headerCartIcon.style.cursor = 'pointer';
    headerCartIcon.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
}

// ---------------------------
// Inicialização por página
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  initHeaderCartIcon();

  // Detecta pela presença de IDs/body
  if (document.body.id === 'bodycart') initCartPage();
  if (document.body.id === 'bodystyle' || $('#men-clothes') || $('#women-clothes')) initStylePage();
  if (document.body.id === 'bodysignin') initSigninPage();
  if (document.body.id === 'bodysignup') initSignupPage();
});
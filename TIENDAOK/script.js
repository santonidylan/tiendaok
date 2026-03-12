const products = [
    // --- iPhone 16 Series ---
    { 
        id: 1, category: "iPhone 16 Series", name: "iPhone 16 Pro Max", 
        details: "94% Batería | 256GB", price: 1520000, 
        image: "img/iphone16promax.webp" 
    },
    { 
        id: 2, category: "iPhone 16 Series", name: "iPhone 16", 
        details: "100% Batería | 128GB | Negro", price: 1150000, badge: "Hot", 
        image: "img/iphone16.jpg" 
    },

    // --- iPhone 15 Series ---
    { 
        id: 3, category: "iPhone 15 Series", name: "iPhone 15 Pro Max", 
        details: "100% Batería | 256GB", price: 1250000, badge: "Nuevo",
        image: "img/iphone15promax.webp" 
    },
    { 
        id: 4, category: "iPhone 15 Series", name: "iPhone 15 Pro", 
        details: "100% Batería | 128GB | Gris", price: 1100000, badge: "Nuevo",
        image: "img/iphone15pro.jpg" 
    },

    // --- iPhone 14 Series ---
    { 
        id: 5, category: "iPhone 14 Series", name: "iPhone 14 Pro Max", 
        details: "100% Batería | 128GB", price: 1000000, 
        image: "img/iphone14promax.jpg" 
    },
    { 
        id: 6, category: "iPhone 14 Series", name: "iPhone 14 Pro", 
        details: "100% Batería | 128GB | Gris/Dorado", price: 860000, 
        image: "img/iphone14pro.jpg" 
    },

    // --- iPhone 13 Series ---
    { 
        id: 7, category: "iPhone 13 Series", name: "iPhone 13 Pro Max", 
        details: "87% Batería | 128GB", price: 830000, 
        image: "img/iphone13promax.jpg" 
    },
    { 
        id: 8, category: "iPhone 13 Series", name: "iPhone 13 Pro", 
        details: "100% Batería | 128GB | Celeste", price: 740000, 
        image: "img/iphone13cel.jpg" 
    },
    { 
        id: 9, category: "iPhone 13 Series", name: "iPhone 13", 
        details: "100% Batería | 128GB", price: 635000, 
        image: "img/iphone13.jpg.jpg" 
    },

    // --- Otros Dispositivos ---
    { 
        id: 10, category: "Tablets", name: "Tablet Lenovo M10 FHD Plus", 
        details: "Nueva", price: 300000, 
        image: "img/tablet lenovo.jpg" 
    },
    { 
        id: 11, category: "Consolas", name: "PS5 Digital", 
        details: "2 controles | 1 juego (FIFA 26)", price: 900000, 
        image: "img/ps5.jpg" 
    },
    { 
        id: 12, category: "Consolas", name: "PS5 Digital Sellada", 
        details: "Nueva en caja cerrada", price: 900000, badge: "Nuevo",
        image: "img/ps5.jpg" 
    }, 

    { id: 12, 
        category: "Auriculares", 
        name: "Auriculares P9 Plus Max", 
        details: "Inalámbricos Bluetooth | Color Blanco", 
        price: 25000, 
        image: "img/aurisp9.png"
    },

    { id: 13, 
        category: "Auriculares", 
        name: "Auriculares P9 Plus Max", 
        details: "Inalámbricos Bluetooth | Color Negro", 
        price: 25000, 
        image: "img/aurisp9dos.jpg"
    }
];



let cart = [];

// Elementos del DOM
const mainContainer = document.getElementById('main-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

// Formateador de moneda (Pesos Argentinos)
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(price);
};

// 1. Cargar productos divididos por Categoría
function renderProducts() {
    mainContainer.innerHTML = ""; 
    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.innerText = category;
        mainContainer.appendChild(sectionTitle);

        const grid = document.createElement('div');
        grid.className = 'grid-products';

        const categoryProducts = products.filter(p => p.category === category);

        categoryProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-details">
                        <span class="badge">${product.details}</span>
                    </div>
                    <p class="price">${formatPrice(product.price)}</p>
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        Agregar
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        mainContainer.appendChild(grid);
    });
}

// 2. Agregar al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    toggleCart(true); 
}

// 3. Eliminar del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// --- FUNCIÓN ACTUALIZAR CARRITO (Con Fotos) ---
function updateCart() {
    // 1. Actualizar el numerito rojo
    cartCount.innerText = cart.length;

    // 2. Si está vacío...
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align:center; padding: 40px 0; color: #86868b;">
                <i class="fa-solid fa-cart-arrow-down" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Tu bolsa está vacía.</p>
                <button onclick="toggleCart()" style="margin-top:15px; background:none; border:1px solid #86868b; padding:8px 15px; border-radius:20px; cursor:pointer;">
                    Seguir comprando
                </button>
            </div>
        `;
    } else {
        // 3. Renderizar items como tarjetas
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)}</p>
                </div>

                <button class="btn-remove" onclick="removeFromCart(${index})" title="Eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // 4. Calcular Total
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotal.innerText = formatPrice(total);
}


// 5. Abrir/Cerrar Carrito
function toggleCart(forceOpen = false) {
    if (forceOpen) {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    } else {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
}

function scrollToProducts() {
    document.getElementById('main-container').scrollIntoView({behavior: 'smooth'});
}

// --- FUNCIÓN DE CHECKOUT PARA WHATSAPP ---
function checkout() {
    // 1. Validar si el carrito está vacío
    if (cart.length === 0) {
        alert("Tu bolsa está vacía. Agrega productos para continuar.");
        return;
    }

    // 2. Configurar tu número de teléfono (Formato internacional sin +)
    // 54 = Argentina, 9 = Móvil, 261... = Tu número
    const phoneNumber = "5492615093546"; 

    // 3. Crear el mensaje
    let message = "👋\nHola TiendaOK! 👋\nQuiero mas detalles y realizar el siguiente pedido:\n\n";

    // Recorrer el carrito y sumar al mensaje
    cart.forEach((product, index) => {
        message += `- ${product.name} (${product.details})\n`;
    });

    // Agregar el total al final
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `\n*Total a pagar: ${formatPrice(total)}*`;

    // 4. Codificar el mensaje para URL (convierte espacios en %20, etc.)
    const encodedMessage = encodeURIComponent(message);

    // 5. Crear el enlace de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 6. Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');

    // Opcional: Limpiar el carrito después de enviar
    // cart = [];
    // updateCart();
    // toggleCart();
}

renderProducts();
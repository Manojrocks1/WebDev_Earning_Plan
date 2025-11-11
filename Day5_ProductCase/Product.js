const products = [
  { 
    id: 1, 
    name: "Smart Watch", 
    category: "electronics", 
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800", 
    price: "$120" 
  },
  { 
    id: 2, 
    name: "Headphones", 
    category: "electronics", 
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800", 
    price: "$90" 
  },
  { 
    id: 3, 
    name: "T-Shirt", 
    category: "fashion", 
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800", 
    price: "$25" 
  },
  { 
    id: 4, 
    name: "Sunglasses", 
    category: "fashion", 
    img: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?q=80&w=800",
    price: "$45" 
  },
  { 
    id: 5, 
    name: "Pizza", 
    category: "food", 
    img: "https://images.unsplash.com/photo-1601924582975-7e1b1b99b89c?q=80&w=800", 
    price: "$12" 
  },
  { 
    id: 6, 
    name: "Burger", 
    category: "food", 
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800", 
    price: "$8" 
  },
];

const container = document.getElementById("productContainer");
const buttons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

let currentCategory = "all";

// Render Products
function displayProducts(category = "all") {
  container.innerHTML = "";

  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card bg-white rounded-xl shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="rounded-lg mb-3 w-full h-40 object-cover">
      <h3 class="text-lg font-semibold text-gray-800">${p.name}</h3>
      <p class="text-gray-600 mb-2">${p.price}</p>
      <button class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">Buy Now</button>
    `;
    container.appendChild(card);
  });

  updateProgress(filtered.length, products.length);
}

// Update Progress Bar
function updateProgress(visible, total) {
  const percent = total === 0 ? 0 : Math.round((visible / total) * 100);
  progress.style.width = `${percent}%`;
  progressText.textContent = `${visible} of ${total} products shown`;
}

// Filter Buttons
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("bg-purple-600", "text-white"));
    buttons.forEach(b => b.classList.add("bg-white", "text-purple-600"));
    btn.classList.add("bg-purple-600", "text-white");

    currentCategory = btn.dataset.category;
    applySearchAndFilter();
  });
});

// Live Search + Filter Combined
searchInput.addEventListener("input", applySearchAndFilter);

function applySearchAndFilter() {
  const text = searchInput.value.toLowerCase();
  const filtered = products.filter(p => {
    const matchesCategory = currentCategory === "all" || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(text);
    return matchesCategory && matchesSearch;
  });

  container.innerHTML = "";

  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card bg-white rounded-xl shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition-all duration-300";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="rounded-lg mb-3 w-full h-40 object-cover">
      <h3 class="text-lg font-semibold text-gray-800">${p.name}</h3>
      <p class="text-gray-600 mb-2">${p.price}</p>
      <button class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">Buy Now</button>
    `;
    container.appendChild(card);
  });

  updateProgress(filtered.length, products.length);
}

// Initial Load
displayProducts("all");
import { Auth } from './auth.session.js';

class ProductManager {
  constructor(token) {
    this.token = token;
  }

  async postProduct() {
    const postProductForm = document.getElementById("postProductForm");
    postProductForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("productName").value;
      const description = document.getElementById("productDescription").value;
      const price = document.getElementById("productPrice").value;
      const categoryTitle = document.getElementById("productCategory").value;

      const product = {
        title: title,
        description: description,
        price: parseFloat(price), // Ensure price is a number
        category: {
          title: categoryTitle,
        },
      };

      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product created successfully");
      } else {
        alert("Failed to create product");
      }
    });
  }

  async listProducts() {
    const listAllCreatedProducts = document.getElementById("tab-list");
    listAllCreatedProducts.addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent default anchor behavior

      const response = await fetch("http://localhost:8000/api/Products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        const products = await response.json();
        this.displayProducts(products);
      } else {
        alert("Products not found");
      }
    });
  }

  displayProducts(products) {
    const productTableBody = document.getElementById("productTable").getElementsByTagName("tbody")[0];
    productTableBody.innerHTML = ""; // Clear existing rows

    if (products.length > 0) {
      products.forEach(product => {
        const row = productTableBody.insertRow();
        row.insertCell(0).textContent = product.title;
        row.insertCell(1).textContent = product.description;
        row.insertCell(2).textContent = product.price;
        row.insertCell(3).textContent = product.category.title;
      });
      document.getElementById("noProductsMessage").style.display = "none";
    } else {
      document.getElementById("noProductsMessage").style.display = "block";
    }
  }

  async fetchCategories() {
    const response = await fetch('http://localhost:5005/Categories');
    return await response.json();
  }

  async setupCategoryFilter() {
    const categories = await this.fetchCategories();

    const inputField = document.getElementById('productCategory');
    const categoryList = document.getElementById('categoryList');

    inputField.addEventListener('input', () => {
      const query = inputField.value.toLowerCase();
      categoryList.innerHTML = '';

      const filteredCategories = categories.filter(category => 
        category.title.toLowerCase().includes(query)
      );

      filteredCategories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.textContent = category.title;
        categoryList.appendChild(listItem);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const token = await Auth.validateToken();
  if (token) {
    const productManager = new ProductManager(token);
    productManager.postProduct();
    productManager.listProducts();
    productManager.setupCategoryFilter();
  }
});
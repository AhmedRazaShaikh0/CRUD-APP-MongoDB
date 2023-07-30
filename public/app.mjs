// Add New Product / POST
// document.getElementById("productForm").addEventListener("submit", async (event) => {
async function AddProducts(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const fathername = document.getElementById("fathername").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  const productData = {
    name: name,
    fathername: fathername,
    age: age,
    gender: gender,
  };

  try {
    const response = await fetch(
      "https://mongodb-crud-app.vercel.app/product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (response.ok) {
      alert(`Product added successfully!`);
      window.location.reload();
      // Optionally, you can redirect to another page after successful submission
      // window.location.href = "/success-page.html";
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("An error occurred while adding the product.");
  }
}
document.getElementById("productForm").addEventListener("submit", AddProducts);

// GET All Products
async function GetProducts(event) {
  // event.preventDefault();

  try {
    const response = await fetch(
      "https://mongodb-crud-app.vercel.app/products"
    );
    const products = await response.json();
    // console.log("data", products);

    const { Products } = products;
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = ""; // Clear the table before populating

    Products.map((item) => {
      tbody.innerHTML += `
        <tr id=${item._id} class="titems">
        <td>${item.name}</td>
        <td>${item.fathername}</td>
        <td>${item.age}</td>
        <td>${item.gender}</td>
        <td><button class="editButton" onclick=fillFormForUpdate('${item._id}')>Edit</button></td>
        <td><button class="deleteButton" onclick=DeleteProduct('${item._id}') >Delete</button></td>
        </tr>
        `;
    });
  } catch (error) {
    console.error("Error adding product", error);
  }
}
GetProducts();

// DELETE Product
async function DeleteProduct(product_id) {
  try {
    const response = await fetch(
      `https://mongodb-crud-app.vercel.app/product/${product_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to Delete product");
    }
  } catch (error) {
    console.error("Error deleting product", error);
  }
}

// UPDATE Product

async function fillFormForUpdate(product_id) {
  const nameInput = document.getElementById("name");
  const fathernameInput = document.getElementById("fathername");
  const ageInput = document.getElementById("age");
  const genderInput = document.getElementById("gender");
  const formButton = document.querySelector(".formButton");
  // console.log(form)
  try {
    const response = await fetch(
      `https://mongodb-crud-app.vercel.app/product/${product_id}`
      // {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    if (response.ok) {
      const product = await response.json();
      // console.log(product)
      // fillFormForUpdate(product);

      nameInput.value = product.product.name;
      fathernameInput.value = product.product.fathername;
      ageInput.value = product.product.age;
      genderInput.value = product.product.gender;
      formButton.textContent = "Update Product";
    } else {
      alert("Failed to fetch product details");
    }
    // window.location.reload();
  } catch (error) {
    console.error("Error updating product", error);
  }
}

async function UpdateProduct(product_id) {
  try {
    const response = await fetch(
      `https://mongodb-crud-app.vercel.app/product/${product_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const product = await response.json();
      // console.log(product)
      fillFormForUpdate(product);
    } else {
      alert("Failed to fetch product details");
    }
    // window.location.reload();
  } catch (error) {
    console.error("Error updating product", error);
  }
}

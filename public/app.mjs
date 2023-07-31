// // Add New Product / POST
// let productIdForUpdate = "";
// console.log(productIdForUpdate);
// async function AddProducts() {

//   const name = document.getElementById("name").value;
//   const fathername = document.getElementById("fathername").value;
//   const age = document.getElementById("age").value;
//   const gender = document.getElementById("gender").value;

//   const productData = {
//     name: name,
//     fathername: fathername,
//     age: age,
//     gender: gender,
//   };

//   try {
//     const response = await fetch(
//       "https://mongodb-crud-app.vercel.app/product",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       }
//     );

//     if (response.ok) {
//       alert(`Product added successfully!`);
//       getProducts();
//     } else {
//       alert("Failed to add product");
//     }
//   } catch (error) {
//     console.error("Error adding product:", error);
//     alert("An error occurred while adding the product.");
//   }
// }
// document.getElementById("productForm").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const value = document.querySelector(".formButton");
//   if (value.innerText === "ADD PRODUCT") {
//     AddProducts();
//   } else {
//     UpdateProduct(productIdForUpdate);
//   }
//   console.log("Product btnnn", document.querySelector(".formButton").innerText);
// });

// // GET All Products
// async function getProducts(event) {
//   // event.preventDefault();

//   try {
//     const response = await fetch(
//       "https://mongodb-crud-app.vercel.app/products"
//     );
//     const products = await response.json();
//     // console.log("data", products);

//     const { Products } = products;
//     const tbody = document.querySelector("#tbody");
//     tbody.innerHTML = "";

//     Products.map((item) => {
//       tbody.innerHTML += `
//         <tr id=${item._id} class="titems">
//         <td>${item.name}</td>
//         <td>${item.fathername}</td>
//         <td>${item.age}</td>
//         <td>${item.gender}</td>
//         <td><button class="editButton" onclick=fillFormForUpdate('${item._id}')>Edit</button></td>
//         <td><button class="deleteButton" onclick=DeleteProduct('${item._id}') >Delete</button></td>
//         </tr>
//         `;
//     });
//   } catch (error) {
//     console.error("Error adding product", error);
//   }
// }
// getProducts();

// // DELETE Product
// async function DeleteProduct(product_id) {
//   try {
//     const response = await fetch(
//       `https://mongodb-crud-app.vercel.app/product/${product_id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (response.ok) {
//       getProducts();
//     } else {
//       alert("Failed to Delete product");
//     }
//   } catch (error) {
//     console.error("Error deleting product", error);
//   }
// }

// // UPDATE Product

// async function fillFormForUpdate(product_id) {
//   const nameInput = document.getElementById("name");
//   const fathernameInput = document.getElementById("fathername");
//   const ageInput = document.getElementById("age");
//   const genderInput = document.getElementById("gender");
//   const formButton = document.querySelector(".formButton");
//   try {
//     const response = await fetch(
//       `https://mongodb-crud-app.vercel.app/product/${product_id}`

//     );
//     if (response.ok) {
//       const product = await response.json();
//       productIdForUpdate = product.product._id;
//       nameInput.value = product.product.name;
//       fathernameInput.value = product.product.fathername;
//       ageInput.value = product.product.age;
//       genderInput.value = product.product.gender;
//       formButton.textContent = "Update Product";
//       console.log("vvvvv", productIdForUpdate);
//     } else {
//       alert("Failed to fetch product details");
//     }
//   } catch (error) {
//     console.error("Error updating product", error);
//   }
// }

// async function UpdateProduct(product_id) {
//   const nameInput = document.getElementById("name");
//   const fathernameInput = document.getElementById("fathername");
//   const ageInput = document.getElementById("age");
//   const genderInput = document.getElementById("gender");

//   const updatedProductData = {
//     name: nameInput.value,
//     fathername: fathernameInput.value,
//     age: ageInput.value,
//     gender: genderInput.value,
//   };

//   try {
//     const response = await fetch(
//       `https://mongodb-crud-app.vercel.app/product/${product_id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedProductData),
//       }
//     );
//     if (response.ok) {
//       getProducts()
//     } else {
//       alert("Failed to fetch product details");
//     }
//   } catch (error) {
//     console.error("Error updating product", error);
//   }
// }

let productIdForUpdate = "";
const apiUrl = "https://mongodb-crud-app.vercel.app";

async function AddProducts() {
  const productData = {
    name: document.getElementById("name").value,
    fathername: document.getElementById("fathername").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
  };

  try {
    const response = await fetch(`${apiUrl}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Product added successfully!");
      getProducts();
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    alert("An error occurred while adding the product.");
  }
}

document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".formButton").innerText === "ADD PRODUCT"
    ? AddProducts()
    : UpdateProduct(productIdForUpdate);
});

async function getProducts() {
  try {
    const response = await fetch(`${apiUrl}/products`);
    const { Products } = await response.json();
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = Products.map(
      (item) => `
        <tr id=${item._id} class="titems">
          <td>${item.name}</td>
          <td>${item.fathername}</td>
          <td>${item.age}</td>
          <td>${item.gender}</td>
          <td><button class="editButton" onclick=fillFormForUpdate('${item._id}')>Edit</button></td>
          <td><button class="deleteButton" onclick=DeleteProduct('${item._id}') >Delete</button></td>
        </tr>
      `
    ).join("");
  } catch (error) {
    console.error("Error adding product", error);
  }
}

async function DeleteProduct(product_id) {
  try {
    const response = await fetch(`${apiUrl}/product/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      getProducts();
    } else {
      alert("Failed to Delete product");
    }
  } catch (error) {
    console.error("Error deleting product", error);
  }
}

async function fillFormForUpdate(product_id) {
  const nameInput = document.getElementById("name");
  const fathernameInput = document.getElementById("fathername");
  const ageInput = document.getElementById("age");
  const genderInput = document.getElementById("gender");
  try {
    const formButton = document.querySelector(".formButton");
    const response = await fetch(`${apiUrl}/product/${product_id}`);
    if (response.ok) {
      const product = await response.json();
      productIdForUpdate = product.product._id;
      nameInput.value = product.product.name;
      fathernameInput.value = product.product.fathername;
      ageInput.value = product.product.age;
      genderInput.value = product.product.gender;
      formButton.textContent = "Update Product";
    } else {
      alert("Failed to fetch product details");
    }
  } catch (error) {
    console.error("Error updating product", error);
  }
}

async function UpdateProduct(product_id) {
  const nameInput = document.getElementById("name");
  const fathernameInput = document.getElementById("fathername");
  const ageInput = document.getElementById("age");
  const genderInput = document.getElementById("gender");
  const formButton = document.querySelector(".formButton");

  const updatedProductData = {
    name: nameInput.value,
    fathername: fathernameInput.value,
    age: ageInput.value,
    gender: genderInput.value,
  };
  
  try {
    const response = await fetch(`${apiUrl}/product/${product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductData),
    });
    if (response.ok) {
      alert("Product updated successfully");
      nameInput.value = "";
      fathernameInput.value = "";
      ageInput.value = "";
      genderInput.value = "Male";
      formButton.textContent = "Add Product";
      // console.log(nameInput.value);
      getProducts();
    } else {
      alert("Failed to update product");
    }
  } catch (error) {
    console.error("Error updating product", error);
  }
}

getProducts();

// Add New Product / POST
// document.getElementById("productForm").addEventListener("submit", async (event) => {
async function AddProducts(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const productData = {
    name: formData.get("name"),
    fathername: formData.get("fathername"),
    age: formData.get("age"),
    gender: formData.get("gender"),
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
      const data = await response.json();
      alert(`Product added successfully! Product ID: ${data.id}`);
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

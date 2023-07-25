import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import path from "path";
import cors from "cors";

const __dirname = path.resolve();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const mongoURL =
  "mongodb+srv://ahmedraza:ahmedraza12345@cluster0.ykj1f2q.mongodb.net/Products";

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access the database from the connection
    const db = client.db();
    console.log("Connected to MongoDB");

    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
app.use(express.json());
connectDB();

app.get("/testing", async (req, res) => {
  res.send("Hello From Root Path");
});

app.get("/products", async (req, res) => {
  try {
    const db = await connectDB();
    const products = await db.collection("products").find().toArray();
    res.send({
      message: "All Products",
      Products: products,
    });
  } catch (error) {
    res.status(500).send("Error retrieving products");
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.send({ product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving product");
  }
});

app.post("/product", async (req, res) => {
  try {
    const db = await connectDB();
    const { name, fathername, age, gender } = req.body;
    const product = { name, fathername, age, gender };
    const result = await db.collection("products").insertOne(product);
    res
      .status(201)
      .json({ message: "Product Added Successfully", id: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed To Add Product" });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { name, fathername, age, gender } = req.body;
    const updatedProduct = { name, fathername, age, gender };
    const result = await db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedProduct }
      );
    if (result.matchedCount === 0) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.send({
      message: `Product is updated with id: ${req.params.id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating product");
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    res.send({
      message: `Product deleted with id: ${req.params.id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting product");
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

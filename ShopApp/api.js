const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let products = [
  { name: "orange", description: "orange fruit", price: "2" },
];

app.get("/product", (req, res) => {
  // const extractedData = fs.readFileSync("allProducts.json")
  // const recoveredObject = JSON.parse(extractedData)
  // console.log('recoveredObject', recoveredObject)
  if (products.length) return res.send({ products });
  res.send({ error: "Empty" });
});

app.post("/product", (req, res) => {
  const { name, description, price } = req.body;
  if (name && description && price) {
    products.push({ name, description, price });
    // fs.writeFileSync("allProducts.json", JSON.stringify(products));
    res.send({ data: "Product Added!" });
  } else res.send({ error: "Kindly add details" });
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  if (products[id] !== undefined) {
    products.splice(id, 1);
    res.send({ data: "Item Deleted!" });
  } else {
    res.send({ error: "Item Not Found!" });
  }
});

app.patch("/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const product = products[id];
  if (name || description || price) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    res.send(products);
  } else res.send({ error: "Nothing To  Update!" });
});

app.listen(8000, () => console.log("on port 8000"));

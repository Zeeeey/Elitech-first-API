const PRODUCT_BASEURL = "http://localhost:8000/product";

const productName = document.getElementById("name");
const desc = document.getElementById("desc");
const price = document.getElementById("price");
const box = document.getElementById("box");
const cart = document.getElementById("cart");
const total = document.getElementById("total");

let products = [];

const getProduct = async () => {
  const createNode = (element) => document.createElement(element);
  const append = (parent, el) => parent.appendChild(el);
  let totalPrice = 0;

  await fetch(`${PRODUCT_BASEURL}`)
    .then((resp) => resp.json())
    .then((products) => {
      box.innerHTML = "";
      cart.innerHTML = "";
      if (products.length) {
        return products.map((product, id) => {
          let div = createNode("div");
          let spanName = createNode("span");
          let spanDesc = createNode("span");
          let spanPrice = createNode("span");
          let deleteDiv = createNode("div");
          let deleteBtn = createNode("button");
          let updateBtn = createNode("button");
          div.classList.add("my-style");
          deleteDiv.classList.add("div-left");
          deleteBtn.classList.add("red-font");
          spanName.innerHTML = `Name: ${product.name} <br/> <input id="update_name${id}" placeholder="Update Name"/><br/>`;
          spanDesc.innerHTML = `Description: ${product.description} <br /> <input id="update_desc${id}" placeholder="Update Description" /><br/>`;
          spanPrice.innerHTML = `<span class="">Price: $${product.price} <br/><input id="update_price${id}" placeholder="Update Price" /><br/></span>`;
          deleteBtn.innerHTML = "Delete";
          updateBtn.innerHTML = "Update";
          deleteBtn.onclick = () => deleteProduct(id);
          updateBtn.onclick = () => updateProduct(id);
          append(deleteDiv, updateBtn);
          append(deleteDiv, deleteBtn);
          append(div, spanName);
          append(div, spanDesc);
          append(div, spanPrice);
          append(div, deleteDiv);
          append(box, div);

          let cartList = createNode("li");
          let cartItem = createNode("span");
          cartItem.innerHTML = `${product.name} - $${product.price}`;
          append(cartList, cartItem);
          append(cart, cartList);

          totalPrice += Number(product.price);
          total.innerHTML = totalPrice;
        });
      }
      return (total.innerHTML = totalPrice);
    })
    .catch(() => alert("Error While Fetching Product"));
};

const addProduct = async () => {
  const data = {
    name: productName.value,
    description: desc.value,
    price: price.value,
  };
  await fetch(`${PRODUCT_BASEURL}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      const { data, error } = json;
      if (error) return alert(error);
      //   else return alert(data);
    })
    .catch(() => alert("Error While Adding Product"));
  getProduct();
};

const deleteProduct = async (id) => {
  await fetch(`${PRODUCT_BASEURL}/${id}`, { method: "DELETE" });
  getProduct();
};

const updateProduct = async (id) => {
  const data = {
    name: document.getElementById(`update_name${id}`).value,
    description: document.getElementById(`update_desc${id}`).value,
    price: document.getElementById(`update_price${id}`).value,
  };
  await fetch(`${PRODUCT_BASEURL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      const { error } = json;
      if (error) return alert(error);
    })
    .catch(() => alert("Error While Updating Product"));
  getProduct();
};

getProduct();

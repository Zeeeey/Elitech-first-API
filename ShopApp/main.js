console.log('hi')
let selectedForm = document.getElementById("selectedForm");
let name = document.getElementById("name");
// let name = document.getElementById("name");
// let name = document.getElementById("name");
let selectedArray = [];

console.log('selectedArray', selectedArray)
const addProduct = () => {
    // let selectedForm = selectedForm.value;
    let selectedForm = document.getElementById("selectedForm");
    let named = selectedForm.elements[0]
    console.log(named.value)
    selectedArray.push(selectedForm)
}

const displayItems = () => {
    let div = "";
    // selectedArray.forEach((item, i) => {
    //     div +=
    // }
}
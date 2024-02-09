const price = document.querySelector("#price");
const dish = document.querySelector("#dish");
const table = document.querySelector("#table");
const form = document.querySelector("#form");
const table1 = document.querySelector("#table1")
const table2 = document.querySelector("#table2")
const table3 = document.querySelector("#table3")

form.addEventListener("submit", onsubmit);

async function onsubmit(event) {
    event.preventDefault()
    const orderdetails = {
        price: `${price.value}`,
        dish: `${dish.value}`,
        table: `${table.value}`
    }
    console.log(JSON.stringify(orderdetails))
    await axios
        .post("https://crudcrud.com/api/8b735d0a20c44747859b675b4bb18ea9/orderdetails", orderdetails)
        .then(response => {
            showOrderDetails(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    axios
        .get("https://crudcrud.com/api/8b735d0a20c44747859b675b4bb18ea9/orderdetails")
        .then(response => {
            console.log("sucessfully data fetched");
            showOrderDetails(response);
        })
        .catch(error => {
            console.log(error)
        })
}
function showOrderDetails(res) {
    const displayorder = {
        price: `${price.value}`,
        dish: `${dish.value}`,
        table: `${table.value}`
    }
    const newli = document.createElement('li');
    newli.className = `li`;
    newli.setAttribute("id", "items");
    newli.innerText = `${price.value} rs - ${dish.value} - ${table.value}`

    const delbtn = document.createElement(`button`);
    delbtn.className = `btn btn-danger delbtn m-2`;
    delbtn.setAttribute("type", "submit");
    delbtn.setAttribute("id", `delbutton`)
    delbtn.innerHTML = `Delete`;

    if (displayorder.table === "table1") {
        newli.appendChild(delbtn)
        table1.appendChild(newli);
    }
    if (displayorder.table === "table2") {
        newli.appendChild(delbtn)
        table2.appendChild(newli);
    }
    if (displayorder.table === "table3") {
        newli.appendChild(delbtn)
        table3.appendChild(newli);
    }
    // back to empty
    price.value = ``;
    dish.value = ``;
    table.value = `choose...`;
}

table1.addEventListener("click", onClick);
table2.addEventListener("click", onClick);
table3.addEventListener("click", onClick);

async function onClick(e) {
    const btnId = e.target.id;
    if (e.target && e.target.classList.contains("delbtn")) {
        try {
            let response = await axios.delete(`https://crudcrud.com/api/8b735d0a20c44747859b675b4bb18ea9/orderdetails/${btnId}`)
                console.log("item removed.....")
            }
            catch(error) {
                console.log(error)
            }
        e.target.parentElement.parentElement.remove();
    }
}



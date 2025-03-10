let totalBalance = 0;

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let list = document.getElementById("list");

let balance = document.getElementById("balance");

document.getElementById("btn").addEventListener("click", () => {
  console.log("asfnk");
  let discription = document.getElementById("discription");
  let amount = document.getElementById("amount");
  let type = document.getElementById("type");

  let discriptionValue = discription.value;
  let amountValue = parseFloat(amount.value);
  let typeValue = type.value;
  let dateTime = new Date().toLocaleString();
  if (!discriptionValue || isNaN(amountValue) || amountValue <= 0) {
    alert("enter valid amount");
    return;
  }
  let tansaction = { discriptionValue, amountValue, typeValue, dateTime };
  transactions.push(tansaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  discription.value = "";
  amount.value = "";
  updateList();
});

function updateList() {
  list.innerHTML = "";
  totalBalance = 0;
  transactions.forEach((transaction) => {
    let listItem = document.createElement("li");
    if (transaction.typeValue === "income") {
      totalBalance += transaction.amountValue;
      listItem.innerHTML = `₹${transaction.amountValue} has been credited as ${transaction.discriptionValue} on ${transaction.dateTime}`;
      listItem.style.backgroundColor = "rgb(81, 126, 70)";
    } else if (transaction.typeValue === "expence") {
      totalBalance -= transaction.amountValue;
      listItem.innerHTML = `₹${transaction.amountValue} has been debited for ${transaction.discriptionValue} on ${transaction.dateTime}`;
      listItem.style.backgroundColor = "rgb(230, 84, 84)";
    }
    balance.innerHTML = `Total Balance: ₹${totalBalance}`;

    list.appendChild(listItem);
  });
}

document.getElementById("clearBtn").addEventListener("click", () => {
  localStorage.removeItem("transactions");
  transactions = [];
  updateList();
  balance.innerHTML = `Total Balance: ₹0`;
  totalBalance = 0;
});
updateList();

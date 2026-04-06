console.log("JS working");

let transactions = [
  { date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
  { date: "2026-04-02", amount: 200, category: "Food", type: "expense" },
  { date: "2026-04-03", amount: 1000, category: "Shopping", type: "expense" }
];

let role = "viewer";

function updateCards() {
  let income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  let expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  let balance = income - expense;

  document.getElementById("income").innerText = "Income: ₹" + income;
  document.getElementById("expense").innerText = "Expense: ₹" + expense;
  document.getElementById("balance").innerText = "Balance: ₹" + balance;
}

function renderTable(data) {
  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(t => {
    let row = `<tr>
      <td>${t.date}</td>
      <td>₹${t.amount}</td>
      <td>${t.category}</td>
      <td>${t.type}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

document.getElementById("search").addEventListener("input", function(e) {
  let value = e.target.value.toLowerCase();

  let filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(value)
  );

  renderTable(filtered);
});

document.getElementById("role").addEventListener("change", function(e) {
  role = e.target.value;

  if (role === "admin") {
    document.getElementById("addBtn").style.display = "block";
  } else {
    document.getElementById("addBtn").style.display = "none";
  }
});

function showInsights() {
  let expenses = transactions.filter(t => t.type === "expense");

  if (expenses.length === 0) {
    document.getElementById("insights").innerText = "No data available";
    return;
  }

  let max = expenses.reduce((a, b) => a.amount > b.amount ? a : b);

  document.getElementById("insights").innerText =
    "You spent most on " + max.category;
}

updateCards();
renderTable(transactions);
showInsights();

window.onload = function () {

  let income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  let expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Finance Overview",
        data: [income, expense],
        backgroundColor: ["green", "red"]
      }]
    }
  });

};

function loadPieChart() {
  let categories = {};
  
  transactions.forEach(t => {
    if (t.type === "expense") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });

  const ctx = document.getElementById("pieChart");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ["red", "blue", "orange", "green"]
      }]
    }
  });
}

loadPieChart();
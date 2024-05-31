document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    addExpense(description, amount);
});

function addExpense(description, amount) {
    const transaction = {
        id: generateID(),
        description: description,
        amount: amount
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.innerHTML = `
        ${transaction.description} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeExpense(${transaction.id})">x</button>
    `;
    document.getElementById('transaction-list').appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    document.getElementById('balance').innerText = `$${total}`;
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function removeExpense(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    document.getElementById('transaction-list').innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

let transactions = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : [];

init();

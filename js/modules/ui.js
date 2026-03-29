// Tudo que mexe com a tela

const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');

export function renderTransactions(transactions) {
  list.innerHTML = '';

  transactions.forEach((transaction) => {
    const li = document.createElement('li');

    const type = transaction.amount >= 0 ? 'income' : 'expense';
    li.classList.add(type);

    li.innerHTML = `${transaction.text} <span> ${transaction.amount < 0 ? '-' : '+'} R$ ${Math.abs(transaction.amount)} </span> <button class="delete-btn" date-id="${transaction.id}" > x </button>`;

    list.appendChild(li);
  });
}

export function updateBalance(transactions) {
  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0);

  const income = amounts
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0);

  const expense = amounts
    .filter((val) => val < 0)
    .reduce((acc, val) => acc + val, 0);

  balanceEl.innerText = `R$ ${total.toFixed(2)}`;
  moneyPlusEl.innerText = `R$ ${income.toFixed(2)}`;
  moneyMinusEl.innerText = `R$ ${Math.abs(expense).toFixed(2)}`;
}

import { formatCurrency, formatDate } from './utils.js';

// Seletores
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');

// RENDER TRANSAÇÕES

export function renderTransactions(transactions) {
  list.innerHTML = '';

  transactions.forEach((transaction) => {
    const li = createTransactionElement(transaction);
    list.appendChild(li);
  });
}

// CRIAR ITEM (li)

function createTransactionElement(transaction) {
  const li = document.createElement('li');

  const type = transaction.amount >= 0 ? 'income' : 'expense';
  li.classList.add(type);

  li.innerHTML = ` <div> <strong>${transaction.text}</strong><br> <small>${formatDate(transaction.date)}</small> </div>


<span>
  ${transaction.amount < 0 ? '-' : '+'}
  ${formatCurrency(Math.abs(transaction.amount))}
</span>

<button class="delete-btn" data-id="${transaction.id}">
  x
</button>


`;

  return li;
}

// ATUALIZAR SALDO

export function updateBalance(transactions) {
  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0);

  const income = amounts
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0);

  const expense = amounts
    .filter((val) => val < 0)
    .reduce((acc, val) => acc + val, 0);

  balanceEl.innerText = formatCurrency(total);
  moneyPlusEl.innerText = formatCurrency(income);
  moneyMinusEl.innerText = formatCurrency(Math.abs(expense));
}

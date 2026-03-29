import { addTransaction, getTransactions } from './modules/transactions.js';
import { renderTransactions, updateBalance } from './modules/ui.js';
import { removeTransaction } from './modules/transactions.js';

// Seletores
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const list = document.getElementById('transaction-list');

list.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = Number(e.target.getAttribute('data-id'));

    console.log('ID clicado:', id, typeof id);
    removeTransaction(id);

    const transactions = getTransactions();
    console.log(
      'ESTADO ATUAL:',
      transactions.map((t) => [t.id, typeof t.id]),
    );
    renderTransactions(transactions);
    updateBalance(transactions);
  }
});

function handleAddTransaction(e) {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = Number(amountInput.value);

  if (!text || !amount) {
    alert('Preencha corretamente');
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount,
  };

  addTransaction(transaction);

  const transactions = getTransactions();

  renderTransactions(transactions);
  updateBalance(transactions);

  clearInputs();
}

function clearInputs() {
  textInput.value = '';
  amountInput.value = '';
}

form.addEventListener('submit', handleAddTransaction);

import {
  addTransaction,
  getTransactions,
  clearTransactions,
  removeTransaction,
} from './modules/transactions.js';

import { renderTransactions, updateBalance } from './modules/ui.js';

// Estado
let currentFilter = 'all';

// Seletores
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const list = document.getElementById('transaction-list');
const clearBtn = document.getElementById('clear-btn');
const filterContainer = document.querySelector('.filter');

// FUNÇÕES

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
    date: new Date().toISOString(),
  };

  addTransaction(transaction);
  updateUI();
  clearInputs();
}

function clearInputs() {
  textInput.value = '';
  amountInput.value = '';
}

function applyFilter(transactions) {
  if (currentFilter === 'income') {
    return transactions.filter((t) => t.amount > 0);
  }

  if (currentFilter === 'expense') {
    return transactions.filter((t) => t.amount < 0);
  }

  return transactions;
}

function updateUI() {
  const transactions = getTransactions();
  const filtered = applyFilter(transactions);

  renderTransactions(filtered);
  updateBalance(transactions);
}

// EVENTOS

// Adicionar
form.addEventListener('submit', handleAddTransaction);

// Filtro
filterContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    currentFilter = e.target.dataset.filter;
    updateUI();
  }
});

// Remover
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    removeTransaction(id);
    updateUI();
  }
});

// Limpar tudo
clearBtn.addEventListener('click', () => {
  clearTransactions();
  updateUI();
});

// INIT

updateUI();

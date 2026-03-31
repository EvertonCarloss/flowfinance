// IMPORTS

import { saveTransactions, loadTransactions } from './storage.js';

// STATE

let transactions = loadTransactions();

// GETTERS

export function getTransactions() {
  // retorna cópia para evitar mutação externa
  return [...transactions];
}

// ACTIONS

export function addTransaction(transaction) {
  transactions = [...transactions, transaction];
  persist();
}

export function removeTransaction(id) {
  transactions = transactions.filter((t) => String(t.id) !== String(id));

  persist();
}

export function clearTransactions() {
  transactions = [];
  persist(true);
}

// PERSISTÊNCIA

function persist(clear = false) {
  if (clear) {
    localStorage.removeItem('flowfinance_transactions');
    return;
  }

  saveTransactions(transactions);
}

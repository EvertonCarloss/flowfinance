// Cuidando dos Dados

let transactions = [];

export function getTransactions() {
  return transactions;
}

export function addTransaction(transaction) {
  transactions.push(transaction);
}

export function removeTransaction(id) {
  console.log('ANTES:', transactions);

  transactions = transactions.filter((t) => t.id != id);

  console.log('REMOVENDO ID:', id);
  console.log('DEPOIS:', transactions);
}

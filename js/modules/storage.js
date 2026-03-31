// CONSTANTES

const STORAGE_KEY = 'flowfinance_transactions';

// SALVAR

export function saveTransactions(transactions) {
  try {
    const data = JSON.stringify(transactions);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Erro ao salvar transações:', error);
  }
}

// CARREGAR

export function loadTransactions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    const parsed = JSON.parse(data);

    // garante que sempre retorna array
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
    return [];
  }
}

// FORMATADORES

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

// FORMATAR MOEDA

export function formatCurrency(value) {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'R$ 0,00';
  }

  return currencyFormatter.format(value);
}

// FORMATAR DATA

export function formatDate(dateString) {
  if (!dateString) return 'Sem data';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  return date.toLocaleDateString('pt-BR');
}

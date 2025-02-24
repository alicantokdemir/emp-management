export function formatPhoneNumber(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '+($1) $2')
    .replace(/(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
}

export function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

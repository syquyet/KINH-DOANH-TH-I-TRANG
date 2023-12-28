export function formatDate(date: Date): string {
  const dateObject = new Date(date);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(dateObject);
  return formattedDate;
}

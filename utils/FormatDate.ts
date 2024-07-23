function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
      return 'th';
  }
  switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
  }
}

export default function formatDate(dateStr: Date) {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Please use 'yyyy-mm-dd'.");
  }

  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[date.getMonth()]; // getMonth() returns 0-11
  const day = date.getDate(); // getDate() returns 1-31
  const daySuffix = getDaySuffix(day); // Get the appropriate suffix for the day

  return `${monthName} ${day}${daySuffix}`;
}
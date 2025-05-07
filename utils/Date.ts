import { Batch } from "@/types/Batch";
import { getLabelLong } from "@/types/DayNumber";

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

export function formatDateAsLong(dateStr: string) {
  // const date = new Date(dateStr);
  // console.log(date)

  // if (isNaN(date.getTime())) {
  //     throw new Error("Invalid date format. Please use 'yyyy-mm-dd'.");
  // }

  // const day = date.getDate(); // getDate() returns 1-31

  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  const [year, month, day] = dateStr.split('-').map(str => parseInt(str, 10));
  const daySuffix = getDaySuffix(day); // Get the appropriate suffix for the day
  const monthName = months[month - 1];

  return `${monthName} ${day}${daySuffix}`;
}

export function formatDateAsISO(date: Date): string {

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
  
}

export function formatBatchTitle(batch: Batch){
  return (formatDateAsLong(batch.reviewingDate) + ' - ' + getLabelLong(batch.dayNumber)).toUpperCase();
}

export function getTodayYMD() {
  const today = new Date();
  return formatDateAsYMD(today)
}
export function formatDateAsYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isDueToday(dateStr: string) {
  const today = getTodayYMD()
  return dateStr <= today
}

export default function addDays(daysIncrement: number) : string {
  // Init new date
  let newDate = new Date();
  // Add  the number of days to the date
  newDate.setDate(newDate.getDate() + daysIncrement)
  // Return in 'yyyy-mm-dd' format
  return formatDateAsYMD(newDate)
    
}

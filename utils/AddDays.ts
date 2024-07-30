import { formatDateAsISO } from "./Date";

export default function addDays(date: string, numberOfDays: number) : string {
    // Parse the input date string (assuming it's in yyyy-mm-dd format)
    let newDate = new Date(date);

    // Add  the number of days to the date
    newDate.setDate(newDate.getDate() + numberOfDays);

    return formatDateAsISO(newDate);
    
}
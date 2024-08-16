import { getIncrement } from "@/types/DayNumber";
import { formatDateAsISO } from "./Date";

export default function addDays(daysIncrement: number) : string {

    // Parse the input date string (assuming it's in yyyy-mm-dd format)
    let newDate = new Date();

    // Add  the number of days to the date
    newDate.setDate(new Date().getDate() + daysIncrement);

    return formatDateAsISO(newDate);
    
}
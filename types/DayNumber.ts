export enum DayNumber {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    FOUR = 4,
    SEVEN = 7,
    FIFTEEN = 15,
    THIRTY = 30,
    SIXTY = 60,
    HUNDREDTWENTY = 120
}

// Define an array that holds the intervals
export const dayNumberList = [
    DayNumber.ZERO,
    DayNumber.ONE,
    DayNumber.TWO,
    DayNumber.FOUR,
    DayNumber.SEVEN,
    DayNumber.FIFTEEN,
    DayNumber.THIRTY,
    DayNumber.SIXTY,
    DayNumber.HUNDREDTWENTY
  ];
  
// Function to get the next day number on the current day number
export const getNextDayNumber = (currentDayNumber: DayNumber): DayNumber => {

    const currentIndex = dayNumberList.indexOf(currentDayNumber);

    return currentIndex !== -1 && currentIndex < dayNumberList.length - 1
        ? dayNumberList[currentIndex + 1]
        : DayNumber.ONE; // Return DayNumber.ONE if not found
        
};

// Function to get the previous day number on the current day number
export const getPreviousDayNumber = (currentDayNumber: DayNumber): DayNumber => {

    const currentIndex = dayNumberList.indexOf(currentDayNumber);

    return currentIndex !== -1 && currentIndex < dayNumberList.length - 1
        ? dayNumberList[currentIndex - 1]
        : DayNumber.ONE; // Return DayNumber.ONE if not found
        
};

export const getIncrement = (currentDayNumber: DayNumber): DayNumber => {

    const currentIndex = dayNumberList.indexOf(currentDayNumber);

    return currentIndex !== -1 && currentIndex < dayNumberList.length - 1
        ? dayNumberList[currentIndex + 1] - dayNumberList[currentIndex]
        : DayNumber.ONE; // Return DayNumber.ONE if not found
        
};

export const getLabel = (dayNumber: DayNumber): string => {

    return dayNumber < 7 ? 'D' + dayNumber : (dayNumber < 30 ? 'W' + Math.floor(dayNumber / 7) : 'M' + dayNumber / 30)
        
};
export const getLabelLong = (dayNumber: DayNumber): string => {

    return dayNumber < 7 ? 'Day ' + dayNumber : (dayNumber < 30 ? 'Week ' + Math.floor(dayNumber / 7) : 'Month ' + dayNumber / 30)
        
};
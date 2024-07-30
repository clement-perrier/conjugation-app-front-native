import { DayNumber } from "./DayNumber"
import { Table } from "./Table"

export type Batch = {
    id?: number,
    dayNumber: DayNumber,
    reviewingDate: string,
    tableList: Table[]
}
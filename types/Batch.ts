import { DayNumber } from "./DayNumber"
import { Language } from "./Language"
import { Table } from "./Table"

export type Batch = {
    id?: number,
    dayNumber: DayNumber,
    reviewingDate: string,
    language: Language,
    tableList: Table[]
}
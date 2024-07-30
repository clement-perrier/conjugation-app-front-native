import { Table } from "./Table"

export type Batch = {
    id?: number,
    dayNumber: number,
    reviewingDate: string,
    tableList: Table[]
}
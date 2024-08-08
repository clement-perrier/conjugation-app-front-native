import { DayNumber } from "./DayNumber"
import { Table } from "./Table"
import { UserLearningLanguage } from "./UserLearningLanguage"

export type Batch = {
    id?: number,
    dayNumber: DayNumber,
    reviewingDate: string,
    tableList: Table[],
    userLearningLanguage: UserLearningLanguage
}
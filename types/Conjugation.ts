import { Pronoun } from "./Pronoun"

export interface Conjugation {
    id: number
    name: string
    pronoun: Pronoun
    verbName: string
    tenseName: string
    correct: boolean
}

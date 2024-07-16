import { Pronoun } from "./Pronoun";
import { Tense } from "./Tense";
import { Verb } from "./Verb";

export interface Conjugation {
    id: number
    name: string
    pronounName: string
    verbName: string
    tenseName: string
}

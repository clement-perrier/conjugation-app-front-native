import { Conjugation } from "./Conjugation";
import { Tense } from "./Tense";
import { Verb } from "./Verb";

export interface Table {
    tense: Tense
    verb: Verb
    conjugationList?: Conjugation[]
}

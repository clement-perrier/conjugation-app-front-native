import { Tense } from "./Tense";
import { Verb } from "./Verb";

export interface ConjugationTable {
    tense: Tense;
    verb: Verb;
}

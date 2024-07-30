import { Conjugation } from "./Conjugation";
import { Tense } from "./Tense";
import { Verb } from "./Verb";

export interface Table {
    tense: Tense
    verb: Verb
    conjugationList?: Conjugation[]
}

export const hasMistake = (table: Table) : boolean => {
    return table.conjugationList 
        ? table.conjugationList?.some(conjugation => conjugation.correct === false)
        : false;
  }
  
 export const hasCorrect = (table: Table) : boolean => {
    return table.conjugationList 
        ? table.conjugationList?.some(conjugation => conjugation.correct === true)
        : false;
  }


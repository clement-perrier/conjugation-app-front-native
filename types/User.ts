import { LearningLanguage } from "./LearningLanguage"

export interface User {
    id: number
    firstname: string
    lastsname: string
    defaultLearningLanguageId: number
    learningLanguageList: LearningLanguage[]
}

export const defaultUser: User = {
    id: 0,
    firstname: '',
    lastsname: '',
    defaultLearningLanguageId: 0,
    learningLanguageList: []
}

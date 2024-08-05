import { defaultLearningLanguage, LearningLanguage } from "./LearningLanguage"

export interface User {
    id: number
    firstname: string
    lastsname: string
    defaultLearningLanguage: LearningLanguage
    learningLanguageList: LearningLanguage[]
}

export const defaultUser: User = {
    id: 0,
    firstname: '',
    lastsname: '',
    defaultLearningLanguage: defaultLearningLanguage,
    learningLanguageList: []
}
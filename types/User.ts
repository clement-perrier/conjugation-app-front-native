import { defaultLearningLanguage, LearningLanguage } from "./LearningLanguage"

export interface User {
    id: number
    email: string,
    defaultLearningLanguage: LearningLanguage
    learningLanguageList: LearningLanguage[],
    isGuest: boolean
}

export const defaultUser: User = {
    id: 0,
    email: '',
    defaultLearningLanguage: defaultLearningLanguage,
    learningLanguageList: [],
    isGuest: false
}
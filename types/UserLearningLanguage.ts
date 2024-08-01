import { LearningLanguage } from "./LearningLanguage"
import { User } from "./User"

export interface UserLearningLanguage {
    id: number
    user: User
    learningLanguage: LearningLanguage
}

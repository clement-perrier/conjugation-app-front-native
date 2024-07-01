
export interface Verb {
    id: number,
    name: string
}

export default interface VerbState {
    value: Verb[] | null
}
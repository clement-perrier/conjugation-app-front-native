export interface AsyncListState<T> {
    value: T[],
    loading: boolean,
    error: string | undefined | null
}

export interface AsyncBatchListState<T> {
    value: T[],
    loading: boolean,
    learningLanguageId: number | undefined
    error: string | undefined | null
}
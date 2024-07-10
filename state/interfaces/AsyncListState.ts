export interface AsyncListState<T> {
    value: T[],
    loading: boolean,
    error: string | undefined | null
}
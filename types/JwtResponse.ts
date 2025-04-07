export interface JwtResponse {
    accessToken: string,
    refreshToken: string,
    refreshTokenExpiryDate: string,
    userId: number
}

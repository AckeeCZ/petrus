export default function enforceRefreshTokenScheme(searchParams) {
    const { refreshToken } = searchParams;

    return {
        token: refreshToken,
    };
}

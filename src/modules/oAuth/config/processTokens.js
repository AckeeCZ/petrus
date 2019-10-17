export default function processTokens(accessToken, refreshToken) {
    if (!accessToken) {
        return null;
    }

    return {
        accessToken,
        refreshToken,
    };
}

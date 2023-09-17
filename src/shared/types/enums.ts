enum ErrorCodeStatus {
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	UNAUTHORIZED = 401,
}

enum TokenTypeHints {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

export { ErrorCodeStatus, TokenTypeHints };

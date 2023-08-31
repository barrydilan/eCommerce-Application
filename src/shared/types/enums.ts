enum ErrorCodeStatus {
	ACCOUNT_EXIST = 400,
	NOT_FOUND = 404,
}

enum TokenTypeHints {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

export { ErrorCodeStatus, TokenTypeHints };

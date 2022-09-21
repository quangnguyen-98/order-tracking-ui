const environment = process.env.NODE_ENV;

let ApiEndpoint = null;

switch (environment) {
	case 'development':
		ApiEndpoint = 'http://localhost:3001/api/v1';
		break;
	case 'production':
		ApiEndpoint = 'https://baemin-order-tracking-api.herokuapp.com/api/v1';
		break;

	default:
		break;
}

export const RootApiEndpoint = ApiEndpoint;

export const DateTimeFormat = {
	MMDDYYYYhhmmA: 'MM/DD/YYYY hh:mm A'
};

export const DefaulHttpOption = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

export const defaultPageSize = 5;
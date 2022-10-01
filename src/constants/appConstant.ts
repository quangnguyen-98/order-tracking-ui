// Api config ============================
const environment = process.env.NODE_ENV;

let ApiEndpoint = '';

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


// Constant ==============================

export const OrderStatuses = {
	CREATED: 'CREATED',
	ACCEPTED: 'ACCEPTED',
	DRIVERASSIGNED: 'DRIVERASSIGNED',
	DELIVERING: 'DELIVERING',
	DONE: 'DONE',
	CANCELED: 'CANCELED'
};

export const OrderStatusesDisplayName = {
	Created: 'Created',
	Accepted: 'Accepted',
	DriverAssigned: 'Driver Assigned',
	Delivering: 'Delivering',
	Done: 'Done',
	Canceled: 'Canceled'
};

export const OrderStatusesList = [
	{
		value: OrderStatuses.CREATED,
		displayName: OrderStatusesDisplayName.Created
	},
	{
		value: OrderStatuses.ACCEPTED,
		displayName: OrderStatusesDisplayName.Accepted
	},
	{
		value: OrderStatuses.DRIVERASSIGNED,
		displayName: OrderStatusesDisplayName.DriverAssigned
	},
	{
		value: OrderStatuses.DELIVERING,
		displayName: OrderStatusesDisplayName.Delivering
	},
	{
		value: OrderStatuses.DONE,
		displayName: OrderStatusesDisplayName.Done
	},
	{
		value: OrderStatuses.CANCELED,
		displayName: OrderStatusesDisplayName.Canceled
	}
];

export const OrderStatusColor = {
	CreatedColor: '#fa8c16',
	AcceptedColor: '#1890ff',
	DriverassignedColor: '#13c2c2',
	DeliveringColor: '#1d39c4',
	DoneColor: '#389e0d',
	CanceledColor: '#f5222d',
	GrayColor: '#bbbcb6',
};

export const LateStatusColor = {
	NormalColor: '#52c41a',
	LateColor: '#cf1322',
	WarningColor: '#ffc53d'
};

export const LateStatus = {
	Normal: 'Normal',
	Late: 'Late',
	Warning: 'Warning'
};

export const filterOptions = {
	last5min: 'last5min',
	last10min: 'last10min',
	last15min: 'last15min',
	warningOrder: 'warningOrder',
	lateOrder: 'lateOrder'
};

export const DateTimeFormat = {
	MMDDYYYYhhmmA: 'MM/DD/YYYY hh:mm A'
};

export const DefaulHttpOption = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

export const InitialPaypalOptions = {
	"client-id": "AYchuKpJNxEMrcFk8sE8hwngq_1V7nO6dOw7RuCs4V4l3tj2R1Q7jq8yQRfMBV_NUCRZKsg6wtvATyRw",
	currency: "USD",
	intent: "capture"
};

export const defaultPageSize = 5;
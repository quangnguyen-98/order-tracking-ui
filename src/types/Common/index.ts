export interface DashboardResponse {
	countOrderByStatus: number;
	countOrderByTiming: number;
	orderByStatusChart: any;
	orderByTimingChart: any;
}

export interface Pagination {
	page: number;
	pageSize: number;
	totalPage: number;
	totalItem: number;
}

export interface Sort {
	page: number;
	pageSize: number;
	totalPage: number;
	totalItem: number;
}

export interface Filter {
	page: number;
	pageSize: number;
	totalPage: number;
	totalItem: number;
}

export interface UpdateFormValuePayload {
	fieldName: string;
	value: any;
};
export interface DashboardResponse {
  countOrderByStatus: number;
  countOrderByTiming: number;
  orderByStatusChart: any;
  orderByTimingChart: any;
}

export interface DashboardState {
  countOrderByStatus: number;
  countOrderByTiming: number;
  orderByStatusChart: any;
  orderByTimingChart: any;
  loading: boolean;
  error: string | null;
};

export interface DashboardPayload {
  data: DashboardResponse;
};

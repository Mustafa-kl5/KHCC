export interface iLog {
  id: string;
  title: String;
  description: string;
  createAt: string;
}

export interface iLogsList {
  logs: iLog[];
  totalLogs: number; // Total number of logs available
  page: number;
  pageSize: number;
}

export interface FeedSearchParams {
  skip?: number;
  take?: number;

  filters?: {
    onlySubscriptions?: boolean;
    fromDate?: Date | string;
    endDate?: Date | string;
  };
}

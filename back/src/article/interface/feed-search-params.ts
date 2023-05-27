export interface FeedSearchParams {
  skip?: number;
  take?: number;

  filters?: {
    fromDate?: Date;
    toDate?: Date;
    bySubscriptions?: boolean;
  };
}

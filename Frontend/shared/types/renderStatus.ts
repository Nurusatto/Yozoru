export type renderStatus = {
  loading?: boolean;
  isFetching?: boolean;
  isInitialLoading?: boolean;
  hasCoords?: boolean;
  error?: string | null;
  requestLocation?: () => void;
};

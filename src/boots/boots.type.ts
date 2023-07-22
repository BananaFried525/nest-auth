export type TResponse<T> = {
  status_code: number;
  error_message: string | null;
  data: T;
};

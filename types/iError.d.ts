export interface IError extends Error {
  code?: number;
  statusCode?: number;
  statusMessage?: string;
}

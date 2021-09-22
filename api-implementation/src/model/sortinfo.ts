export interface SortInfo {
  fieldName: string,
  direction: SortDirection
}

export enum SortDirection {
  asc = 1,
  desc = -1,
}
export interface ArrowDbInfo {
  Id: number;
  IsActive: boolean;
  Expression: string | null;
  DepTaskId: number;
  TaskId: number;
  IsConditional: boolean;
}

export interface Arrow {
  id: number;
  disabled: boolean;
  expression: string | null;
  from: number;
  to: number;
  hasCondition: boolean;
  offsetEnd?: number;
  offsetStart?: number;
}

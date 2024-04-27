import type {
  ColumnFiltersState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Updater,
} from '@tanstack/react-table';
import type { CSSProperties, ReactNode } from 'react';

export interface TableComponentOptions {
  allowFiltering: boolean;
  allowPagination: boolean;
  allowSorting: boolean;
  allowColumnResizing?: boolean;
  allowExpanding?: boolean;
}

export interface TableCallBackHandlers<TData> {
  sorting?: {
    onSortingChange: (updater: Updater<SortingState>) => void;
    state: SortingState;
  };
  pagination?: {
    state: PaginationState;
    onPaginationChange: (updater: Updater<PaginationState>) => void;
    pageCount: number;
  };
  columnFilters?: {
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
    state: ColumnFiltersState;
  };
  rowSelection?: {
    onRowSelectionChange: (updater: Updater<RowSelectionState>) => void;
    enableMultiRowSelection?: (row: Row<TData>) => boolean | boolean;
    enableRowSelection?: (row: Row<TData>) => boolean | boolean;
    state: RowSelectionState;
  };
  expanded?: {
    onExpandedChange: (updater: Updater<ExpandedState>) => void;
    getSubRows: (originalRow: TData, index: number) => undefined | TData[];
    state: ExpandedState;
  };
}

export interface TableProps<TData> {
  styles?: Record<string, CSSProperties>;
  classNames?: Record<string, string>;
  columns: any[];
  //    columns: ColumnDef<TData>[],
  data: TData[];
  isLoading?: boolean;
  options: TableComponentOptions;
  handlers?: TableCallBackHandlers<TData>;
  noDataMessage?: string | ReactNode;
}

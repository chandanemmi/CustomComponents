import React from 'react';

import { CircularProgress, Grid, TableSortLabel } from '@mui/material';
// import { SortByAlphaOutlined } from "@material-ui/icons";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import BackwardDisabled from '@/assets/tablePaginationIcons/backwardDisabled.svg';
import BackwardEnabled from '@/assets/tablePaginationIcons/backwardEnabled.svg';
import FastBackwardDisabled from '@/assets/tablePaginationIcons/fastBackwardDisabled.svg';
import FastBackwardEnabled from '@/assets/tablePaginationIcons/fastBackwardEnabled.svg';
import FastForwardDisabled from '@/assets/tablePaginationIcons/fastForwardDisabled.svg';
import FastForwardEnabled from '@/assets/tablePaginationIcons/fastForwardEnabled.svg';
import ForwardDisabled from '@/assets/tablePaginationIcons/forwardDisabled.svg';
import ForwardEnabled from '@/assets/tablePaginationIcons/forwardEnabled.svg';
import theme from '@/styles/theme';

import Filter from './Filter';
import {
  PaginationButton,
  PaginationButtonContainer,
  PaginationCurrentPageOf,
  PaginationRowPerPage,
  TableContainer,
} from './Table.style';
import Typography from '../typography/Typography';

import type { TableCallBackHandlers, TableComponentOptions, TableProps } from './Table.type';
import type { ColumnDef, Table, TableOptions } from '@tanstack/react-table';
import type { CSSProperties, ReactNode } from 'react';

const TableComponent = <TData,>({
  columns,
  data,
  options,
  handlers,
  isLoading = false,
  classNames = {},
  styles = {},
  noDataMessage = 'No data found',
}: TableProps<TData>) => {
  const memoizedData = React.useMemo(() => data, [data]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);
  const memonizedOptions = React.useMemo(
    () => makeOptions<TData>(options, handlers, memoizedData, memoizedColumns),
    [options, handlers, memoizedData, memoizedColumns]
  );
  const _table = useReactTable({
    ...memonizedOptions,
  });
  return (
    <TableContainer>
      <div className={classNames?.table_container} style={styles?.table_container}>
        <table
          className={classNames?.table}
          style={{
            // width: _table.getCenterTotalSize(),
            ...styles?.table,
          }}
        >
          <thead className={classNames?.thead} style={styles?.thead}>
            {_table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className={classNames?.thead_tr} style={styles?.thead_tr}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={classNames?.th}
                    style={{
                      width: header.getSize(),
                      ...styles?.th,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort()
                          ? renderSortIcon(header.column.getIsSorted())
                          : null}
                      </div>
                    )}
                    {header.column.getCanFilter() ? (
                      <div
                        className={classNames.column_filter_input_wrapper}
                        style={styles.column_filter_input_wrapper}
                      >
                        <Filter column={header.column} table={_table} />
                      </div>
                    ) : null}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={classNames?.tbody} style={styles?.tbody}>
            {_table.getRowModel().rows.length !== 0 && !isLoading ? (
              <React.Fragment>
                {_table.getRowModel().rows.map(row => {
                  const selected = row.getIsSelected() ? 'selected' : '';
                  return (
                    <tr
                      key={row.id}
                      className={` ${selected} ${classNames?.tbody_tr ? classNames?.tbody_tr : ''}`}
                      style={styles?.tbody_tr}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className={classNames?.td}
                          style={{ ...styles?.td, width: cell.column.getSize() }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <RenderDummyRows
                  rows={_table.getState().pagination.pageSize - _table.getRowModel().rows.length}
                  cols={_table.getHeaderGroups().reduce((p, c) => p + c.headers.length, 0)}
                />
              </React.Fragment>
            ) : (
              <NoDataFound
                message={noDataMessage}
                table={_table}
                isLoading={typeof isLoading === 'undefined' ? false : isLoading}
              />
            )}
          </tbody>
        </table>
      </div>
      {options?.allowPagination ? (
        <div
          className={classNames?.pagination_outer_container}
          style={styles?.pagination_outer_container}
        >
          <Grid
            container
            className="pagination_container"
            justifyContent="space-between"
            alignItems="center"
          >
            <PaginationCurrentPageOf>
              <Typography variant="body-xs-reg">
                Showing {_table.getState().pagination.pageIndex + 1}-{_table.getPageCount()} of{' '}
                {_table.getPageCount()} results
              </Typography>
            </PaginationCurrentPageOf>
            <PaginationButtonContainer>
              <PaginationRowPerPage>
                <Typography variant="body-xs-reg" style={{ paddingRight: '10px' }}>
                  Rows per page
                </Typography>
                <div
                  style={{
                    border: `1px solid ${theme.palette.neutral.neutral60}`,
                    borderRadius: '12px',
                    padding: '5px',
                  }}
                >
                  <select
                    value={_table.getState().pagination.pageSize}
                    onChange={e => {
                      _table.setPageSize(Number(e.target.value));
                    }}
                    disabled={isLoading}
                    className="pagination_pagesize_control"
                  >
                    {[5, 10, 20, 30, 40].map(pageSize => (
                      <option
                        key={pageSize}
                        value={pageSize}
                        className={classNames?.pagination_pagesize_control_option}
                        style={styles?.pagination_pagesize_control_option}
                      >
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </PaginationRowPerPage>
              {/* <PaginationButton
              onClick={() => _table.setPageIndex(0)}
              disabled={isLoading || !_table.getCanPreviousPage()}
            >
              <img
                alt="fast-backward"
                src={
                  isLoading || !_table.getCanPreviousPage()
                    ? FastBackwardDisabled.src
                    : FastBackwardEnabled.src
                }
              />
            </PaginationButton> */}
              <PaginationButton
                onClick={() => _table.previousPage()}
                disabled={isLoading || !_table.getCanPreviousPage()}
              >
                <img
                  alt="backward"
                  src={
                    isLoading || !_table.getCanPreviousPage()
                      ? BackwardDisabled.src
                      : BackwardEnabled.src
                  }
                />
              </PaginationButton>
              <PaginationButton
                onClick={() => _table.nextPage()}
                disabled={isLoading || !_table.getCanNextPage()}
              >
                <img
                  alt="forward"
                  src={
                    isLoading || !_table.getCanNextPage() ? ForwardDisabled.src : ForwardEnabled.src
                  }
                />
              </PaginationButton>
              {/* <PaginationButton
              onClick={() => _table.setPageIndex(_table.getPageCount() - 1)}
              disabled={isLoading || !_table.getCanNextPage()}
            >
              <img
                alt="fast-forward"
                src={
                  isLoading || !_table.getCanNextPage()
                    ? FastForwardDisabled.src
                    : FastForwardEnabled.src
                }
              />
            </PaginationButton> */}
            </PaginationButtonContainer>
          </Grid>
        </div>
      ) : null}
    </TableContainer>
  );
};

const renderSortIcon = (currentSort: 'asc' | 'desc' | boolean) => {
  const icons = {
    asc: <TableSortLabel direction="asc" active />,
    desc: <TableSortLabel direction="desc" active />,
  };
  if (typeof currentSort === 'string') {
    return icons[currentSort];
  }

  return null;
};

const onManualPagination = <TData,>(
  _options: TableOptions<TData>,
  handlers: TableCallBackHandlers<TData>
) => {
  if (handlers.pagination) {
    _options.manualPagination = true;
    _options.onPaginationChange = handlers.pagination.onPaginationChange;
    _options.state = { ..._options.state, pagination: handlers.pagination.state };
    _options.pageCount = handlers.pagination.pageCount;
  }
};

const onManualSorting = <TData,>(
  _options: TableOptions<TData>,
  handlers: TableCallBackHandlers<TData>
) => {
  if (handlers.sorting) {
    _options.manualSorting = true;
    _options.onSortingChange = handlers.sorting.onSortingChange;
    _options.state = { ..._options.state, sorting: handlers.sorting.state };
  }
};

const onManualFiltering = <TData,>(
  _options: TableOptions<TData>,
  handlers: TableCallBackHandlers<TData>
) => {
  if (handlers.columnFilters) {
    _options.manualFiltering = true;
    _options.onColumnFiltersChange = handlers.columnFilters.onColumnFiltersChange;
    _options.state = { ..._options.state, columnFilters: handlers.columnFilters.state };
  }
};

const onRowSelectionChange = <TData,>(
  _options: TableOptions<TData>,
  handlers: TableCallBackHandlers<TData>
) => {
  if (handlers.rowSelection) {
    _options.onRowSelectionChange = handlers.rowSelection.onRowSelectionChange;
    if (handlers.rowSelection.enableMultiRowSelection) {
      _options.enableMultiRowSelection = handlers.rowSelection.enableMultiRowSelection;
    }
    if (handlers.rowSelection.enableRowSelection) {
      _options.enableRowSelection = handlers.rowSelection.enableRowSelection;
    }
    _options.state = { ..._options.state, rowSelection: handlers.rowSelection.state };
  }
};

const onExpandedChange = <TData,>(
  _options: TableOptions<TData>,
  handlers: TableCallBackHandlers<TData>
) => {
  if (handlers.expanded) {
    _options.onExpandedChange = handlers.expanded.onExpandedChange;
    _options.getSubRows = handlers.expanded.getSubRows;
    _options.state = { ..._options.state, expanded: handlers.expanded.state };
  }
};

const makeOptions = <TData,>(
  optionsArg: TableComponentOptions,
  handlers: TableCallBackHandlers<TData> = {},
  data: TData[],
  columns: ColumnDef<TData>[]
) => {
  const options: TableOptions<TData> = {
    getCoreRowModel: getCoreRowModel(),
    data,
    columns,
  };

  if (optionsArg.allowFiltering) {
    options.getFilteredRowModel = getFilteredRowModel();
  }
  if (optionsArg.allowSorting) {
    options.getSortedRowModel = getSortedRowModel();
  }
  if (optionsArg.allowPagination) {
    options.getPaginationRowModel = getPaginationRowModel();
  }
  if (optionsArg.allowColumnResizing) {
    options.enableColumnResizing = true;
    options.columnResizeMode = 'onChange';
  }
  if (optionsArg.allowExpanding) {
    options.getExpandedRowModel = getExpandedRowModel();
  }

  onManualPagination(options, handlers);
  onManualSorting(options, handlers);
  onManualFiltering(options, handlers);
  onRowSelectionChange(options, handlers);
  onExpandedChange(options, handlers);

  return options;
};

interface NoDataFoundProps<Tdata> {
  message: string | ReactNode;
  table: Table<Tdata>;
  isLoading: boolean;
}
const NoDataFound = <TData,>(props: NoDataFoundProps<TData>) => {
  const totalCols = props.table.getHeaderGroups().reduce((p, c) => p + c.headers.length, 0);
  const style: CSSProperties =
    props.isLoading || props.message === 'No data found'
      ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: `${48 * props.table.getState().pagination.pageSize}px`,
          width: '100%',
        }
      : {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: `${88 * props.table.getState().pagination.pageSize}px`,
          width: '100%',
          fontWeight:500,
          color: '#59595980',
        };
  const loadingOrNoData = props.isLoading ? (
    <CircularProgress color="primary" size={90} />
  ) : (
    props.message
  );
  return (
    <tr>
      <td className="loading blankRow" colSpan={totalCols}>
        <Typography variant="heading-s" style={style}>
          {loadingOrNoData}
        </Typography>
      </td>
    </tr>
  );
};

interface RenderDummyColumnProps {
  rows: number;
  cols: number;
}
const RenderDummyRows = (props: RenderDummyColumnProps) => {
  if (props.cols < 0 || props.rows < 0) return null;
  const rows = Array(props.rows).fill(1);
  return (
    <React.Fragment>
      {rows.map((_, index) => (
        <tr className="blankRow" key={index}>
          <td key={index} colSpan={props.cols} />
        </tr>
      ))}
    </React.Fragment>
  );
};

export const columnHelper = createColumnHelper();
/*
TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  classNames: PropTypes.object,
  styles: PropTypes.object,
  isLoading: PropTypes.bool,
  options: PropTypes.shape({
    allowFiltering: PropTypes.bool,
    allowPagination: PropTypes.bool,
    allowSorting: PropTypes.bool,
  }),
  handlers: PropTypes.shape({
    sorting: PropTypes.shape({
      onSortingChange: PropTypes.func.isRequired,
      state: PropTypes.array.isRequired,
    }),
    pagination: PropTypes.shape({
      state: PropTypes.object.isRequired,
      onPaginationChange: PropTypes.func.isRequired,
      pageCount: PropTypes.number,
    }),
    columnFilters: PropTypes.shape({
      onColumnFiltersChange: PropTypes.object.isRequired,
      state: PropTypes.array.isRequired,
    }),
    rowSelection: PropTypes.shape({
      onRowSelectionChange: PropTypes.func.isRequired,
      enableMultiRowSelection: PropTypes.bool.isRequired,
      state: PropTypes.object.isRequired,
    }),
  }),
};

TableComponent.defaultProps = {
  options: {
    allowFiltering: false,
    allowPagination: true,
    allowSorting: true,
  },
};
*/
export default React.memo(TableComponent);

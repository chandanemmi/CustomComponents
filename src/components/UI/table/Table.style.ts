import { styled } from '@mui/material/styles';

export const TableContainer = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  minHeight: '500px',
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '12px',
  
  '& table': {
    width: '100%',
    border: '1px solid #E0E0E0',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  '& thead': {
    backgroundColor: `${theme.palette.primary.light}`,
  },
  '& th': {
    //borderRadius:'20px',
    position: 'relative',
    padding: '12px 16px',
    background: `${theme.palette.neutral.neutral20}`,
    borderWidth: '0px 1px',
    borderStyle: 'solid',
    // borderColor: '#FCFCFF',
    borderColor: '#F0F0F4',
    color: `${theme.palette.text.primary}`,
    // fontFamily: 'JioType-Medium',
    fontSize: '14px',
    textAlign: 'left',
    fontWeight: 600,
  },
  '& td': {
    padding: '18px 16px',
    borderWidth: '0px 1px',
    borderStyle: 'solid',
    //borderRadius:'20px',

    borderColor: '#F0F0F4',
    color: `${theme.palette.text.primary}`,
    fontSize: '14px',
    lineHeight: '18px',
    textAlign: 'left',
    // fontFamily: "",
  },
  '& .loading': {
    textAlign: 'center',
  },
  '& tr:nth-child(even)': {
    border: '1px solid #F8F8F8',
  },
  '& .pagination_container': {
    paddingTop: '20px',
    width: '100%',
  },
  '& .pagination_pagesize_control': {
    border: 'none',
    color: `${theme.palette.text.primary}`,
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  '& .pagination_pagesize_control:after': {
    paddingRight: '8px',
  },
  '& .pagination_pagesize_control:focus-visible': {
    outline: 'none',
  },
  '& tr.selected': {
    background: '#d6b9ff29',
  },
  '& .resizer': {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '5px',
    background: 'rgba(0, 0, 0, 0.5)',
    cursor: 'col-resize',
    userSelect: 'none',
    touchAction: 'none',

    '& .isResizing': {
      background: 'blue',
      opacity: 1,
    },
  },
  '@media (hover: hover)': {
    '.resizer': {
      opacity: 0,
    },
    '*:hover > .resizer': {
      opacity: 1,
    },
  },
  '& .blankRow': {
    minHeight: '72px',
    width: '100%',
    td: {
      width: '100%',
      height: '100%',
    },
  },
  '& .selectAll': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .checkbox': {
    color: `${theme.palette.text.primary}`,
  },
}));

export const PaginationCurrentPageOf = styled('div')(({ theme }) => ({
  border: 'none',
  color: '#2F3033',
  padding: '10px',
}));

export const PaginationButton = styled('button')(({ theme }) => ({
  padding: '10px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
}));

export const PaginationRowPerPage = styled('div')(({ theme }) => ({
  display: 'flex',
  border: 'none',
  color: '#2F3033',
  padding: '10px',
  alignItems: 'center',
}));

export const PaginationButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
}));

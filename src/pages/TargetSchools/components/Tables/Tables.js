import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  TableSortLabel,
  withStyles,
  Typography,
} from '@material-ui/core';
import { MdFirstPage, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLastPage, MdMoreVert } from 'react-icons/md';
// import { schools as schoolsData } from '../../data/mock-data'
import PropTypes from 'prop-types';
import classes from './Tables.module.scss';
import { useTargetSchool } from '../../hooks/TargetSchoolContext';
import { menuOptions } from '../../TargetSchoolsConfig'
import MenuOptions from '../MenuOptions/MenuOptions';

// Customize component TablePagination
function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0); // firstPage has index = 0
    console.log('first page: count = ', count);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.ceil(count / rowsPerPage) - 1);
  };

  const handleBackPageButtonClick = (event) => {
    onChangePage(event, page - 1); // current page - 1
  };

  const handleNextPageButtonClick = (event) => {
    onChangePage(event, page + 1); // current page + 1
  };

  return (
    <div className={classes.paging}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <MdLastPage /> : <MdFirstPage />}
      </IconButton>
      <IconButton onClick={handleBackPageButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <MdFirstPage /> : <MdLastPage />}
      </IconButton>
    </div>
  );
}

// Quy định kiểu dữ liệu cho props của TablePaginationActions
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

function SortableTableHeaders(props) {
  const { columns, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const MuiTableSortLabel = withStyles({
    root: {
      color: 'white !important',
      '&:hover': {
        color: 'white !important',
      },
      '&$active': {
        color: 'white !important',
      },
    },
    active: {},
    icon: {
      color: 'white !important',
    },
  })(TableSortLabel);

  return (
    <TableHead>
      <TableRow className={classes.tHead}>
        {columns.map((column) => (
          <TableCell key={column} className={classes.tHeadCell} sortDirection={orderBy === column ? order : false}>
            <MuiTableSortLabel active={orderBy === column} direction={orderBy === column ? order : 'asc'} onClick={createSortHandler(column)}>
              {column}
            </MuiTableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

SortableTableHeaders.propTypes = {
  columns: PropTypes.array.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

// Customize component Table
function Tables(props) {
  // const classes = useStyles()
  // Use States and Props to pass data for rows and columns from the Container/Page
  const { columns, rows } = props;

  //Use states which have been declared in the TargetSchoolContext
  const {
    page, setPage, rowsPerPage, setRowsPerPage,
    order, setOrder, orderBy, setOrderBy
  } = useTargetSchool();

  // const [avatarUrl, setAvatarUrl] = useState('')

  // storage.ref('images/avatars').child('cute.jpg').getDownloadURL().then(url => {
  //     setAvatarUrl(url)
  //     console.log('imagesRef: ', url)
  //     return url;
  // })

  // const fetchAvatarURL = (imageName) => {
  //     console.log('aaaaaaaaaaa')
  //     storage.ref('images/avatars').child(imageName).getDownloadURL().then(url => {
  //         setAvatarUrl(url)
  //         console.log('imagesRef: ', url)
  //         return url;
  //     })
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setPurposeChipColor = (purpose) => {
    switch (purpose) {
      case 'Sales mới':
        return <Chip label={purpose} style={{ backgroundColor: '#f57c00', color: 'white' }} />;
      case 'Chăm sóc':
        return <Chip label={purpose} style={{ backgroundColor: '#4caf50', color: 'white' }} />;
      case 'Tái ký hợp đồng':
        return <Chip label={purpose} style={{ backgroundColor: '#1976d2', color: 'white' }} />;
      case 'Ký mới': // hợp đồng
        return <Chip label={purpose} style={{ backgroundColor: '#6d33ff', color: 'white' }} />;
      default:
        // #5c21f3
        return <Chip label={purpose} />;
    }
  };

  const handleRequestSort = (event, columnName) => {
    const isAsc = orderBy === columnName && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnName);

    console.log('event: ', event.target);
    console.log('columnName: ', columnName);
    console.log('order: ', isAsc);

    // Xử lý logic (dispatch reducer, gọi API,... ở đây)

  };

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} stickyHeader size="small" aria-label="sticky table">
        <SortableTableHeaders columns={columns} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody className={classes.tBody}>
          {rows.length > 0 ? (
            (rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
             
              <TableRow key={row.id} className={classes.tBodyRow}>
                {/* <TableCell className={styles.tableCell} align="center">{row.no}</TableCell> */}
                <TableCell className={classes.tBodyCell}>{row.schoolName}</TableCell>
                <TableCell className={classes.tBodyCell}>{row.district}</TableCell>
                <TableCell className={classes.tBodyCell}>{row.reprGender ? `Mr. ${row.reprName}` : `Ms. ${row.reprName}`}</TableCell>
                <TableCell className={classes.tBodyCell}>
                  <ListItem style={{ padding: 0, margin: 0 }}>
                    <ListItemAvatar>
                      {/* <Avatar src={() => fetchAvatarURL(row.avatar)} /> */}
                      <Avatar src={row.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.picName}
                      primary={row.fullName}
                      primaryTypographyProps={{ style: { fontSize: '0.875rem' }}}
                      secondary={row.username}
                      secondaryTypographyProps={{ style: { fontSize: '0.8rem' }}}
                    />
                  </ListItem>
                </TableCell>
                <TableCell className={classes.tBodyCell}>{row.schoolYear}</TableCell>
                <TableCell className={classes.tBodyCell}>{setPurposeChipColor(row.purpose)}</TableCell>
                <TableCell className={classes.tBodyCell} align="right">
                  <MenuOptions options={menuOptions} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <i style={{ color: 'gray', fontSize: '1.3em' }}>No records found.</i>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[15, 25, 50, 100, { label: 'All', value: -1 }]}
        component="div"
        // colSpan={3}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </TableContainer>
  );
}

export default Tables;

// PropsTypes này dùng để sau này tách ra tái sử dụng cho dễ
Tables.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

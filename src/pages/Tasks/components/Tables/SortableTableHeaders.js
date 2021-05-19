import {
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    withStyles,
} from '@material-ui/core'
import { roleNames } from '../../../../constants/Generals'
import classes from './Tables.module.scss'

export default function SortableTableHeaders(props) {
    const {
        user,
        columns,
        direction,
        column,
        onRequestSort,
        numSelected,
        rowCount,
        onSelectAllClick,
    } = props
    const createSortHandler = (col, direction) => {
        onRequestSort(col, direction)
    }

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
    })(TableSortLabel)

    return (
        <TableHead>
            <TableRow className={classes.tHead}>
                {user.roles[0] !== roleNames.salesman && (
                    <TableCell padding="checkbox" className={classes.tHeadCell}>
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                )}
                {columns.map((col) => {
                    return (
                        <TableCell
                            key={col.key}
                            className={classes.tHeadCell}
                            sortDirection={column === col.key ? direction : false}
                            align={
                                (col.key === 'no' || col.key === 'user.fullName')
                                    ? 'center' : 'left'
                            }
                            width={user.roles[0] !== roleNames.salesman ? col.width1 : col.width2}
                        >
                            <MuiTableSortLabel
                                active={column === col.key}
                                direction={column === col.key ? direction : 'asc'}
                                onClick={() => createSortHandler(col, direction)}
                            >
                                {col.name}
                            </MuiTableSortLabel>
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}

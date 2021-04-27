import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@material-ui/core'
import {
    MdDelete,
    MdDescription,
    MdInfo,
    MdMoreVert,
    MdPersonAdd,
} from 'react-icons/md'
import PropTypes from 'prop-types'
// import { useAuth } from '../../../../../hooks/AuthContext'
import ConfirmRemove from '../../../dialogs/ConfirmRemove'
import CannotRemove from '../../../dialogs/CannotRemove'
import { useTargetSchool } from '../../../hooks/TargetSchoolContext'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    // const { user } = useAuth()
    const { url } = useRouteMatch()

    const { params } = useTargetSchool()

    const stateData = {
        model: data,
        params: params,
        pathName: `${url}/${data.username}`,
    }

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenus = () => {
        setAnchorEl(null)
    }

    const handleOpenConfirmation = () => {
        setAnchorEl(null)
        setOpen(true)
    }

    // const handleRemove = () => {
    //     setOpen(false)

    //     // Gọi API DELETE --> load lại trang
    // }

    const renderRemoveDialog = () => {
        if (data?.fullName) {
            return (
                <CannotRemove
                    open={open}
                    onClose={() => setOpen(false)}
                    data={data}
                />
            )
        } else {
            return (
                <ConfirmRemove
                    open={open}
                    onClose={() => setOpen(false)}
                    data={data}
                />
            )
        }
    }

    return (
        <div>
            <IconButton color="primary" onClick={handleOpen}>
                <MdMoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleCloseMenus}
            >
                <MenuItem
                    onClick={handleCloseMenus}
                    component={Link}
                    to={{
                        pathname: `${url}/${data.id}`,
                        state: { data: stateData },
                    }}
                >
                    <ListItemIcon className={classes.itemIcon}>
                        <MdInfo fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        View details
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseMenus}>
                    <ListItemIcon className={classes.itemIcon}>
                        <MdDescription fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        View reports
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseMenus}>
                    <ListItemIcon className={classes.itemIcon}>
                        <MdPersonAdd fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        Assign
                    </ListItemText>
                </MenuItem>
                <>
                    <MenuItem onClick={handleOpenConfirmation}>
                        <ListItemIcon className={classes.itemIcon}>
                            <MdDelete fontSize="large" />
                        </ListItemIcon>
                        <ListItemText className={classes.itemText}>
                            Remove
                        </ListItemText>
                    </MenuItem>
                    {renderRemoveDialog()}
                </>
            </Menu>
        </div>
    )
}

export default MenuOptions

MenuOptions.propTypes = {
    data: PropTypes.array.isRequired,
}

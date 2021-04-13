import React, { useState } from 'react'
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
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdEdit, MdInfo, MdDelete } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useAuth } from '../../../../../hooks/AuthContext'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props

    const [anchorEl, setAnchorEl] = useState(null)
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const { user } = useAuth()
    const { url } = useRouteMatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenus = () => {
        setAnchorEl(null)
    }

    const handleOpenConfirmation = () => {
        setAnchorEl(null)
        setOpenConfirmation(true)
    }

    const handleRemove = () => {
        setOpenConfirmation(false)

        // Gọi API DELETE --> load lại trang
    }

    const renderMenus = (role) => {
        switch (role) {
            case 'ADMIN':
                return (
                    <>
                        <MenuItem onClick={handleCloseMenus} component={Link} to={{
                            pathname: `${url}/${data.name}`,
                            state: { data: data },
                        }}
                        >
                            <ListItemIcon className={classes.itemIcon}>
                                <MdEdit fontSize="large" />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText}>
                                Edit info
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
                            <Dialog
                                open={openConfirmation}
                                onClose={() => setOpenConfirmation(false)}
                            >
                                <DialogTitle>Confirm Remove</DialogTitle>
                                <Divider />
                                <DialogContent>
                                    <DialogContentText className={classes.dialogText}>
                                        <p>
                                            Do you really want to remove school
                                            <strong><em> {data.educationalLevel} {data.name}</em></strong>?
                                        </p>
                                        <p>This process cannot be undone.</p>
                                    </DialogContentText>
                                </DialogContent>
                                <Divider />
                                <DialogActions>
                                    <Button variant="contained" disableElevation onClick={() => setOpenConfirmation(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" disableElevation className={classes.btnRemove} onClick={handleRemove} autoFocus>
                                        Remove
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    </>
                )

            case 'SALES MANAGER':
                // case 'SALES SUPERVISOR':
                return (
                    <MenuItem
                        onClick={handleCloseMenus}
                        component={Link}
                        to={{
                            pathname: `${url}/${data.name}`,
                            state: { data: data },
                        }}
                    >
                        <ListItemIcon className={classes.itemIcon}>
                            <MdInfo fontSize="large" />
                        </ListItemIcon>
                        <ListItemText className={classes.itemText}>
                            View details
                        </ListItemText>
                    </MenuItem>
                )

            default:
                break
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
                {renderMenus(user.roles[0])}
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

MenuOptions.propTypes = {
    data: PropTypes.object.isRequired,
}

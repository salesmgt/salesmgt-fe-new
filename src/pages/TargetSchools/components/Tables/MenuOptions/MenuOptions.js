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
import { useAuth } from '../../../../../hooks/AuthContext'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const [openConfirmation, setOpenConfirmation] = useState(false);

    console.log('data từ MenuOptions: ', data)

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

    const renderRemoveDialog = () => {

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
                    <Dialog
                        open={openConfirmation}
                        onClose={() => setOpenConfirmation(false)}
                    >
                        <DialogTitle>Confirm Remove</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText className={classes.dialogText}>
                                <p>
                                    Do you really want to remove
                                    <strong><em> {data.educationalLevel} {data.schoolName} </em></strong>
                                    from list of target schools in <strong>{data.schoolYear}</strong>?
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
            </Menu>
        </div>
    )
}

export default MenuOptions

MenuOptions.propTypes = {
    data: PropTypes.array.isRequired,
}

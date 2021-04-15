import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdInfo, MdEdit, MdDelete } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useAuth } from '../../../../../hooks/AuthContext'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const { user } = useAuth()
    const { url } = useRouteMatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
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
        const comment = data.comment ? { ...data.comment } : null;
        // const commentedBy = [];

        // if (comments.length > 0) {
        // comments.forEach(comment => {
        //     commentedBy.push(comment.fullName);
        // });
        if (comment) {
            return (
                <Dialog
                    open={openConfirmation}
                    onClose={() => setOpenConfirmation(false)}
                >
                    <DialogTitle>Caution</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText className={classes.dialogText}>
                            <p>
                                You cannot remove the report of school
                                <strong><em> {data.educationalLevel} {data.schoolName} </em></strong>
                                on <strong>{data.date}</strong>.
                            </p>
                            <p>
                                This report is already commented by {comment.fullName}.
                                {/* This report is already commented by {commentedBy.toString()}. */}
                            </p>
                        </DialogContentText>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" disableElevation autoFocus onClick={() => setOpenConfirmation(false)}>
                            OK, I understood
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }
        // else if (data.comments.length === 0) {
        else {
            return (
                <Dialog
                    open={openConfirmation}
                    onClose={() => setOpenConfirmation(false)}
                >
                    <DialogTitle>Confirm Remove</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText className={classes.dialogText}>
                            <p>
                                Do you really want to remove report of school
                                <strong><em> {data.educationalLevel} {data.schoolName} </em></strong>
                                on <strong>{data.date}</strong>?
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
            )
        }
    }

    // console.log('user = ', user);
    const renderMenus = (role) => {
        switch (role) {
            case 'SALES MANAGER':
                // case 'SALES SUPERVISOR':
                return (
                    <>
                        <MenuItem onClick={handleCloseMenus} component={Link} to={{ pathname: `${url}/${data.id}`, state: { data: data } }}>
                            <ListItemIcon className={classes.itemIcon}><MdInfo fontSize="large" /></ListItemIcon>
                            <ListItemText className={classes.itemText}>View details</ListItemText>
                        </MenuItem>
                        {/**For Salesman:
                            - View details and update report inside that form.
                            For Manager & Supervisor:
                            - View details and give comment inside that form.
                        */}
                    </>
                );

            case 'SALESMAN':
                return (
                    <>
                        <MenuItem onClick={handleCloseMenus} component={Link} to={{ pathname: `${url}/${data.id}`, state: { data: data } }}>
                            <ListItemIcon className={classes.itemIcon}><MdEdit fontSize="large" /></ListItemIcon>
                            <ListItemText className={classes.itemText}>Update</ListItemText>
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
                    </>
                );

            default:
                break;
        }
    }

    return (
        <div>
            <IconButton color='primary' onClick={handleOpen}>
                <MdMoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleCloseMenus}>
                {renderMenus(user.roles[0])}
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

MenuOptions.propTypes = {
    data: PropTypes.object.isRequired
}
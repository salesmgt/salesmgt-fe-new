import React, { useState } from 'react'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdInfo, MdDelete } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useAuth } from '../../../../../hooks/AuthContext'
import ConfirmRemove from '../../../dialogs/ConfirmRemove'
import CannotRemove from '../../../dialogs/CannotRemove'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

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
        setOpen(true)
    }

    const renderRemoveDialog = () => {
        // const comment = data.comment ? { ...data.comment } : null;
        // const commentedBy = [];

        // if (comments.length > 0) {
        // comments.forEach(comment => {
        //     commentedBy.push(comment.fullName);
        // });
        if (data?.contextComments) {
            return (
                <CannotRemove open={open} onClose={() => setOpen(false)} data={data} />
            )
        }
        // else if (data.comments.length === 0) {
        else {
            return (
                <ConfirmRemove open={open} onClose={() => setOpen(false)} data={data} />
            )
        }
    }

    // console.log('user = ', user);
    const renderMenus = (role) => {
        switch (role) {
            case 'SALES MANAGER':
            case 'SALES SUPERVISOR':
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
                            <ListItemIcon className={classes.itemIcon}><MdInfo fontSize="large" /></ListItemIcon>
                            <ListItemText className={classes.itemText}>View details</ListItemText>
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
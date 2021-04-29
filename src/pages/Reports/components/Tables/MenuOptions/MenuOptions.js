import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdInfo, MdDelete } from 'react-icons/md'
import ConfirmRemove from '../../../dialogs/ConfirmRemove/ConfirmRemove'
import CannotRemove from '../../../dialogs/CannotRemove/CannotRemove'
import { useAuth } from '../../../../../hooks/AuthContext'
import { useReport } from '../../../hooks/ReportContext'
import { roleNames } from '../../../../../constants/Generals'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data, refreshAPI } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const { user } = useAuth()
    const { url } = useRouteMatch()

    const { params } = useReport()

    // console.log('Reports: data = ', data);

    const stateData = {
        model: data,
        params: params,
        pathName: `${url}/${data.id}`,
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

    const renderRemoveDialog = () => {
        // const comment = data.comment ? { ...data.comment } : null;
        // const commentedBy = [];

        // if (comments.length > 0) {
        // comments.forEach(comment => {
        //     commentedBy.push(comment.fullName);
        // });
        // if (user.username === data?.username) {
            if (data?.contextComments) {
                return (
                    <CannotRemove
                        open={open}
                        onClose={() => setOpen(false)}
                        data={data}
                    />
                )
            }
            // else if (data.comments.length === 0) {
            else {
                return (
                    <ConfirmRemove open={open} onClose={() => setOpen(false)} data={data} refreshAPI={refreshAPI} />
                )
            }
        // } else {
        //     const newData = {...data, msg: 'You cannot remove reports of the others.'}
        //     return (
        //         <CannotRemove open={open} onClose={() => setOpen(false)} data={newData} />
        //     )
        // }
    }

    // console.log('user = ', user);
    const renderMenus = (role) => {
        switch (role) {
            case roleNames.manager:
            case roleNames.supervisor:
                return (
                    <div>
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
                        {/**For Salesman:
                            - View details and update report inside that form.
                            For Manager & Supervisor:
                            - View details and give comment inside that form.
                        */}
                    </div>
                )

            case roleNames.salesman:
                return (
                    <div>
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
                        {user.username === data?.username && (
                            <div>
                                <MenuItem onClick={handleOpenConfirmation}>
                                    <ListItemIcon className={classes.itemIcon}>
                                        <MdDelete fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText className={classes.itemText}>
                                        Remove
                                    </ListItemText>
                                </MenuItem>
                                {renderRemoveDialog()}
                            </div>
                        )}
                        {/**For Salesman:
                            - View details and update report inside that form.
                            For Manager & Supervisor:
                            - View details and give comment inside that form.
                        */}
                    </div>
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

// MenuOptions.propTypes = {
//     data: PropTypes.object.isRequired,
// }

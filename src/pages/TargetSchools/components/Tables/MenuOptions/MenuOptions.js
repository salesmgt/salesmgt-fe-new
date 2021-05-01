import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@material-ui/core'
import { MdDelete, MdDescription, MdInfo, MdMoreVert, MdNoteAdd } from 'react-icons/md'
import { IoPersonRemoveSharp } from "react-icons/io5"
import { useAuth } from '../../../../../hooks/AuthContext'
import ConfirmRemove from '../../../dialogs/ConfirmRemove/ConfirmRemove'
import CannotRemove from '../../../dialogs/CannotRemove/CannotRemove'
import ConfirmUnassign from '../../../dialogs/ConfirmUnassign/ConfirmUnassign'
import CreateMOU from '../../../dialogs/CreateMOU/CreateMOU'
import { useTargetSchool } from '../../../hooks/TargetSchoolContext'
import { Consts } from '../../../TargetSchoolsConfig'
import { roleNames } from '../../../../../constants/Generals'
// import PropTypes from 'prop-types'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data, refreshAPI } = props
    const { menuItems } = Consts

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [openAssign, setOpenAssign] = useState(false)
    const [openUnassign, setOpenUnassign] = useState(false)
    const [openMOU, setOpenMOU] = useState(false)

    const { user } = useAuth()
    const { params } = useTargetSchool()
    const { url } = useRouteMatch()

    const stateData = {
        model: data,
        params: params, // get from context
        pathName: `${url}/${data.id}`,
    }

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenus = () => {
        setAnchorEl(null)
    }

    const handleOpenConfirmRemove = () => {
        setAnchorEl(null)
        setOpen(true)
    }

    const handleOpenConfirmUnassign = () => {
        setOpenUnassign(true)
        setAnchorEl(null)
    }

    const handleOpenConfirmAssign = () => {
        setOpenAssign(true)
        setAnchorEl(null)
    }

    const handleOpenMOU = () => {
        setOpenMOU(true)
        setAnchorEl(null)
    }

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
                    refreshAPI={refreshAPI}
                />
            )
        }
    }

    const renderAssignedDialog = () => {
        if (data?.fullName) {
            return (
                <ConfirmUnassign 
                    notify={props.notify} setNotify={props.setNotify}
                    open={openUnassign}
                    onClose={() => setOpenUnassign(false)}
                    data={data}
                    refreshAPI={refreshAPI}
                />
            )
        } else {
            // assign one dialog
            return (
                <></>
            )
        }
    }

    const renderMOUDialog = () => {
        return (
            <CreateMOU
                open={openMOU}
                onClose={() => setOpenMOU(false)}
                refreshPage={refreshAPI}
                // data={data}
            />
        )
    }

    return (
        <div>
            <IconButton color="primary" onClick={handleOpenMenu}>
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
                        {menuItems.details.title}
                    </ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={handleCloseMenus}
                    component={Link}
                    to={{
                        pathname: '/apps/reports',
                        state: { targetId: data.id },
                    }}
                >
                    <ListItemIcon className={classes.itemIcon}>
                        <MdDescription fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        {menuItems.reports.title}
                    </ListItemText>
                </MenuItem>

                {user.roles[0] === roleNames.salesman && (
                    <div>
                        <MenuItem onClick={handleOpenMOU}>
                            <ListItemIcon className={classes.itemIcon}>
                                <MdNoteAdd fontSize="large" />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText}>
                                {menuItems.mou.title}
                            </ListItemText>
                        </MenuItem>
                        {renderMOUDialog()}
                    </div>
                )}

                {/* <MenuItem onClick={handleCloseMenus}>
                    <ListItemIcon className={classes.itemIcon}>
                        <MdPersonAdd fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        {menuItems.assign.title}
                    </ListItemText>
                </MenuItem> */}
                {user.roles[0] !== roleNames.salesman && (
                    <div>
                        <MenuItem onClick={handleOpenConfirmRemove}>
                            <ListItemIcon className={classes.itemIcon}>
                                <MdDelete fontSize="large" />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText}>
                                {menuItems.remove.title}
                            </ListItemText>
                        </MenuItem>
                        {renderRemoveDialog()}
                    </div>
                )}
                {user.roles[0] !== roleNames.salesman && data?.fullName && (
                    <div>
                        <MenuItem onClick={handleOpenConfirmUnassign}>
                            <ListItemIcon className={classes.itemIcon}>
                                <IoPersonRemoveSharp />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText}>
                                {menuItems.unassign.title}
                            </ListItemText>
                        </MenuItem>
                        {renderAssignedDialog()}
                    </div>
                )}
            </Menu>
        </div>
    )
}

export default MenuOptions

// MenuOptions.propTypes = {
//     data: PropTypes.object.isRequired,
// }

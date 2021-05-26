import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
} from '@material-ui/core'
import {
    MdDelete,
    MdDescription,
    MdInfo,
    MdMoreVert,
    MdPersonAdd,
    MdNoteAdd,
} from 'react-icons/md'
import { IoPersonRemoveSharp } from 'react-icons/io5'
import { useAuth } from '../../../../../hooks/AuthContext'
import ConfirmRemove from '../../../dialogs/ConfirmRemove/ConfirmRemove'
import CannotRemove from '../../../dialogs/CannotRemove/CannotRemove'
import ConfirmUnassign from '../../../dialogs/ConfirmUnassign/ConfirmUnassign'
import CreateServices from '../../../dialogs/CreateServices/CreateServices'
import { useTask } from '../../../hooks/TaskContext'
import { Consts } from '../../../TasksConfig'
import { roleNames, statusNames, taskResultNames } from '../../../../../constants/Generals'
// import PropTypes from 'prop-types'
import Assign from '../../../dialogs/Assign/Assign'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data, refreshAPI, setNotify } = props
    const { menuItems } = Consts

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [openAssign, setOpenAssign] = useState(false)
    const [openUnassign, setOpenUnassign] = useState(false)
    const [openServices, setOpenServices] = useState(false)

    const [rows, setRows] = useState([data])

    const { user } = useAuth()
    const { params } = useTask()
    const { url } = useRouteMatch()

    const stateData = {
        model: data,
        params: params, // get from context
        // pathName: `${url}/${data.id}`,
    }

    // console.log('task data: ', data);

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

    const handleOpenAssignOne = () => {
        setOpenAssign(true)
        setAnchorEl(null)
    }

    const handleOpenServices = () => {
        setOpenServices(true)
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
                    setNotify={setNotify}
                />
            )
        }
    }

    const renderAssignedDialog = () => {
        if (data?.fullName) {
            return (
                <ConfirmUnassign
                    // notify={notify}
                    setNotify={setNotify}
                    open={openUnassign}
                    onClose={() => setOpenUnassign(false)}
                    data={data}
                    refreshAPI={refreshAPI}
                />
            )
        } else if (!data?.fullName) {
            // assign one dialog
            return (
                <Assign
                    // notify={notify}
                    setNotify={setNotify}
                    open={openAssign}
                    onClose={() => setOpenAssign(false)}
                    rows={rows}
                    setRows={setRows}
                    refreshAPI={refreshAPI}
                />
            )
        }
    }

    const renderServicesDialog = () => {
        return (
            <CreateServices
                open={openServices}
                onClose={() => setOpenServices(false)}
                refreshPage={refreshAPI}
                taskId={data?.id}
                schoolId={data?.schoolId}
                schoolLevel={data?.level}
                schoolName={data?.schoolName}
                schoolStatus={data?.schoolStatus}
                setNotify={setNotify}
            />
        )
    }

    return (
        <div>
            <Tooltip title="Actions">
                <IconButton color="primary" onClick={handleOpenMenu}>
                    <MdMoreVert />
                </IconButton>
            </Tooltip>
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
                        state: { taskId: data.id, schoolName: data.schoolName, PIC: data.username },
                    }}
                >
                    <ListItemIcon className={classes.itemIcon}>
                        <MdDescription fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        {menuItems.reports.title}
                    </ListItemText>
                </MenuItem>

                {user.roles[0] === roleNames.salesman && data?.schoolStatus !== statusNames.pending
                    && data?.result !== taskResultNames.successful &&
                    (
                        <div>
                            <MenuItem onClick={handleOpenServices}>
                                <ListItemIcon className={classes.itemIcon}>
                                    <MdNoteAdd fontSize="large" />
                                </ListItemIcon>
                                <ListItemText className={classes.itemText}>
                                    {menuItems.services.title}
                                </ListItemText>
                            </MenuItem>
                            {renderServicesDialog()}
                        </div>
                    )
                }
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
                {user.roles[0] !== roleNames.salesman && !data?.fullName && (
                    <div>
                        <MenuItem onClick={handleOpenAssignOne}>
                            <ListItemIcon className={classes.itemIcon}>
                                <MdPersonAdd />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText}>
                                {menuItems.assign.title}
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

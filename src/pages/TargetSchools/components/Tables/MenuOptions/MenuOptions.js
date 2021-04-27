import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
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
} from 'react-icons/md'
// import { useAuth } from '../../../../../hooks/AuthContext'
import ConfirmRemove from '../../../dialogs/ConfirmRemove/ConfirmRemove'
import CannotRemove from '../../../dialogs/CannotRemove/CannotRemove'
import { useTargetSchool } from '../../../hooks/TargetSchoolContext'
import { Consts } from '../../../TargetSchoolsConfig'
// import PropTypes from 'prop-types'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const { menuItems } = Consts

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false);

    // console.log('data từ MenuOptions: ', data)

    // const { user } = useAuth()
    const { params } = useTargetSchool()
    const { url } = useRouteMatch()

    const stateData = {
        model: data,
        params: params,  // get from context
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
        if (data?.fullName) {
            return (
                <CannotRemove open={open} onClose={() => setOpen(false)} data={data} />
            )
        }
        else {
            return (
                <ConfirmRemove open={open} onClose={() => setOpen(false)} data={data} />
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
                        {menuItems.details.title}
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCloseMenus}>
                    <ListItemIcon className={classes.itemIcon}>
                        <MdDescription fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        {menuItems.reports.title}
                    </ListItemText>
                </MenuItem>
                {/* <MenuItem onClick={handleCloseMenus}>
                    <ListItemIcon className={classes.itemIcon}>
                        <MdPersonAdd fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        {menuItems.assign.title}
                    </ListItemText>
                </MenuItem> */}
                <div>
                    <MenuItem onClick={handleOpenConfirmation}>
                        <ListItemIcon className={classes.itemIcon}>
                            <MdDelete fontSize="large" />
                        </ListItemIcon>
                        <ListItemText className={classes.itemText}>
                            {menuItems.remove.title}
                        </ListItemText>
                    </MenuItem>
                    {renderRemoveDialog()}
                </div>
            </Menu>
        </div>
    )
}

export default MenuOptions

// MenuOptions.propTypes = {
//     data: PropTypes.object.isRequired,
// }

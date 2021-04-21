import React, { useState } from 'react'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdInfo } from 'react-icons/md'
import PropTypes from 'prop-types'
// import { useAuth } from '../../../../../hooks/AuthContext'
// import { roleNames } from '../../../../../utils/Constants'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props //options,
    const [anchorEl, setAnchorEl] = useState(null)

    // const { user } = useAuth()
    const { url } = useRouteMatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // const btnViewDetail = (role) => {
    //     switch (role) {
    //         case 'SALES MANAGER':
    //             return (
    //                 <MenuItem onClick={handleClose} >
    //                     <ListItemIcon className={classes.itemIcon}></ListItemIcon>
    //                     <ListItemText className={classes.itemText}></ListItemText>
    //                 </MenuItem >
    //             )
    //         case 'SALES SUPERVISOR':
    //             return (
    //                 <MenuItem onClick={handleClose} >
    //                     <ListItemIcon className={classes.itemIcon}></ListItemIcon>
    //                     <ListItemText className={classes.itemText}></ListItemText>
    //                 </MenuItem >
    //             )
    //         default:
    //             break
    //     }
    // }

    return (
        <div>
            <IconButton color="primary" onClick={handleOpen}>
                <MdMoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={{
                        pathname: `${url}/${data.username}`,
                        state: { data: data },
                    }}
                >
                    <ListItemIcon className={classes.itemIcon}>
                        <MdInfo fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.itemText}>
                        View Details
                    </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

MenuOptions.propTypes = {
    data: PropTypes.array.isRequired,
}

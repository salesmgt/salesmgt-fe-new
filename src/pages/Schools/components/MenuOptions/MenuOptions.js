import React, { useEffect, useState } from 'react'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdDelete, MdEdit, MdInfo } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useAuth } from '../../../../hooks/AuthContext'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { id } = props
    const [anchorEl, setAnchorEl] = useState(null);

    // console.log('dad', school)

    const { user } = useAuth()
    const { url } = useRouteMatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log('user = ', user);
    const renderMenus = (role) => {
        switch (role) {
            case 'ADMIN':
                return (
                    <MenuItem onClick={handleClose} component={Link} to={{ pathname: `${url}/${id}` }}>
                        <ListItemIcon className={classes.icon}><MdEdit fontSize="large" /></ListItemIcon>
                        <ListItemText className={classes.text}>Edit info</ListItemText>
                    </MenuItem>
                );

            case 'SALES MANAGER':
            case 'SALES SUPERVISOR':
                return (
                    <MenuItem onClick={handleClose} component={Link} to={{ pathname: `${url}/${id}`, state: { id: id } }}>
                        <ListItemIcon className={classes.icon}><MdInfo fontSize="large" /></ListItemIcon>
                        <ListItemText className={classes.text}>View details</ListItemText>
                    </MenuItem>
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
            <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
                {renderMenus(user.roles[0])}
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

MenuOptions.propTypes = {
    id: PropTypes.object.isRequired
}
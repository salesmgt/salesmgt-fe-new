import React, { useState } from 'react'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@material-ui/core'
import { MdEdit, MdMoreVert } from 'react-icons/md'
import PropTypes from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const { url } = useRouteMatch()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
                    <ListItemIcon className={classes.icon}>
                        <MdEdit fontSize="large" />
                    </ListItemIcon>
                    <ListItemText className={classes.text}>
                        Edit info
                    </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default MenuOptions

MenuOptions.propTypes = {
    data: PropTypes.array.isRequired,
}

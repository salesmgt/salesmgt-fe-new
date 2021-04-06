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
    MdPersonAdd,
} from 'react-icons/md'
import PropTypes from 'prop-types'

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
                        pathname: `${url}/${data.id}`,
                        state: { data: data },
                    }}
                >
                    <ListItemIcon style={{ minWidth: '1.7rem' }}>
                        <MdInfo fontSize="large" />
                    </ListItemIcon>
                    <ListItemText style={{ margin: 0, padding: 0 }}>
                        View details
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon style={{ minWidth: '1.7rem' }}>
                        <MdDescription fontSize="large" />
                    </ListItemIcon>
                    <ListItemText style={{ margin: 0, padding: 0 }}>
                        View reports
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon style={{ minWidth: '1.7rem' }}>
                        <MdPersonAdd fontSize="large" />
                    </ListItemIcon>
                    <ListItemText style={{ margin: 0, padding: 0 }}>
                        Assign
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon style={{ minWidth: '1.7rem' }}>
                        <MdDelete fontSize="large" />
                    </ListItemIcon>
                    <ListItemText style={{ margin: 0, padding: 0 }}>
                        Remove this
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

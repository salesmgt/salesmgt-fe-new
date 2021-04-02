import React, { useState } from 'react'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import { MdMoreVert } from 'react-icons/md'
import PropTypes from 'prop-types'

function MenuOptions(props) {
    const { options } = props
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton color='primary' onClick={handleOpen}>
                <MdMoreVert/>
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
                {options.map(option => (
                    <MenuItem key={option.text} onClick={handleClose}>
                        <ListItemIcon style={{ minWidth: '1.7rem' }}>{option.icon}</ListItemIcon>
                        <ListItemText style={{ margin: 0, padding: 0 }}>{option.text}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default MenuOptions

MenuOptions.propTypes = {
    options: PropTypes.array.isRequired
}
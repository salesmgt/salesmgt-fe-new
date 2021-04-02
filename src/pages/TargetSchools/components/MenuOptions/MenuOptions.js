import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
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
                    <MenuItem key={option.label} onClick={handleClose}>{option.label}</MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default MenuOptions

MenuOptions.propTypes = {
    options: PropTypes.array.isRequired
}
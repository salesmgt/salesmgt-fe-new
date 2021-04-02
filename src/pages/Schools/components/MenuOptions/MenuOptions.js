import React, { useState } from 'react'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdDelete, MdEdit } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useAuth } from '../../../../hooks/AuthContext'

function MenuOptions(props) {
    const { school } = props    // options, 
    const [anchorEl, setAnchorEl] = useState(null);

    console.log('dad', school)

    const { user } = useAuth()
    const { url } = useRouteMatch()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton color='primary' onClick={handleOpen}>
                <MdMoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
                {/* {options.map(option => ( */}

                <MenuItem onClick={handleClose} component={Link} to={{ pathname: `${url}/${school?.id}`, state: { school: school } }}>
                    <ListItemIcon style={{ minWidth: '1.7rem' }}><MdEdit /></ListItemIcon>
                    <ListItemText style={{ margin: 0, padding: 0 }}>Edit info</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon style={{ minWidth: '1.7rem' }}><MdDelete /></ListItemIcon>
                    <ListItemText style={{ margin: 0, padding: 0 }}>Remove this</ListItemText>
                </MenuItem>
                {/* ))} */}
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

MenuOptions.propTypes = {
    // options: PropTypes.array.isRequired,
    school: PropTypes.object.isRequired
}
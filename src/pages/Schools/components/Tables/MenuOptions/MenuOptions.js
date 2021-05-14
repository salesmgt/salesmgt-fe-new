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
import { useSchool } from '../../../hooks/SchoolContext'
import { Consts } from '../../../SchoolsConfig'
// import PropTypes from 'prop-types'
import classes from './MenuOptions.module.scss'

function MenuOptions(props) {
    const { data } = props
    const { menuItems } = Consts

    const { params } = useSchool()

    const { url } = useRouteMatch()

    const [anchorEl, setAnchorEl] = useState(null)

    const stateData = {
        model: data,
        params: params,
        // pathName: `${url}/${data.name}`,
    }

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenus = () => {
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
                onClose={handleCloseMenus}
            >
                <MenuItem
                    onClick={handleCloseMenus}
                    component={Link}
                    to={{
                        pathname: `${url}/${data.schoolId}`,
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
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

// MenuOptions.propTypes = {
//     data: PropTypes.object.isRequired,
// }

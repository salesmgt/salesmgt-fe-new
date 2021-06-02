import React, { useState } from 'react'
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
} from '@material-ui/core'
import { Link, useRouteMatch } from 'react-router-dom'
import { MdMoreVert, MdInfo, MdDoNotDisturbOn } from 'react-icons/md'
import { useKPI } from '../../../hooks/KPIContext'
import { Consts } from '../../../KPIsConfig'
import { useAuth } from '../../../../../hooks/AuthContext'
// import PropTypes from 'prop-types'
import classes from './MenuOptions.module.scss'
import { roleNames } from '../../../../../constants/Generals'
import ConfirmDisable from '../../../dialogs/ConfirmDisable/ConfirmDisable'

function MenuOptions(props) {
    const { data, refreshAPI } = props
    const { menuItems } = Consts

    const { params } = useKPI()
    const { url } = useRouteMatch()
    const { user } = useAuth()

    const [anchorEl, setAnchorEl] = useState(null)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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

    const handleOpenConfirmation = () => {
        setAnchorEl(null)
        setOpenConfirmDialog(true)
    }

    const renderDisableDialog = () => {
        if (openConfirmDialog) {
            return (
                <ConfirmDisable
                    open={openConfirmDialog}
                    onClose={() => setOpenConfirmDialog(false)}
                    kpiGroupId={data?.id}
                    kpiGroupName={data?.groupName}
                    refreshAPI={refreshAPI}
                />
            )
        }
    }

    return (
        <div>
            <Tooltip title="Actions">
                <IconButton color="primary" onClick={handleOpen}>
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
                        pathname: `${url}/${data?.id}`,
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
                {user.roles[0] === roleNames.manager && (
                    <div>
                        <MenuItem onClick={handleOpenConfirmation}>
                            <ListItemIcon className={classes.itemIcon}>
                                <MdDoNotDisturbOn fontSize="large" />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText}>
                                Disable
                            </ListItemText>
                        </MenuItem>
                        {renderDisableDialog()}
                    </div>
                )}
            </Menu>
        </div>
    )
}

export default React.memo(MenuOptions)

// MenuOptions.propTypes = {
//     data: PropTypes.object.isRequired,
// }

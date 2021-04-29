import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    Typography,
    Popover,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Icon,
    Button,
    Avatar,
} from '@material-ui/core'
import { IconContext } from 'react-icons'
import * as Cookies from '../../../../utils/Cookies'
import { useAuth } from '../../../../hooks/AuthContext'
import { userMenuItems as items } from '../../AppLayoutsConfig'
import { cookieNames } from '../../../../constants/Generals'
import classes from './UserMenu.module.scss'

function UserMenu(props) {
    const { userInfo } = props
    const { user, setUser } = useAuth()

    const { url } = useRouteMatch()

    const [userMenu, setUserMenu] = useState(null)

    const userMenuClick = (event) => {
        setUserMenu(event.currentTarget)
    }

    const userMenuClose = () => {
        setUserMenu(null)
    }

    const handleLogout = () => {
        Cookies.setCookie(cookieNames.accessToken, '', 0)
        localStorage.clear()
        setUser()
    }

    return (
        <>
            <Button className={classes.user} onClick={userMenuClick}>
                <div className={classes.info}>
                    <Typography component="span" className={classes.name}>
                        {userInfo?.fullName}
                    </Typography>
                    <Typography className={classes.role}>
                        {userInfo?.roleName}
                    </Typography>
                </div>

                {userInfo?.avatar ? (
                    <Avatar
                        className={classes.avatar}
                        // alt="user avatar"
                        src={userInfo?.avatar}
                    />
                ) : (
                    <Avatar className={classes.avatar}>
                        {userInfo?.fullName.split(' ').pop()[0]}
                    </Avatar>
                )}
            </Button>

            <IconContext.Provider value={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                <Popover
                    open={Boolean(userMenu)}
                    anchorEl={userMenu}
                    onClose={userMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    classes={{
                        paper: 'py-8',
                    }}
                >
                    {items[0].map((item) => (
                        <MenuItem
                            component={Link}
                            to={`${url}/profiles/${user.username}`}
                            onClick={userMenuClose}
                            role="button"
                            key={item}
                        >
                            <ListItemIcon className={classes.menuIcon}>
                                <Icon>{item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </MenuItem>
                    ))}
                    {items[1].map((item) => (
                        <MenuItem onClick={handleLogout} key={item}>
                            <ListItemIcon className={classes.menuIcon}>
                                <Icon>{item.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </MenuItem>
                    ))}
                </Popover>
            </IconContext.Provider>
        </>
    )
}

export default React.memo(UserMenu)

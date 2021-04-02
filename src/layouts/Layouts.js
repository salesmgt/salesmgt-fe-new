import React, { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import {
    Route,
    Link,
    Redirect,
    Switch,
    useLocation,
    useRouteMatch,
} from 'react-router-dom'
import { IconContext } from 'react-icons'
import {
    MdMenu,
    MdNotifications,
    MdAccountCircle,
    MdChevronLeft,
} from 'react-icons/md'
import {
    AppBar,
    Toolbar,
    Drawer,
    Badge,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    withStyles,
    Typography,
} from '@material-ui/core'
import { Profiles } from '../pages'
import useToggle from '../hooks/useToggle'
import PrivateRoute from '../routes/PrivateRoute'
import classes from './Layouts.module.scss'
import { getMenuItems } from './LayoutsConfig'
import { useAuth } from '../hooks/AuthContext'

function Layout() {
    const { url } = useRouteMatch()
    const location = useLocation()

    const { user } = useAuth()
    const { roles } = user

    const menuItems = getMenuItems(roles[0])

    const [open, setOpen] = useToggle(
        window.matchMedia('(max-width: 960px)').matches ? false : true
    )

    const [selectedIndex, setSelectedIndex] = useState(
        location.pathname.split('/').pop()
    )

    const handleSelectedItem = (item) => {
        if (window.matchMedia('(max-width: 960px)').matches) {
            setOpen()
        }
        setSelectedIndex(item)
    }
    useEffect(() => setSelectedIndex(location.pathname.split('/').pop()), [
        location.pathname,
    ])

    const getTitle = React.useMemo(() => {
        let title = ''
        const path = location.pathname
        // const page = path.split('/').pop()
        const page = path.split('/')
        const strings = page[2].split('-')
        strings.forEach((string) => {
            title += string.charAt(0).toUpperCase() + string.slice(1) + ' '
        })
        return title
    }, [location.pathname])

    const StyledBadge = withStyles({
        badge: {
            backgroundColor: '#ffb74b',
        },
    })(Badge)

    //---------------------------------------Notifications---------------------------------------

    const notifData = 'notif-'.repeat(20).split('-')

    const ITEM_HEIGHT = 48
    const [notifAnchorEl, setNotifAnchorEl] = useState(null)
    const isNotifMenuOpen = Boolean(notifAnchorEl)

    const handleNotifMenuOpen = useCallback((event) => {
        setNotifAnchorEl(event.currentTarget)
    }, [])

    const handleNotifMenuClose = useCallback(() => {
        setNotifAnchorEl(null)
    }, [])

    const notifMenuId = 'notif-menu'
    const renderNotifMenu = (
        <Menu
            id={notifMenuId}
            anchorEl={notifAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'center', horizontal: 'right' }}
            keepMounted
            open={isNotifMenuOpen}
            onClose={handleNotifMenuClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                },
            }}
        >
            {notifData.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        onClick={handleNotifMenuClose}
                        className={classes.notif}
                    >
                        <span>{item}</span>
                    </MenuItem>
                )
            })}
        </Menu>
    )

    // React.useEffect(() => {
    //     console.log('has changed')
    // }, [notifAnchorEl])

    //----------------------------------------------------------------------------------------------

    return (
        <div className={classes.root}>
            {/* AppBar area */}
            <IconContext.Provider value={{ color: '#fff' }}>
                <AppBar
                    className={clsx(
                        classes.appBar,
                        open && classes.appBarShift
                    )}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            className={classes.menuBtn}
                            onClick={setOpen}
                        >
                            <MdMenu />
                        </IconButton>

                        <div className={classes.grow} />

                        <Typography
                            component="h1"
                            variant="h6"
                            noWrap
                            className={classes.title}
                        >
                            {getTitle}
                        </Typography>

                        {/* Remember to set badge content */}
                        <IconButton onClick={handleNotifMenuOpen}>
                            <StyledBadge badgeContent={17}>
                                <MdNotifications />
                            </StyledBadge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            component={Link}
                            to={`${url}/profiles/${user.username}`}
                        >
                            <MdAccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {renderNotifMenu}
            </IconContext.Provider>

            {/* Side menu area */}
            <IconContext.Provider value={{ color: '#fff' }}>
                <Drawer
                    variant={
                        window.matchMedia('(max-width: 960px)').matches
                            ? 'temporary'
                            : 'permanent'
                    }
                    anchor="left"
                    open={open}
                    onClose={setOpen}
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        ),
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <img className={classes.majorImg} alt="major-logos" />
                    </div>
                    <List component="nav">
                        {menuItems.map((item, index) => {
                            return (
                                <ListItem
                                    className={classes.menuItem}
                                    key={index}
                                    selected={item.path === selectedIndex}
                                    component={Link}
                                    to={`${url}/${item.path}`}
                                    onClick={() =>
                                        handleSelectedItem(item.path)
                                    }
                                >
                                    <ListItemIcon className={classes.menuIcon}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography
                                                className={classes.menuText}
                                            >
                                                {item.title}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                    <div className={classes.drawerFooter}>
                        <IconButton
                            onClick={setOpen}
                            className={classes.chevron}
                        >
                            <MdChevronLeft />
                        </IconButton>
                    </div>
                </Drawer>
            </IconContext.Provider>

            {/* Page load area */}
            <main
                className={clsx(classes.content, open && classes.contentShift)}
            >
                <div className={classes.appBarSpacer} />
                <div className={classes.container}>
                    <Switch>
                        {menuItems.map((item, index) => (
                            <Route
                                exact
                                path={`${url}/${item.path}`}
                                key={index}
                                component={item.component}
                            />
                            //     {/* {<item.component />}
                            //     {console.log(item.component)}
                            // </PrivateRoute> */}
                        ))}
                        <Route
                            path={`${url}/profiles/:username`}
                            component={Profiles}
                        />
                        <Redirect from="*" to="/errors" />
                    </Switch>
                </div>
            </main>
        </div>
    )
}

export default Layout

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom'
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
} from '@material-ui/core'
import PageTitle from './components/PageTitle'
import { Profiles, Errors } from '../pages'
import { getError } from '../pages/Errors'
import { useToggle } from '../hooks'
import classes from './Layout.module.scss'

function Layout(props) {
    const ERRORCODE = '404'

    const { menuItems, children } = props

    const [open, setOpen] = useToggle(
        window.matchMedia('(max-width: 960px)').matches ? false : true
    )

    const location = useLocation()

    const [selectedIndex, setSelectedIndex] = useState(location.pathname)

    const handleSelectedItem = (item) => {
        if (window.matchMedia('(max-width: 960px)').matches) {
            setOpen()
        }
        setSelectedIndex(item)
    }

    useEffect(() => setSelectedIndex(location.pathname), [location.pathname])

    const getTitle = useMemo(() => {
        let title = ''
        const path = location.pathname
        const page = path.split('/').pop()
        const strings = page.split('-')
        strings.forEach((string) => {
            title += string.charAt(0).toUpperCase() + string.slice(1) + ' '
        })
        return title
    }, [location.pathname])

    // React.useEffect(() => {
    //     console.log('has changed')
    // }, [selectedIndex])

    //----------------------------------------------------------------------------------------------
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

    //----------------------------------------------------------------------------------------------

    return (
        <div className={classes.root}>
            {/* Navbar area */}
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
                        <PageTitle className={classes.title}>
                            {getTitle}
                        </PageTitle>

                        {/* Remember to set badge content */}
                        <IconButton onClick={handleNotifMenuOpen}>
                            <Badge badgeContent={17} color="secondary">
                                <MdNotifications />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            component={Link}
                            to="/apps/profiles"
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
                    variant="permanent"
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !open && classes.drawerPaperClose
                        ),
                    }}
                    open={open}
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
                                    alignItems="flex-start"
                                    selected={
                                        // item.path === handleSelectedIndex()
                                        item.path === selectedIndex
                                    }
                                    component={Link}
                                    to={item.path}
                                    onClick={
                                        () => handleSelectedItem(item.path)

                                    }
                                >
                                    <ListItemIcon className={classes.menuIcon}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        className={classes.menuText}
                                        primary={item.title}
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
                            <Route exact path={item.path} key={index}>
                                {item.component}
                            </Route>
                        ))}
                        <Route path="/apps/profiles" component={Profiles} />
                        <Redirect from="*" to="/errors"/>
                        {/* <Route
                            path="*"
                            render={() => (
                                <Errors error={getError(ERRORCODE)} />
                            )}
                        /> */}
                    </Switch>
                    {/* {children} */}
                </div>
            </main>
        </div>
    )
}

export default Layout

Layout.prototype = {
    menuItems: PropTypes.array.isRequired,
}

import React, { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import {
    Route,
    Link,
    Redirect,
    Switch,
    useLocation,
    useRouteMatch,
    useHistory,
} from 'react-router-dom'
import {app} from '../../services/firebase'
import { IconContext } from 'react-icons'
import { MdMenu, MdNotifications, MdChevronLeft } from 'react-icons/md'
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
    withStyles,
    Typography,
} from '@material-ui/core'
import useToggle from '../../hooks/useToggle'
import { getMenuItems } from './AppLayoutsConfig'
import { Profiles } from '../../pages'
import { useAuth } from '../../hooks/AuthContext'
import { defaultRoutes, roleRoutes } from '../../routes/routes'
import * as UserServices from '../../services/UserServices'
import { UserMenu } from './components'
import Notify from '../AppLayouts/components/Notify/Notify'
import AccountProvider from '../../pages/Accounts/hooks/AccountContext'
import ReportProvider from '../../pages/Reports/hooks/ReportContext'
import SchoolProvider from '../../pages/Schools/hooks/SchoolContext'
import TargetSchoolProvider from '../../pages/TargetSchools/hooks/TargetSchoolContext'
import classes from './AppLayouts.module.scss'

function AppLayouts() {
    const { url } = useRouteMatch()
    const location = useLocation()
    const history = useHistory()
    const [todoList,setTodoList] = React.useState([])
    const { user } = useAuth()
    const menuItems = getMenuItems(user.roles[0])
    const [limit, setLimit] = React.useState('')
    const [userInfo, setUserInfo] = useState(null)
    const [badge,setBadge] = useState(0)
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

    const sort = (a, b) => {
        var nameA = a.timestamp
        var nameB = b.timestamp
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      }
      useEffect(()=>{
        setBadge(todoList?.filter(item => item.isSeen == false).length)
      },[todoList])

       useEffect(()=>{
        const promise = new Promise((resolve, reject) => {
            const todoRef = app.database().ref("notify").child('Gia').orderByChild('timestamp').limitToLast(6)
            todoRef.on("value",(snapshot)=>{
                const todos = snapshot.val()
                const todoList = []
                for (const id in todos){
                    todoList.push({id,...todos[id]})
                }
                todoList.sort(sort)
                setTodoList(todoList)
                setLimit(todoList[todoList.length-1]?.timestamp)
            }) 
           }).catch((e) => {
            alert(e);
            
        })},[])
            
        const next = (e) =>{
            const promise = new Promise((resolve, reject) => {
              const todoRef = app.database().ref("notify").child('Gia').orderByChild('timestamp').endBefore(limit).limitToLast(5)
              todoRef.on("value",(snapshot)=>{
                  const todos = snapshot.val()
                  const todoss = []
                  for (const id in todos){
                      todoss.push({id,...todos[id]})
                  }
                  todoss.sort(function(a, b) {
                      var nameA = a.timestamp
                      var nameB = b.timestamp
                      if (nameA > nameB) {
                        return -1;
                      }
                      if (nameA < nameB) {
                        return 1;
                      }
                      return 0;
                    });
                  setTodoList(todoList.concat(todoss))
                  setLimit(todoss[todoss.length-1]?.timestamp)
                  console.log(limit)
              })
             }).catch((e) => {
              alert(e);
              
          })}
    const getTitle = React.useMemo(() => {
        let title = ''
        const path = location.pathname
        // const page = path.split('/').pop()
        const page = path.split('/')
        if (page.length > 2) {
            const strings = page[2].split('-')
            strings.forEach((string) => {
                title += string.charAt(0).toUpperCase() + string.slice(1) + ' '
            })
        }
        return title
    }, [location.pathname])

    const StyledBadge = withStyles({
        badge: {
            backgroundColor: '#ffb74b',
        },
    })(Badge)
    const onUpdate = (e,item) => {
        console.log(item)
        // new Promise((resolve, reject) => {
            app.database().ref(`notify/${user.username}`).child(item.id).update({
           isSeen: true
       })
}
        
        // }).catch((error)=>{
          
        // })}
    //---------------------------------------Notifications---------------------------------------
    const [notifAnchorEl, setNotifAnchorEl] = React.useState(null)
    const handleNotifMenuOpen = React.useCallback((event) => {
        setNotifAnchorEl(event.currentTarget)

    }, [])
//---------------------------------------
    const renderNotifMenu = (
        <Notify onUpdate = {onUpdate} todoList={todoList} limit={limit} next = {next} setNotifAnchorEl={setNotifAnchorEl} notifAnchorEl={notifAnchorEl}/>
        )
    //----------------------------------------------------------------------------------------------

    useEffect(() => {
        UserServices.getProfile(user.username)
            .then((data) => {
                setUserInfo(data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }, [])

    if (!userInfo) {
        return null
    }

    return (
        <div className={classes.root}>
            {/* AppBar area */}
            <IconContext.Provider value={{ color: 'rgba(0, 0, 0, 0.54)' }}>
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

                        <Typography variant="h5" className={classes.title}>
                            {getTitle}
                        </Typography>

                        {/* Remember to set badge content */}
                        <IconButton onClick={handleNotifMenuOpen}>
                            <StyledBadge badgeContent={badge} max={5}>
                                <MdNotifications />
                            </StyledBadge>
                        </IconButton>

                        {/* <IconButton
                            edge="end"
                            component={Link}
                            to={`${url}/profiles/${user.username}`}
                        >
                            <MdAccountCircle />
                        </IconButton> */}
                        <AccountProvider>
                            <ReportProvider>
                                <SchoolProvider>
                                    <TargetSchoolProvider>
                                        <UserMenu userInfo={userInfo} />
                                    </TargetSchoolProvider>
                                </SchoolProvider>
                            </ReportProvider>
                        </AccountProvider>
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
                        <img
                            className={classes.majorImg}
                            alt="major-logo"
                            onClick={() => {
                                history.push(defaultRoutes[user.roles[0]].route)
                            }}
                        />
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
                                                variant="h6"
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
                        {roleRoutes[user.roles[0]].map((route, index) => (
                            <Route
                                exact
                                path={`${url}/${route.path}`}
                                key={index}
                                component={route.component}
                            />
                        ))}
                        <Route
                            path={`${url}/profiles/:id`}
                            // path={`${url}/profiles/${user.username}`}
                            component={Profiles}
                        />
                        <Redirect from="*" to="/errors" />
                    </Switch>
                </div>
            </main>
        </div>
    )
}

export default AppLayouts

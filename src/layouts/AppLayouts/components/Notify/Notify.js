import React, { useState, useCallback } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
    Menu,
    MenuItem,
    Card,
    Typography,
    CardContent,
    CardHeader,
    Avatar,
} from '@material-ui/core'
import { Consts } from './NotifyConfig'
import classes from './Notify.module.scss'

function Notify(props) {
    const { notiList, limit, next, onUpdate } = props
    const isNotifMenuOpen = Boolean(props.notifAnchorEl)

    const { url } = useRouteMatch()

    // console.log('notiList: ', notiList)
    // console.log('notify url: ', url)

    const handleNotifMenuClose = useCallback(() => {
        props.setNotifAnchorEl(null)
    }, [])

    const [notiState, setNotiState] = useState({})
    const handleNotiClicked = (e, noti) => {
        switch (noti.type) {
            case 'Welcome':
                onUpdate(e, noti)
                break
            case 'report':
                onUpdate(e, noti)
                // Set state ở đây làm chậm 1 thao tác
                setNotiState({
                    pathname: `${url}/reports/${noti?.uid}`,
                    state: { id: noti?.uid },
                })
                break
            case 'service':
                onUpdate(e, noti)
                setNotiState({
                    pathname: `${url}/tasks/${noti?.uid}`,
                    state: { taskId: noti?.uid },
                })
                break
            default:
                break
        }
    }

    return (
        <Menu
            anchorEl={props.notifAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'center', horizontal: 'right' }}
            keepMounted
            open={isNotifMenuOpen}
            onClose={handleNotifMenuClose}
            PaperProps={{
                style: {
                    maxHeight: '50ch',
                    maxWidth: '45ch',
                },
            }}
        >
            {notiList?.length < 1 && (
                <MenuItem>
                    <span>{Consts.noNotif}</span>
                </MenuItem>
            )}

            {notiList?.map((item, index) => (
                <MenuItem
                    key={index}
                    onClick={(e) => handleNotiClicked(e, item)}
                    className={classes.notiItem}
                    component={Link}
                    to={notiState}
                >
                    <Card
                        className={classes.notiCard}
                        style={
                            item.type !== 'Welcome'
                                ? item.type === 'report'
                                    ? {
                                        borderLeft:
                                            '5px solid rgba(255, 99, 132, 1)',
                                    }
                                    : {
                                        borderLeft:
                                            '5px solid rgba(54, 162, 235, 1)',
                                    }
                                : {
                                    borderLeft:
                                        '5px solid rgba(255, 206, 86, 1)',
                                }
                        }
                    >
                        <CardHeader
                            avatar={<Avatar src={item.avatar} />}
                            title={`${item.actor} (${item.type})`}
                            subheader={item.timestamp}
                        />
                        <CardContent className={classes.notiContent}>
                            <Typography
                                className={
                                    item?.isSeen
                                        ? classes.typo
                                        : classes.notSeenTypo
                                }
                                variant="body2"
                                color="textSecondary"
                                noWrap
                            >
                                {item?.content}
                            </Typography>
                        </CardContent>
                    </Card>
                    {/* <span className={classes.content}>{item.content}</span> */}
                </MenuItem>
            ))}

            {limit && notiList?.length > 5 && (
                <MenuItem onClick={next}>
                    <span>{Consts.more}</span>
                </MenuItem>
            )}
        </Menu>
    )
}

export default Notify

import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Avatar,
    Button,
    Chip,
    Icon,
    makeStyles,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core'
import { MdArrowBack } from 'react-icons/md'
import { Animation } from '../../components'
import { useAuth } from '../../hooks/AuthContext'
import { defaultRoutes } from '../../routes/routes'
import { statusNames, statusAcct } from '../../constants/Generals'
import classes from './DetailLayouts.module.scss'

const useStyles = makeStyles((theme) => ({
    root: { color: 'rgba(0, 0, 0, 0.87)' },
    indicator: { backgroundColor: '#2a4865' },
    textColorInherit: {
        opacity: 1,
        '&$disabled': { opacity: 1 },
    },
    disabled: { opacity: 1 },
}))

function DetailLayouts(props) {
    const {
        linkBack,
        avatar,
        checkAvatar,
        header,
        subHeader,
        isStatus,
        tabs,
        tabValue,
        handleChangeTab,
        children,
    } = props

    const { user } = useAuth()

    const styles = useStyles()

    const history = useHistory()

    const getChipsByStatus = (status) => {
        switch (status) {
            case statusNames.lead:
                return (
                    <Chip
                        label={status}
                        style={{
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                            color: '#fff',
                            width: 'fit-content',
                        }}
                    />
                )
            case statusNames.customer:
                return (
                    <Chip
                        label={status}
                        style={{
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                            color: '#fff',
                            width: 'fit-content',
                        }}
                    />
                )
            case statusNames.pending:
                return (
                    <Chip
                        label={status}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.38)',
                            color: '#fff',
                            width: 'fit-content',
                        }}
                    />
                )
            case statusAcct.active:
                return (
                    <Chip
                        label={status}
                        style={{
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            width: 'fit-content',
                        }}
                    />
                )
            case statusAcct.inactive:
                return (
                    <Chip
                        label={status}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.38)',
                            color: '#fff',
                            width: 'fit-content',
                        }}
                    />
                )
            default:
                break
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.topBg} />
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Animation
                            animation="transition.slideRightIn"
                            delay={300}
                        >
                            <Typography
                                className={classes.nav}
                                component={Button}
                                onClick={() => {
                                    if (history.location.state) {
                                        history.goBack()
                                    } else {
                                        history.push(
                                            defaultRoutes[user.roles[0]].route
                                        )
                                    }
                                }}
                            >
                                <Icon className={classes.icon}>
                                    <MdArrowBack />
                                </Icon>
                                <span className={classes.text}>{linkBack}</span>
                            </Typography>
                        </Animation>
                        <div className={classes.headerInfo}>
                            {avatar &&
                                (checkAvatar ? (
                                    <Animation
                                        animation="transition.expandIn"
                                        delay={300}
                                    >
                                        <Avatar
                                            src={avatar}
                                            alt="avatar"
                                            className={classes.infoAvatar}
                                        />
                                    </Animation>
                                ) : (
                                    <Animation
                                        animation="transition.expandIn"
                                        delay={300}
                                    >
                                        <Avatar className={classes.infoAvatar}>
                                            <Typography
                                                className={classes.avatarTxt}
                                            >
                                                {avatar}
                                            </Typography>
                                        </Avatar>
                                    </Animation>
                                ))}
                            <div className={classes.infoBasic}>
                                <Animation
                                    animation="transition.slideLeftIn"
                                    delay={300}
                                >
                                    <Typography
                                        // variant="h5"
                                        className={classes.basicMain}
                                    >
                                        {header}
                                    </Typography>
                                </Animation>

                                {isStatus ? (
                                    <Animation
                                        animation="transition.slideLeftIn"
                                        delay={300}
                                    >
                                        <>{getChipsByStatus(subHeader)}</>
                                    </Animation>
                                ) : (
                                    <Animation
                                        animation="transition.slideLeftIn"
                                        delay={300}
                                    >
                                        <Typography
                                            className={classes.basicSub}
                                        >
                                            {subHeader}
                                        </Typography>
                                    </Animation>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={classes.body}>
                        {tabs.length >= 2 ? (
                            <div>
                                <Tabs
                                    value={tabValue}
                                    onChange={(event, value) =>
                                        handleChangeTab(event, value)
                                    }
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    classes={{
                                        root: styles.root,
                                        indicator: styles.indicator,
                                    }}
                                >
                                    {tabs.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            label={tab}
                                            classes={{
                                                textColorInherit:
                                                    styles.textColorInherit,
                                                disabled: styles.disabled,
                                            }}
                                        />
                                    ))}
                                </Tabs>
                            </div>
                        ) : (
                            <div className={classes.toolbar}>
                                {tabs.map((tab, index) => (
                                    <Typography
                                        className={classes.toolbarTitle}
                                        key={index}
                                    >
                                        {tab}
                                    </Typography>
                                ))}
                            </div>
                        )}

                        <div className={classes.wrapper}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DetailLayouts)

DetailLayouts.defaultProps = {
    tabValue: 0,
    handleChangeTab: () => {},
    isStatus: false,
}

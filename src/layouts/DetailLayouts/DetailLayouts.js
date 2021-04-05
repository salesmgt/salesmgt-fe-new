import React from 'react'
import {
    Avatar,
    Chip,
    makeStyles,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core'
import { Animation } from '../../components'
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
        avatar,
        header,
        subHeader,
        isStatus,
        tabs,
        tabValue,
        handleChangeTab,
        children,
    } = props

    const styles = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.topBg} />
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.headerInfo}>
                            {avatar && (
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
                            )}
                            <div className={classes.infoBasic}>
                                <Animation
                                    animation="transition.slideLeftIn"
                                    delay={300}
                                >
                                    <Typography
                                        variant="h4"
                                        className={classes.basicMain}
                                    >
                                        {header}
                                    </Typography>
                                </Animation>
                                {subHeader && (
                                    <>
                                        {isStatus ? (
                                            <Animation
                                                animation="transition.slideLeftIn"
                                                delay={300}
                                            >
                                                <Chip
                                                    label={
                                                        subHeader
                                                            ? 'Active'
                                                            : 'Inactive'
                                                    }
                                                    className={
                                                        subHeader
                                                            ? classes.activeSub
                                                            : classes.deActiveSub
                                                    }
                                                />
                                            </Animation>
                                        ) : (
                                            <Animation
                                                animation="transition.slideLeftIn"
                                                delay={300}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    className={classes.basicSub}
                                                >
                                                    {subHeader}
                                                </Typography>
                                            </Animation>
                                        )}
                                    </>
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
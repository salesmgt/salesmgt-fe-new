import React from 'react'
import { makeStyles, Tab, Tabs, Typography } from '@material-ui/core'
import classes from './DetailLayouts.module.scss'

const useStyles = makeStyles((theme) => ({
    root: { color: 'rgba(0, 0, 0, 0.87)' },
    indicator: { backgroundColor: '#2a4865' },
}))

function DetailLayouts(props) {
    const { header, tabs, tabValue, handleChangeTab, children } = props

    const styles = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.topBg} />
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Typography variant="h4">{header}</Typography>
                    </div>
                    <div className={classes.body}>
                        <div className={classes.tabContainer}>
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
                                {tabs.map((tab) => (
                                    <Tab key={tab} label={tab} />
                                ))}
                            </Tabs>
                        </div>
                        <div className={classes.wrapper}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DetailLayouts)

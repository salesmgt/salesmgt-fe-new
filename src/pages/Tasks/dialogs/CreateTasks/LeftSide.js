import React, { useState, useEffect } from 'react'
import {
    Grid,
    makeStyles,
} from '@material-ui/core'
// import { MdFavorite } from 'react-icons/md'
import { columns } from './CreateTasksConfig'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useApp } from '../../../../hooks/AppContext'
import { useTaskForm } from './TaskFormContext'
import { STATUS_FILTER } from '../../../../constants/Filters'
import { FILTER_SCHOOL_STATUS } from '../../../../constants/ActionTypes'
import Filters from './Filters'
import Tables from './Tables'
import CreateDialogReview from './CreateDialogPreview'
import classes from './LeftSide.module.scss'

const useStyles = makeStyles((theme) => ({
    // root: { color: 'rgba(0, 0, 0, 0.87)' },
    indicator: { backgroundColor: '#2a4865' },
    // textColorInherit: {
    //     opacity: 1,
    //     '&$disabled': { opacity: 1 },
    // },
    // disabled: { opacity: 1 },
}))

function LeftSide(props) {
    const styles = useStyles()
    const { data, refreshAPI, schoolYear } = props
    // const { headers, operations } = Consts
    const { schStatus } = useApp()
    const [open, setOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [tabIndex, setTabIndex] = useState(0)
    const [tabLabel, setTabLabel] = useState(schStatus[0])

    const { params, dispatchParams, setFilter } = useTaskForm()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const onClose = () => setOpen(false)

    const handleTabChange = (e, newTabIndex) => {
        setSelectedRows([])
        const selectedStatus = schStatus[newTabIndex]
        setTabIndex(newTabIndex ? newTabIndex : 0);
        setTabLabel(selectedStatus ? selectedStatus : schStatus[0])
        setFilter(STATUS_FILTER, selectedStatus ? selectedStatus : schStatus[0])
        dispatchParams({
            type: FILTER_SCHOOL_STATUS,
            payload: {
                filterType: STATUS_FILTER,
                filterValue: selectedStatus ? selectedStatus : schStatus[0],
            },
        })
    }

    useEffect(() => {
        refreshAPI(schoolYear, page, limit, column, direction, searchKey, listFilters)
    }, [tabIndex])

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.body}>
                        <Tabs
                            className={classes.tabs}
                            value={tabIndex}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{
                                root: styles.root,
                                indicator: styles.indicator,
                            }}
                        >
                            <Tab
                                label={schStatus[0]}
                                classes={{
                                    textColorInherit:
                                        styles.textColorInherit,
                                    disabled: styles.disabled,
                                }}
                            />
                            <Tab
                                label={schStatus[1]}
                                classes={{
                                    textColorInherit:
                                        styles.textColorInherit,
                                    disabled: styles.disabled,
                                }}
                            />
                        </Tabs>

                        <div className={classes.wrapper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Filters rows={selectedRows} setOpen={setOpen} className={classes.filter} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Tables
                                        className={classes.table}
                                        columns={columns}
                                        rows={data?.list}
                                        totalRecord={data?.totalElements}
                                        totalPage={data?.totalPage}
                                        selectedRows={selectedRows}
                                        setSelectedRows={setSelectedRows}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <CreateDialogReview
                open={open}
                onClose={onClose}
                rows={selectedRows}
                setRows={setSelectedRows}
                schoolStatus={tabLabel}
                refreshAPI={refreshAPI}
            />
        </div>
    )
}

export default React.memo(LeftSide)
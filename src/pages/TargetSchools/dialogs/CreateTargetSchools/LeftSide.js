import React, { useState } from 'react'
import {
    Grid,
    makeStyles,
    Paper
} from '@material-ui/core'
import { MdFavorite } from 'react-icons/md'
import { columns } from './CreateTargetSchoolsConfig'
import Filters from './Filters'
import Tables from './Tables'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Consts } from '../DialogConfig'
import { useApp } from '../../../../hooks/AppContext'
// import { useTargetForm } from './TargetFormContext'
// import { statusNames } from '../../../../constants/Generals'
import classes from './LeftSide.module.scss'
import CreateDialogReview from './CreateDialogPreview'

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
    const { data, setData } = props
    // const { headers, operations } = Consts
    const { schStatus } = useApp()
    const [open,setOpen] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [tabIndex, setTabIndex] = useState(0)
    // const [tabLabel, setTabLabel] = useState(schStatus[0])

    const handleTabChange = (e, newTabIndex) => {
        setTabIndex(newTabIndex);
    }
    const onClose = () => setOpen(false)

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
                                icon={<MdFavorite />} 
                                classes={{
                                    textColorInherit:
                                        styles.textColorInherit,
                                    disabled: styles.disabled,
                                }} 
                            />
                            <Tab
                                label={schStatus[1]}
                                icon={<MdFavorite />} 
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
                                    <Filters setOpen={setOpen} className={classes.filter} />
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
            <CreateDialogReview open={open} setRows={setSelectedRows} rows={selectedRows} onClose={onClose} />
        </div>
    )
}

export default LeftSide
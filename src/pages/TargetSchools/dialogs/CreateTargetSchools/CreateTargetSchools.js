import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
    Grid
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { useHistory } from "react-router"
import { useTargetForm } from './TargetFormContext'
import { columns } from './CreateTargetSchoolsConfig'
import { getSchoolsForTargets } from '../../TargetSchoolsServices'
import Filters from './Filters'
import Tables from './Tables'
import { Loading } from '../../../../components'
import { Consts } from '../DialogConfig'
import classes from './CreateTargetSchools.module.scss'

const stylesTitle = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
})

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
})

function CreateTargetSchools(props) {
    const { open, onClose } = props
    const { headers, operations } = Consts
    const history = useHistory()
    const { params } = useTargetForm()
    const { listFilters, page, limit, column, direction, searchKey } = params

    const [data, setData] = useState(null)

    const calculateSchoolYear = () => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();

        if (thisMonth < 7)
            return `${thisYear - 1}-${thisYear}`;
        else return `${thisYear}-${thisYear + 1}`
    }
    const schoolYear = calculateSchoolYear()

    let isMounted = true
    const getListSchools = (schoolYear,page = 0, limit = 10, column = 'id',direction = 'asc',searchKey,listFilters) => {
        getSchoolsForTargets(schoolYear,page,limit,column,direction,searchKey,listFilters)
            .then((res) => {
                if (isMounted) {
                    // console.log('CreateTarget form - data: ', res);
                    setData(res.data)
                }
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
    }

    useEffect(() => {
        getListSchools(schoolYear,page, limit, column, direction, searchKey, listFilters)
        return () => {
            isMounted = false
        }
    }, [params])

    // if (!data) {
    //     return <Loading />
    // }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            component="form"
            className={classes.dialog}
        >
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.create}
            </DialogTitleWithIconClose>

            <DialogContent className={classes.wrapper}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Filters className={classes.filter} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {/* <Tables
                            className={classes.table}
                            columns={columns}
                            rows={data.list}
                            totalRecord={data.totalElements}
                            totalPage={data.totalPage}
                        /> */}
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions className="">
                <Button onClick={() => {}} className={classes.btnSave}>
                    {operations.save}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateTargetSchools

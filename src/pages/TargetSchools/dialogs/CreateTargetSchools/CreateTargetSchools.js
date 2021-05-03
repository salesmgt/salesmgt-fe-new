import React, { useState, useEffect } from 'react'
import {
    Dialog,
    IconButton,
    Typography,
} from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import { MdClose } from 'react-icons/md'
import { useHistory } from 'react-router'
import { useTargetForm } from './TargetFormContext'
import { getSchoolsForTargets } from '../../TargetSchoolsServices'
// import { Loading } from '../../../../components'
import AppBar from '@material-ui/core/AppBar';
import { Consts } from '../DialogConfig'
import { makeStyles } from '@material-ui/core/styles';
import LeftSide from './LeftSide';
import { useTargetSchool } from '../../hooks/TargetSchoolContext'
import classes from './CreateTargetSchools.module.scss'

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function CreateTargetSchools(props) {
    const { open, onClose, refreshTargetPage } = props
    const { headers } = Consts
    const history = useHistory()

    const { params: formParams } = useTargetForm()
    // const { listFilters, page, limit, column, direction, searchKey } = formParams
    
    const { params: pageParams } = useTargetSchool()
    // const { listFilters, page, limit, column, direction, searchKey } = pageParams
    
    const classes = useStyles();
    const [data, setData] = useState(null)
    
    const calculateSchoolYear = () => {
        const thisYear = new Date().getFullYear()
        const thisMonth = new Date().getMonth()
        
        if (0 <= thisMonth < 4) {   // Jan = 0, May = 4
            return `${thisYear}-${thisYear + 1}`
        } else if (4 <= thisMonth < 11) {
            return `${thisYear - 1}-${thisYear}`
        } else {
            return null
        }
    }
    const schoolYear = calculateSchoolYear()
    // console.log('schoolYear ne: ', schoolYear);

    let isMounted = true
    const getListSchools = (schoolYear = calculateSchoolYear(), page = 0, limit = 10, column = 'id',direction = 'asc',searchKey,listFilters) => {
        getSchoolsForTargets(schoolYear,page,limit,column,direction,searchKey,listFilters)
            .then((res) => {
                if (isMounted) {
                    setData(res)
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
        getListSchools(schoolYear, formParams.page, formParams.limit, formParams.column, formParams.direction, formParams.searchKey, formParams.listFilters)
        return () => {
            isMounted = false
            // setData(null)
        }
    }, [formParams])

    // if (!data) {
    //     return <Loading />
    // }

    const handleCloseCreateDialog = () => {
        refreshTargetPage(pageParams.page, pageParams.limit, pageParams.column, pageParams.direction, pageParams.searchKey, pageParams.listFilters)
        onClose();
    }

    return (
        <Dialog fullScreen open={open}
            onClose={handleCloseCreateDialog}
            TransitionComponent={Transition}
            PaperProps={{
                style: {
                backgroundColor: "#eeeeee",
                }}}
        >
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleCloseCreateDialog} aria-label="close">
                <MdClose/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {headers.create}
                </Typography>
            </Toolbar>
            </AppBar>
            
            <div className={classes.body}>
                <LeftSide data={data} setData={setData} refreshAPI={getListSchools} schoolYear={schoolYear} />
                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                    <RightSide status={schStatus} />
                </Grid> */}              
            </div>
        </Dialog>
    )
}

export default CreateTargetSchools

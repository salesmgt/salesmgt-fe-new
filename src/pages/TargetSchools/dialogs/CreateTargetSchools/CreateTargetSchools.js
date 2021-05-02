import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    IconButton,
    Typography,
    Grid
} from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import { MdClose } from 'react-icons/md'
import { useHistory } from "react-router"
import { useTargetForm } from './TargetFormContext'
import { getSchoolsForTargets } from '../../TargetSchoolsServices'
// import { Loading } from '../../../../components'
import AppBar from '@material-ui/core/AppBar';
import { Consts } from '../DialogConfig'
import { makeStyles } from '@material-ui/core/styles';
import LeftSide from './LeftSide';
import classes from './CreateTargetSchools.module.scss'
import RightSide from './RightSide';

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
    const { open, onClose } = props
   const { headers, operations } = Consts
    const history = useHistory()
    const { params } = useTargetForm()
    const { listFilters, page, limit, column, direction, searchKey } = params
    const classes = useStyles();
    const [data, setData] = useState(null)
    const [schStatus, setSchStatus] = useState('')

    let isMounted = true
    const getListSchools = (page = 0, limit = 10, column = 'id',direction = 'asc',searchKey,listFilters) => {
        getSchoolsForTargets(page,limit,column,direction,searchKey,listFilters)
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
        getListSchools(page, limit, column, direction, searchKey, listFilters)
        return () => {
            isMounted = false
        }
    }, [params])

    // if (!data) {
    //     return <Loading />
    // }

    return (
        <Dialog fullScreen open={open}
         onClose={onClose}
         TransitionComponent={Transition}
         PaperProps={{
            style: {
            backgroundColor: "#eeeeee",
            }}}
         >
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                <MdClose/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {headers.create}
                </Typography>
            </Toolbar>
            </AppBar>
            
            <div className={classes.body}>
                
                        <LeftSide data={data} setData={setData} />
                   
                    {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                       <RightSide status={schStatus} />
                    </Grid> */}
              
            </div>
        </Dialog>
    )
}

export default CreateTargetSchools

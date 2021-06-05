import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    withStyles,
    Typography,
    IconButton,
} from '@material-ui/core'
import { MdClose } from 'react-icons/md'
import { Consts, confirmMessage } from '../DialogConfig'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'
import { parseDateToString } from '../../../../utils/DateTimes'
import { createKPIGroup } from '../../KPIsServices';
import { useKPI } from '../../hooks/KPIContext';
import { useAuth } from '../../../../hooks/AuthContext';
import classes from './ConfirmSave.module.scss'

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
});

const DialogTitleWithIconClose = withStyles(stylesTitle)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <MdClose />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

function ConfirmApprove(props) {
    const { open, onClose, onCloseCreateDialog, KPI, refreshPage } = props
    const { headers, operations } = Consts
    let kpiData = null
    console.log('open rồi nè');

    const history = useHistory()
    const { user } = useAuth()
    const { params } = useKPI()
    const { listFilters, column, direction, searchKey } = params
    const { enqueueSnackbar } = useSnackbar()

    const constructKPIObject = () => {
        console.log('Confirm Dialog ------ KPI: ', KPI);
        let myKPIs = []
        let aKPI = {
            kpiDetails: [],
            username: ''
        }
        let myKPIDetails = []
        let aKpiDetail = {
            criteriaId: 0,
            kpiDetailId: -1,
            actualValue: 0,
            targetValue: 0,
            weight: 0,
        }

        // KPI?.users.forEach(staff => {
        //     aKPI = { ...aKPI, username: staff.username }
        //     myKPIs.push(aKPI)
        // });

        KPI?.kpis.forEach(kpi => {
            myKPIDetails = []
            let listCri = [...kpi?.criteria]
            listCri.forEach(cri => {
                aKpiDetail = {
                    ...aKpiDetail,
                    criteriaId: cri?.id,
                    targetValue: parseInt(cri?.targetValue),
                    weight: parseFloat(cri?.weight / 100)
                }
                myKPIDetails.push(aKpiDetail)
            });

            aKPI = {
                username: kpi?.username,
                kpiDetails: myKPIDetails
            }
            myKPIs.push(aKPI)
        });

        console.log('Sau khi xử lý data: myKPIs = ', myKPIs);

        kpiData = {
            groupName: KPI?.groupName,
            startDate: parseDateToString(KPI?.startDate, 'YYYY-MM-DD HH:mm:ss'),
            endDate: parseDateToString(KPI?.endDate, 'YYYY-MM-DD HH:mm:ss'),
            kpis: myKPIs
        }

        console.log('  >> TADAAA<<  ------Finally, we have: kpiData = ', kpiData);
    }

    const handleCreateKPI = () => {
        constructKPIObject()

        createKPIGroup(kpiData).then((res) => {
            refreshPage(column, direction, searchKey, listFilters, user.username)
            enqueueSnackbar("Created KPI group successfully", { variant: 'success' })
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
                enqueueSnackbar("Created KPI group failed", { variant: 'error' })
            }
        })

        onClose();
        onCloseCreateDialog()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitleWithIconClose onClose={onClose}>{headers.confirm}</DialogTitleWithIconClose>
            {/* <Divider /> */}
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {confirmMessage(KPI?.groupName)}
                </DialogContentText>
            </DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button className={classes.btnOK} onClick={handleCreateKPI} autoFocus>
                    {operations.yes}
                </Button>
                <Button onClick={onClose}>
                    {operations.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmApprove)
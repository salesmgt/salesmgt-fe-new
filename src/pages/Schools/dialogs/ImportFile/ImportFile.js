import React, { useState } from 'react'
import {
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
    withStyles,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    Link,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { MdClose } from 'react-icons/md'
import { FaFileImport } from 'react-icons/fa'
import { Consts } from '../DialogConfig'
import * as XLSX from 'xlsx'
import { storage } from '../../../../services/firebase'
import { Snackbars } from '../../../../components'
import * as SchoolsServices from '../../SchoolsServices'
import { useSchool } from '../../hooks/SchoolContext'
// import { PHONE_RGX } from '../../../../utils/Regex'
import classes from './ImportFile.module.scss'

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

function ImportFile(props) {
    const [data, setData] = useState([])
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const { open, onClose, refreshAPI } = props
    const {
        headers,
        excel,
        contentText1,
        contentText2,
        fileFormat,
        linkText,
        contentLink,
        alertType,
        refFile,
        alertText,
    } = Consts
    const { params } = useSchool()
    const { listFilters, page, limit, column, direction, searchKey } = params
    const [fileName, setFileName] = React.useState('')
    const [text, setText] = React.useState(0)
    const [link, setLink] = React.useState('')
    const [isDisableButton, setIsDisableButton] = React.useState(true)
    const handleClose = () => {
        setFileName('')
        setText(0)
        setIsDisableButton(true)
        onClose(false)
    }

    React.useEffect(() => {
        return new Promise((resolve, reject) => {
            storage
                .ref(refFile)
                .getDownloadURL()
                .then((url) => {
                    setLink(url)
                })
        })
    }, [])

    const handleUploadFile = (event) => {
        const filePath = event.target.files[0]

        setFileName(filePath?.name)
        if (!filePath?.name.match(/\.(xlsx|xls|csv|xml|xslx)$/)) {
            setNotify({
                isOpen: true,
                message: 'Error file type',
                type: 'warning',
            })
            event.target.value = ''
            setFileName('')
            setText(0)
            return false
        } else {
            if (filePath?.size > 1572864) {
                setNotify({
                    isOpen: true,
                    message:
                        'Error file too large, only accept file less than 1.5Mb ',
                    type: 'warning',
                })
                event.target.value = ''
                setFileName('')
                setText(0)
                return false
            }
            const promise = new Promise((resolve, reject) => {
                const fileReader = new FileReader()
                fileReader.readAsArrayBuffer(filePath)
                fileReader.onload = (e) => {
                    const bufferArray = e.target.result
                    const wb = XLSX.read(bufferArray, { type: 'buffer' })
                    const wsname = wb.SheetNames[0]
                    const ws = wb.Sheets[wsname]
                    const data = XLSX.utils.sheet_to_json(ws)
                    resolve(data)
                }
                fileReader.onerror = (error) => {
                    reject(error)
                }
            })
            promise.then((e) => {
                const array = []
                e.forEach((item) => {
                    if (
                        !item[excel.name] ||
                        !item[excel.address] ||
                        !item[excel.educationalLevel] ||
                        // !item[excel.scale] ||
                        !item[excel.type] ||
                        !item[excel.district] //||
                        // !item[excel.phone] ||
                        // !String(item[excel.phone]).match(PHONE_RGX)
                    ) {
                        setNotify({
                            isOpen: true,
                            message: 'Information is invalid',
                            type: 'warning',
                        })
                        event.target.value = ''
                        setFileName('')
                        setText(0)
                        return false
                    }
                    array.push({
                        name: item[excel.name],
                        educationalLevel: item[excel.educationalLevel],
                        phone: item[excel.phone],
                        district: item[excel.district],
                        address: item[excel.address],
                        reprName: item[excel.reprName],
                        reprIsMale:
                            "Nam" === excel.isMaleValue
                                ? true
                                : false,
                        reprPhone: item[excel.reprPhone],
                        reprEmail: item[excel.reprEmail],
                        type: item[excel.type],
                        // scale: item[excel.scale],
                    })
                })
                console.log(array)
                setText(array.length)
                if (array.length < 1) setIsDisableButton(true)
                else {
                    setIsDisableButton(false)
                    setData(array)
                }
            })
        }
    }

    const handleSubmit = (e) => {
        SchoolsServices.importSchool(data)
            .then((res) => {
                refreshAPI(page, limit, column, direction, searchKey, listFilters)
                setNotify({
                    isOpen: true,
                    message: 'Created Successfully',
                    type: 'success',
                })
                handleClose()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.data.message)

                    // history.push({
                    //     pathname: '/errors',
                    //     state: { error: error.response.status },
                    // })
                    setNotify({
                        isOpen: true,
                        message: error.response.data.message,
                        type: 'error',
                    })
                }
                // setNotify({
                //     isOpen: true,
                //     message: 'Create Unsuccessful',
                //     type: 'error',
                // })
            })
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                scroll={'body'}
            >
                <DialogTitleWithIconClose onClose={handleClose}>
                    {headers.child2}
                </DialogTitleWithIconClose>
                <DialogContent>
                    <DialogContentText>
                        {contentText1}
                        <strong>{fileFormat}</strong>
                        {contentText2}
                    </DialogContentText>
                    <Alert variant="outlined" severity="info">
                        <Link underline="always" href={link}>
                            {linkText}{' '}
                        </Link>{' '}
                        {contentLink}
                    </Alert>
                    <label className={classes.customfileupload}>
                        <IconButton
                            className={classes.uploadBtn}
                            component="span"
                        >
                            <FaFileImport /> &nbsp;&nbsp;
                            <input
                                id="icon-button-file"
                                className={classes.inputFile}
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                type="file"
                                onChange={(event) => handleUploadFile(event)}
                            />
                            Choose file
                        </IconButton>
                    </label>
                    <label>{fileName} </label>
                    <Alert
                        severity={text === 0 ? 'warning' : 'success'}
                        className={classes.alert}
                    >
                        <AlertTitle>
                            {text === 0 ? alertType.waring : alertType.success}
                        </AlertTitle>
                        {alertText}
                        <strong>[{text}] row(s)</strong>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        disabled={isDisableButton}
                        className={classes.btnSave}
                    >
                        Save
                    </Button>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbars notify={notify} setNotify={setNotify} />
        </>
    )
}

export default ImportFile

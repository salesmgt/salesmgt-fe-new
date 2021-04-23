import React from 'react';
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
import { Alert, AlertTitle } from '@material-ui/lab';
import { MdClose } from 'react-icons/md'
import { FaFileImport } from 'react-icons/fa'
import { Consts } from './FormConfig'
import * as XLSX from 'xlsx'
import { storage } from '../../../services/firebase'
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
    const { open, onClose } = props
    const { headers } = Consts
    const [fileName,setFileName] = React.useState('')
    const [text,setText] =React.useState(0)
    const handleClose = () => {
        onClose(false);
      };
    const downloadFile = (event) =>{
          event.preventDefault();
          return new Promise((resolve, reject) => { 
          storage
                .ref('documents/Import_Sample.xlsx')
                .getDownloadURL()
                .then((url) => {
                     console.log('getDownloadURL(): ', url);
                     const xhr = new XMLHttpRequest();
                     xhr.responseType = 'blob';
                     xhr.onload = (event) => {
                       const blob = xhr.response;
                     };
                     xhr.open('GET', url);
                    //  xhr.setRequestHeader("access-control-allow-headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
                     xhr.send();
                    // resolve(url)
                })
             
      })}


    const handleUploadAvatar = (event) =>{
        const filePath =event.target.files[0];
       setFileName(filePath.name)    
       if (!filePath.name.match(/\.(xlsx|xls|csv|xml|xslx)$/)) {
        alert('Invalid file type'); 
        event.target.value=''
        setFileName('')
        setText(0)
        return false;
    } 
    else{
const promise = new Promise((resolve,reject) =>{
const fileReader = new FileReader()
fileReader.readAsArrayBuffer(filePath)
fileReader.onload = (e) => {
    const bufferArray = e.target.result
    const wb = XLSX.read(bufferArray,{type: 'buffer'})
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]
    const data = XLSX.utils.sheet_to_json(ws)
    resolve(data)
}
    fileReader.onerror = error => {
        reject(error)
    }
})
promise.then((e) =>{ 
const array = []
e.forEach(item =>{
    if(!item['Tên trường']){
        event.target.value=''
      return false
    }
    array.push({
    name: item['Tên trường'],
    educationalLevel: item['Cấp học'],
    phone: item['SĐT trường'],
    district: item['Quận/Huyện'],
    address: item['Địa chỉ (tồn tại duy nhất)'],
    reprName: item['Hiệu trưởng/Hiệu phó'],
    isMale: item['Giới tính']==='Nam' ? true : false,
    reprPhone: item['SĐT HT/HP'],
    reprEmail: item['Email HT/HP'],
    type: item['Loại hình'],
    scale:item['Quy mô'],
    status:item['Tình trạng'],
    description: item['Thông tin chi tiết']
})
})
console.log(array)
setText(array.length)
})
}
}
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" scroll={'body'}>
            <DialogTitleWithIconClose onClose={onClose}>
                {headers.child2}
            </DialogTitleWithIconClose>
            <DialogContent>
          <DialogContentText>
            To import file to this system, please select a file in your device. The system only accepts <strong> xlsx, xls, csv</strong> file format.
          </DialogContentText>
            <Alert variant="outlined" severity="info">
                Please <Link underline='always' href="#" onClick={downloadFile} >
      click here </Link> to download an import sample file
            </Alert>
                    <label className={classes.customfileupload}>
                        <IconButton
                             className={classes.uploadBtn}
                            component="span"
                        >
                            <FaFileImport />
                            <input
                        id="icon-button-file"
                        className={classes.inputAvatar}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        type="file"
                     onChange={(event) => handleUploadAvatar(event)}
                    />Choose file
                        </IconButton>
                    </label>
                    <label>{fileName} </label>
                    <Alert severity={text === 0 ? 'warning':'success'} className={classes.alert}>
        <AlertTitle >{text === 0 ? 'Warning':'Checked'}</AlertTitle>
        Total rows will be inserted  — <strong>[{text}] rows</strong>
      </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"  variant="contained">
            Save
          </Button>
        </DialogActions>
        </Dialog>
    )
}

export default ImportFile;
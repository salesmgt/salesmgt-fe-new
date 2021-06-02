import React, { useEffect, useState } from 'react'
import {
    Box,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    TextField,
    IconButton,
    Tooltip,
    InputAdornment,
} from '@material-ui/core'
import { previewColumns } from './CreateKPISheetConfig'
import { MdDelete } from 'react-icons/md'
import * as ArrayUtils from '../../../../utils/Arrays'
import classes from './Step2.module.scss'

//===============Set max-height for dropdown list===============
const ITEM_HEIGHT = 38
const ITEM_PADDING_TOP = 5
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        },
    },
}
//==============================================================
function Step2(props) {
    const { KPI, setKPI } = props
    const { criteria, kpis } = KPI
    const [myCriteria, setMyCriteria] = useState(criteria)
    // const [previewKPIs, setPreviewKPIs] = useState([])
    console.log('Step 2: kpi = ', KPI)

    // const refractorCriteria = () => {
    //     const criList = [...criteria]
    //     let newCriteria = []
    //     criList.map((cri, index) => {
    //         if (index < (criList.length - 1)) {
    //             cri = { ...cri, isChecked: true, targetValue: 0, weight: Math.round(100 / criList.length) }
    //         } else {
    //             cri = {
    //                 ...cri,
    //                 isChecked: true,
    //                 targetValue: 0,
    //                 weight: 100 - (Math.round(100 / criList.length) * (criList.length - 1))
    //             }
    //         }
    //         newCriteria.push(cri)
    //     })
    //     setKPI({ ...KPI, criteria: newCriteria, kpis: [{ ...kpis, criteria: newCriteria }] })

    //     // if (!myCriteria?.targetValue || !myCriteria?.weight) {
    //     //     setMyCriteria(newCriteria)
    //     // }
    //     // return newCriteria
    // }
    // useEffect(() => {
    //     refractorCriteria()
    // }, []);
    // setMyCriteria(refractorCriteria)
    // const [myCriteria, setMyCriteria] = useState(KPI.criteria?.targetValue === undefined ? refractorCriteria : KPI.criteria)

    // console.log('outside ----- myCriteria: ', myCriteria);

    // if (!myCriteria?.targetValue || !myCriteria?.weight) {
    //     setMyCriteria(refractorCriteria)
    // }

    const calculateSuggestedWeight = (listCriteria) => {
        let myCriteria = []

        // Re-calculate suggested weight
        listCriteria.map((cri, index) => {
            if (index < (listCriteria.length - 1)) {
                cri = { ...cri, weight: Math.round(100 / listCriteria.length) } //isChecked: true, //ko cần cái này nữa
            }
            else {  // last item
                cri = {
                    ...cri,
                    // isChecked: true,
                    weight: 100 - (Math.round(100 / listCriteria.length) * (listCriteria.length - 1))
                }
            }
            myCriteria.push(cri)
        })

        setKPI({ ...KPI, criteria: myCriteria, kpis: [{ ...kpis, criteria: myCriteria }] })
    }

    const handleTargetValueChange = (event, index) => {
        const inputValue = event.target.value;
        // console.log('inputValue = ', inputValue);
        // console.log('editing row = ', row);

        // const index = myCriteria.findIndex((cri) => cri.id === row.id)
        // console.log('targetValue of index = ', index);
        //const item ={...myCriteria[index],note: e.target.value}
        let listCriteria = [...myCriteria]
        listCriteria[index] = {
            ...listCriteria[index],
            targetValue: inputValue
        }
        setMyCriteria(listCriteria)
        // myCriteria = [...listCriteria]
        // console.log('handleTargetValueChange() ------ myCriteria = ', myCriteria);
        setKPI({ ...KPI, criteria: listCriteria, kpis: [{ ...kpis, criteria: listCriteria }] })
    }

    const handleWeightChange = (event, index) => {
        const inputValue = event.target.value;
        // console.log('inputValue = ', inputValue);
        let listCriteria = [...myCriteria]

        listCriteria[index] = {
            ...listCriteria[index],
            weight: inputValue
        }
        setMyCriteria(listCriteria)
        setKPI({ ...KPI, criteria: listCriteria })
    }
    // console.log('outside ------ myCriteria = ', myCriteria);

    const handleRemove = (id) => {
        const listCriteria = [...ArrayUtils.removeItem(myCriteria, 'id', id)]
        setMyCriteria(listCriteria)
        calculateSuggestedWeight(listCriteria)

        // Vì trong calculateSuggestedWeight(listCriteria) đã xử lý hậu kỳ cái "listCriteria" và setKPI() rồi
        // nên dưới này ko cần set lại "listCriteria" tiền xử lý (chưa calculate weight) nữa.
        // setKPI({ ...KPI, criteria: listCriteria, kpis: [{ ...kpis, criteria: listCriteria }] })
    }

    return (
        <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" className={classes.wrapper}>
            <div className={classes.child}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader size="small">
                        <TableHead className={classes.tHead}>
                            {previewColumns.map(col => (
                                <TableCell key={col.key} width={col.width} className={classes.tHeadCell}>
                                    {col.name}
                                </TableCell>
                            ))}
                        </TableHead>
                        <TableBody className={classes.tBody}>
                            {criteria.map((cri, index) => (
                                <TableRow key={cri.id} className={classes.tBodyRow}>
                                    <TableCell className={classes.tBodyCell}>{index + 1}</TableCell>
                                    <TableCell className={classes.tBodyCell}>{cri.name}</TableCell>
                                    <TableCell className={classes.tBodyCellTextField}>
                                        <TextField className={classes.txtTargetValue}
                                            variant="outlined" size="small"
                                            type="number"
                                            value={cri.targetValue}
                                            onChange={(event) => handleTargetValueChange(event, index)}
                                            InputProps={{
                                                inputProps: { min: 0, max: 999999999999 }  // 999 tỷ 999 triệu 999 ngàn 999
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tBodyCellTextField}>
                                        {/* <div dir="rtl"> */}
                                        <TextField className={classes.txtWeight}
                                            variant="outlined" size="small"
                                            type="number"
                                            value={cri.weight}
                                            onChange={(event) => handleWeightChange(event, index)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end"> % </InputAdornment>
                                                ),
                                                inputProps: { min: 0, max: 100 }
                                            }}
                                        />
                                        {/* </div> */}
                                    </TableCell>
                                    <TableCell className={classes.tBodyCell}>
                                        <Tooltip title="Remove" size="small">
                                            <IconButton onClick={() => handleRemove(cri?.id)}><MdDelete /></IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    )
}

export default Step2

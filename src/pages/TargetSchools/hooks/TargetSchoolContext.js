import React, { useState, useContext, createContext, useEffect } from 'react'
import * as FiltersServices from '../../../services/FiltersServices'
import { columns } from '../TargetSchoolsConfig';
import { useHistory } from 'react-router-dom'
// import { schoolYears, districts, schoolTypes, schoolLevels, schoolScales, PICs } from '../../data/mock-data'
// import { TargetSchoolReducer } from './TargetSchoolReducer'

const TargetSchoolContext = createContext()

export function useTargetSchool() {
    return useContext(TargetSchoolContext)
}

function useTargetSchoolProvider() {
    // ko cần cái này nhỉ?
    // const [params, dispatchParams] = useReducer(TargetSchoolReducer, [])

    const history = useHistory()

    // Paging
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    // Sorting
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState(columns[0])
    
    //Filters
    const [schoolYear, setSchoolYear] = useState('');
    const [district, setDistrict] = useState('');
    const [schoolType, setSchoolType] = useState('');
    const [schoolLevel, setSchoolLevel] = useState('');
    const [schoolScale, setSchoolScale] = useState('');
    const [PIC, setPIC] = useState(null);
    const [purpose, setPurpose] = useState('');
    
    const [districts, setDistricts] = useState([]);
    const [schoolTypes, setSchoolTypes] = useState([]);
    const [schoolLevels, setSchoolLevels] = useState([]);

    // Search field (do not have)

    // Get filters' data
    const getDistrictsFilter = () => {
        FiltersServices.getDistricts().then((data) => {
            setDistricts(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }
    useEffect(getDistrictsFilter, [])
    
    const getSchoolTypesFilter = () => {
            FiltersServices.getSchoolTypes().then((data) => {
                setSchoolTypes(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }
    useEffect(getSchoolTypesFilter, [])
    
    const getSchoolLevelsFilter = () => {
        FiltersServices.getEducationalLevels().then((data) => {
            setSchoolLevels(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error)
                history.push({
                    pathname: '/errors',
                    state: { error: error.response.status },
                })
            }
        })
    }
    useEffect(getSchoolLevelsFilter, [])

    // useEffect(() => {
    //     getDistrictsFilter()
    //     getSchoolTypesFilter()
    //     getSchoolLevelsFilter()
    // }, [])
            
    return {
        districts, schoolTypes, schoolLevels,
        page, setPage, rowsPerPage, setRowsPerPage,
        order, setOrder, orderBy, setOrderBy,
        schoolYear, setSchoolYear, district, setDistrict,
        schoolType, setSchoolType, schoolLevel,
        setSchoolLevel, schoolScale, setSchoolScale,
        PIC, setPIC, purpose, setPurpose
    }
}

function TargetSchoolProvider(props) {
    const { children } = props
    const targetSchool = useTargetSchoolProvider()

    return (
        <TargetSchoolContext.Provider value={targetSchool}>
            {children}
        </TargetSchoolContext.Provider>
    )
}

export default TargetSchoolProvider
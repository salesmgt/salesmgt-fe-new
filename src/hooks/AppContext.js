import React, { createContext, useContext, useState, useEffect } from 'react'
import * as FiltersServices from '../services/FiltersServices'
import * as Milk from '../utils/Milk'

const AppContext = createContext()

export function useApp() {
    return useContext(AppContext)
}

function useAppProvider() {
    const [dists, setDists] = useState(Milk.getMilk('dists'))
    const [schYears, setSchYears] = useState(Milk.getMilk('schYears'))
    const [schEduLvls, setSchEduLvls] = useState(Milk.getMilk('eduLvls'))
    const [schScales, setSchScales] = useState(Milk.getMilk('scales'))
    const [schTypes, setSchTypes] = useState(Milk.getMilk('types'))
    const [schStatus, setSchStatus] = useState(Milk.getMilk('status'))
    const [salesPurps, setSalesPurps] = useState(Milk.getMilk('salesPurps'))
    const [roles, setRoles] = useState(Milk.getMilk('roles'))

    // const [salesPurps] = useState(JSON.parse(localStorage.getItem('purps')))
    // const [pics] = useState(null)

    useEffect(() => {
        FiltersServices.getDistricts()
            .then((data) => {
                // localStorage.setItem('dists', JSON.stringify(data))
                // setDists(JSON.parse(localStorage.getItem('dists')))
                Milk.setMilk('dists', data)
                setDists(Milk.getMilk('dists'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getEducationalLevels()
            .then((data) => {
                // localStorage.setItem('eduLvls', JSON.stringify(data))
                // setSchEduLvls(JSON.parse(localStorage.getItem('eduLvls')))
                Milk.setMilk('eduLvls', data)
                setSchEduLvls(Milk.getMilk('eduLvls'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolTypes()
            .then((data) => {
                // localStorage.setItem('types', JSON.stringify(data))
                // setSchTypes(JSON.parse(localStorage.getItem('types')))
                Milk.setMilk('types', data)
                setSchTypes(Milk.getMilk('types'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolScales()
            .then((data) => {
                // localStorage.setItem('scales', JSON.stringify(data))
                // setSchScales(JSON.parse(localStorage.getItem('scales')))
                Milk.setMilk('scales', data)
                setSchScales(Milk.getMilk('scales'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolStatuses()
            .then((data) => {
                // localStorage.setItem('status', JSON.stringify(data))
                // setSchStatus(JSON.parse(localStorage.getItem('status')))
                Milk.setMilk('status', data)
                setSchStatus(Milk.getMilk('status'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getRoles()
            .then((data) => {
                // localStorage.setItem('roles', JSON.stringify(data))
                // setRoles(localStorage.getItem('roles'))
                Milk.setMilk('roles', data)
                setRoles(Milk.getMilk('roles'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getPurposes()
            .then((data) => {
                // localStorage.setItem('salesPurps', JSON.stringify(data))
                Milk.setMilk('salesPurps', data)
                setSalesPurps(Milk.getMilk('salesPurps'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolYears()
            .then((data) => {
                Milk.setMilk('schYears', data)
                setSchYears(Milk.getMilk('schYears'))
            }).catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    // FiltersServices.getPICs()
    //     .then((data) => {
    //         return data
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //             console.log(error)
    //         }
    //     })

    return {
        dists,
        schYears,
        schEduLvls,
        schTypes,
        schScales,
        schStatus,
        salesPurps,
        roles,
        // pics,
    }
}

function AppProvider(props) {
    const { children } = props

    const app = useAppProvider()

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}

export default AppProvider

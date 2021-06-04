import React, { createContext, useContext, useState, useEffect } from 'react'
import * as FiltersServices from '../services/FiltersServices'
import * as Milk from '../utils/Milk'
import { milkNames } from '../constants/Generals'

const AppContext = createContext()

export function useApp() {
    return useContext(AppContext)
}

function useAppProvider() {
    const [userInfo, setUserInfo] = useState(null)

    const [dists, setDists] = useState(
        Milk?.getMilk(milkNames?.dists) ? Milk?.getMilk(milkNames?.dists) : null
    )
    const [schEduLvls, setSchEduLvls] = useState(
        Milk?.getMilk(milkNames?.eduLvls) ? Milk?.getMilk(milkNames?.eduLvls) : null
    )
    // const [schScales, setSchScales] = useState(
    //     Milk?.getMilk(milkNames?.types) ? Milk?.getMilk(milkNames?.types) : null
    // )
    const [schTypes, setSchTypes] = useState(
        Milk?.getMilk(milkNames?.types) ? Milk?.getMilk(milkNames?.types) : null
    )
    const [schStatus, setSchStatus] = useState(
        Milk?.getMilk(milkNames?.status) ? Milk?.getMilk(milkNames?.status) : null
    )
    const [roles, setRoles] = useState(
        Milk?.getMilk(milkNames?.roles) ? Milk?.getMilk(milkNames?.roles) : null
    )
    const [schYears, setSchYears] = useState(
        Milk?.getMilk(milkNames?.schYears)
            ? Milk?.getMilk(milkNames?.schYears)
            : null
    )
    const [salesPurps, setSalesPurps] = useState(
        Milk?.getMilk(milkNames?.salesPurps)
            ? Milk?.getMilk(milkNames?.salesPurps)
            : null
    )

    useEffect(() => {
        FiltersServices.getDistricts()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.dists, data)
                    setDists(Milk?.getMilk(milkNames?.dists))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // Clean the state when the component is unmount
        // return () => {
        //     setDists(null);
        // }
    }, [])

    useEffect(() => {
        FiltersServices.getEducationalLevels()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.eduLvls, data)
                    setSchEduLvls(Milk?.getMilk(milkNames?.eduLvls))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // return () => setSchEduLvls(null)
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolTypes()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.types, data)
                    setSchTypes(Milk?.getMilk(milkNames?.types))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // return () => setSchTypes(null)
    }, [])

    // useEffect(() => {
    //     FiltersServices.getSchoolScales()
    //         .then((data) => {
    //             Milk?.setMilk(milkNames?.scales, data)
    //             setSchScales(Milk?.getMilk(milkNames?.scales))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })
    //     // return () => setSchScales(null)
    // }, [])

    useEffect(() => {
        FiltersServices.getSchoolStatus()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.status, data)
                    setSchStatus(Milk?.getMilk(milkNames?.status))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // return () => setSchStatus(null)
    }, [])

    useEffect(() => {
        FiltersServices.getRoles()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.roles, data)
                    setRoles(Milk?.getMilk(milkNames?.roles))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // return () => setRoles(null)
    }, [])

    useEffect(() => {
        FiltersServices.getPurposes()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.salesPurps, data)

                    setSalesPurps(Milk?.getMilk(milkNames?.salesPurps))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // return () => setSalesPurps(null)
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolYears()
            .then((data) => {
                if (data) {
                    Milk?.setMilk(milkNames?.schYears, data)

                    setSchYears(Milk?.getMilk(milkNames?.schYears))
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
        // return () => setSchYears(null)
    }, [])

    return {
        userInfo,
        setUserInfo,
        dists,
        schEduLvls,
        schTypes,
        // schScales,
        schStatus,
        roles,
        schYears,
        salesPurps,
    }
}

function AppProvider(props) {
    const { children } = props

    const app = useAppProvider()

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}

export default AppProvider

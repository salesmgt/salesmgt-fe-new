import React, { createContext, useContext, useState, useEffect } from 'react'
import * as FiltersServices from '../services/FiltersServices'
import * as Milk from '../utils/Milk'

const AppContext = createContext()

export function useApp() {
    return useContext(AppContext)
}

function useAppProvider() {
    const [dists, setDists] = useState(
        Milk.getMilk('dists') ? Milk.getMilk('dists') : null
    )
    const [schEduLvls, setSchEduLvls] = useState(
        Milk.getMilk('eduLvls') ? Milk.getMilk('eduLvls') : null
    )
    const [schScales, setSchScales] = useState(
        Milk.getMilk('types') ? Milk.getMilk('types') : null
    )
    const [schTypes, setSchTypes] = useState(
        Milk.getMilk('scales') ? Milk.getMilk('scales') : null
    )
    const [schStatus, setSchStatus] = useState(
        Milk.getMilk('status') ? Milk.getMilk('status') : null
    )
    const [roles, setRoles] = useState(
        Milk.getMilk('roles') ? Milk.getMilk('roles') : null
    )

    // const [salesPurps] = useState(JSON.parse(localStorage.getItem('purps')))
    // const [pics] = useState(null)

    useEffect(() => {
        FiltersServices.getDistricts()
            .then((data) => {
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
                Milk.setMilk('roles', data)
                setRoles(Milk.getMilk('roles'))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    // useEffect(() => {
    //     FiltersServices.getPurposes()
    //         .then((data) => {
    //             localStorage.setItem('purps', JSON.stringify(data))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })
    // }, [])

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
        schEduLvls,
        schTypes,
        schScales,
        schStatus,
        roles,
        // salesPurps,
        // pics,
    }
}

function AppProvider(props) {
    const { children } = props

    const app = useAppProvider()

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}

export default AppProvider

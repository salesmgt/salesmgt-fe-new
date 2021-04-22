import React, { createContext, useContext, useState, useEffect } from 'react'
import * as FiltersServices from '../services/FiltersServices'
import * as Milk from '../utils/Milk'
import { milkName } from '../constants/Generals'

const AppContext = createContext()

export function useApp() {
    return useContext(AppContext)
}

function useAppProvider() {
    const [dists, setDists] = useState(
        Milk.getMilk(milkName.dists) ? Milk.getMilk(milkName.dists) : null
    )
    const [schEduLvls, setSchEduLvls] = useState(
        Milk.getMilk(milkName.eduLvls) ? Milk.getMilk(milkName.eduLvls) : null
    )
    const [schScales, setSchScales] = useState(
        Milk.getMilk(milkName.types) ? Milk.getMilk(milkName.types) : null
    )
    const [schTypes, setSchTypes] = useState(
        Milk.getMilk(milkName.scales) ? Milk.getMilk(milkName.scales) : null
    )
    const [schStatus, setSchStatus] = useState(
        Milk.getMilk(milkName.status) ? Milk.getMilk(milkName.status) : null
    )
    const [roles, setRoles] = useState(
        Milk.getMilk(milkName.roles) ? Milk.getMilk(milkName.roles) : null
    )
    const [schYears, setSchYears] = useState(
        Milk.getMilk(milkName.schYears) ? Milk.getMilk(milkName.schYears) : null
    )
    const [salesPurps, setSalesPurps] = useState(
        Milk.getMilk(milkName.salesPurps)
            ? Milk.getMilk(milkName.salesPurps)
            : null
    )

    useEffect(() => {
        FiltersServices.getDistricts()
            .then((data) => {
                Milk.setMilk(milkName.dists, data)
                setDists(Milk.getMilk(milkName.dists))
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
                Milk.setMilk(milkName.eduLvls, data)
                setSchEduLvls(Milk.getMilk(milkName.eduLvls))
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
                Milk.setMilk(milkName.types, data)
                setSchTypes(Milk.getMilk(milkName.types))
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
                Milk.setMilk(milkName.scales, data)
                setSchScales(Milk.getMilk(milkName.scales))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    useEffect(() => {
        FiltersServices.getSchoolStatus()
            .then((data) => {
                Milk.setMilk(milkName.status, data)
                setSchStatus(Milk.getMilk(milkName.status))
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
                Milk.setMilk(milkName.roles, data)
                setRoles(Milk.getMilk(milkName.roles))
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
                Milk.setMilk(milkName.salesPurps, data)
                setSalesPurps(Milk.getMilk(milkName.salesPurps))
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
                Milk.setMilk(milkName.schYears, data)
                setSchYears(Milk.getMilk(milkName.schYears))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                }
            })
    }, [])

    return {
        dists,
        schYears,
        schEduLvls,
        schTypes,
        schScales,
        schStatus,
        salesPurps,
        roles,
    }
}

function AppProvider(props) {
    const { children } = props

    const app = useAppProvider()

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}

export default AppProvider

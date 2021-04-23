import React, { createContext, useContext, useState } from 'react'
import * as Milk from '../utils/Milk'
import { milkName } from '../constants/Generals'
import * as FiltersServices from '../services/FiltersServices'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

// const dists =  FiltersServices.getDistricts()
//         .then((data) => {

//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })

// const getEduLvlsData = () => {
//     FiltersServices.getEducationalLevels()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

// const getTypesData = () => {
//     FiltersServices.getSchoolTypes()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

// const getScalesData = () => {
//     FiltersServices.getSchoolScales()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

// const getStatusData = () => {
//     FiltersServices.getSchoolStatus()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

// const getRolesData = () => {
//     FiltersServices.getRoles()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

// const getSalesPurpsData = () => {
//     FiltersServices.getPurposes()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

// const getSchYearsData = () => {
//     FiltersServices.getSchoolYears()
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             if (error.response) {
//                 console.log(error)
//             }
//         })
// }

function useAuthProvider() {
    const [user, setUser] = useState(
        Milk.getMilkExpiry(milkName.token)
            ? Milk.getMilkExpiry(milkName.token)
            : null
    )

    if (!user) {
        Milk.makeSour(milkName.dists)
        Milk.makeSour(milkName.eduLvls)
        Milk.makeSour(milkName.types)
        Milk.makeSour(milkName.scales)
        Milk.makeSour(milkName.status)
        Milk.makeSour(milkName.roles)
        Milk.makeSour(milkName.schYears)
        Milk.makeSour(milkName.salesPurps)
    }
    // else {
    //     Milk.setMilk(milkName.dists, dists)
    //     Milk.setMilk(milkName.eduLvls, getEduLvlsData())
    //     Milk.setMilk(milkName.types, getTypesData())
    //     Milk.setMilk(milkName.scales, getScalesData())
    //     Milk.setMilk(milkName.status, getStatusData())
    //     Milk.setMilk(milkName.roles, getRolesData())
    //     Milk.setMilk(milkName.salesPurps, getSalesPurpsData())
    //     Milk.setMilk(milkName.schYears, getSchYearsData())
    // }

    return {
        user,
        setUser,
    }
}

function AuthProvider(props) {
    const { children } = props

    const auth = useAuthProvider()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider

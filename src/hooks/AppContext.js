import { createContext, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as FiltersServices from '../services/FiltersServices'

const AppContext = createContext()

export function useApp() {
    return useContext(AppContext)
}

function useAppProvider() {
    const history = useHistory()

    const [dists, setDists] = useState(null)
    const [schEduLvls, setSchEduLvls] = useState(null)
    const [schScales, setSchScales] = useState(null)
    const [schTypes, setSchTypes] = useState(null)
    const [schStatus, setSchStatus] = useState(null)
    // const [salesPurps, setSalesPurps] = useState(null)
    const [roles, setRoles] = useState(null)
    const [pics, setPics] = useState(null)

    let isMounted = true
    const refreshPage = () => {
        FiltersServices.getDistricts()
            .then((data) => {
                if (isMounted) {
                    setDists(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        FiltersServices.getEducationalLevels()
            .then((data) => {
                if (isMounted) {
                    setSchEduLvls(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        FiltersServices.getSchoolScales()
            .then((data) => {
                if (isMounted) {
                    setSchScales(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        FiltersServices.getSchoolTypes()
            .then((data) => {
                if (isMounted) {
                    setSchTypes(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        FiltersServices.getSchoolStatuses()
            .then((data) => {
                if (isMounted) {
                    setSchStatus(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        // FiltersServices.getPurposes()
        //     .then((data) => {
        //         if (isMounted) {
        //             setSalesPurps(data)
        //         }
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error)
        //             history.push({
        //                 pathname: '/errors',
        //                 state: { error: error.response.status },
        //             })
        //         }
        //     })

        FiltersServices.getRoles()
            .then((data) => {
                if (isMounted) {
                    setRoles(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })

        FiltersServices.getPICs()
            .then((data) => {
                if (isMounted) {
                    setPics(data)
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

    useEffect(() => {
        refreshPage()
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted = false
        }
    }, [])

    return {
        dists,
        schEduLvls,
        schScales,
        schTypes,
        schStatus,
        // salesPurps
        roles,
        pics,
    }
}

function AppProvider(props) {
    const { children } = props

    const app = useAppProvider()

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}

export default AppProvider

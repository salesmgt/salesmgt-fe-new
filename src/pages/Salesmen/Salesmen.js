import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom'
import * as SalesmenServices from './SalesmenServices'
import { NotFound } from '../../components'

function Salesmen() {
    const { url } = useRouteMatch()
    const history = useHistory()
    const location = useLocation()

    const [data, setData] = useState(null)

    let isMounted = true
    const refreshPage = () => {
        SalesmenServices.getUsers()
            .then((data) => {
                if (isMounted) {
                    setData(data)
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
    }, [location.pathname])

    if (!data) {
        return <NotFound title="Salesmen not found!" />
    }

    const list = data.list

    const salesmen = list.filter((item) => item.roleName === 'SALESMAN')

    return (
        <div>
            <Button
                component={Link}
                to={{
                    pathname: `${url}/${salesmen[0].username}`,
                    state: { data: salesmen[0] },
                }}
            >
                Go to Detail
            </Button>
        </div>
    )
}

export default Salesmen

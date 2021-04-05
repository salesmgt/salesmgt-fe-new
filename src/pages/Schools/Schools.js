import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom'
import * as SchoolsServices from './SchoolsServices'
import { NotFound } from '../../components'

function Schools() {
    const { url } = useRouteMatch()
    const history = useHistory()
    const location = useLocation()

    const [data, setData] = useState(null)

    let isMounted = true
    const refreshPage = () => {
        SchoolsServices.getSchools()
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
        return <NotFound title="Schools not found!" />
    }

    const schools = data.list

    return (
        <div>
            <Button
                component={Link}
                to={{
                    pathname: `${url}/${schools[0].name}`,
                    state: { data: schools[0] },
                }}
            >
                Go to Detail
            </Button>
        </div>
    )
}

export default Schools

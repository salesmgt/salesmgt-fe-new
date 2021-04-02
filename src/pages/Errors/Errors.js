import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Animation } from '../../components'
import classes from './Errors.module.scss'
import { getError } from './ErrorsConfig'
import { useLocation, useHistory } from 'react-router-dom'

function Errors(props) {
    const { defaultError } = props
    const location = useLocation()
    const history = useHistory()

    const getCurrError = () => {
        if (typeof location.state !== 'undefined') {
            return getError(location.state.error)
        } else {
            return defaultError
        }
    }

    const error = getCurrError()

    return (
        <div className={classes.root}>
            {error.map((item, index) => (
                <div className={classes.main} key={index}>
                    <Animation animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" className={classes.code}>
                            {item.code}
                        </Typography>
                    </Animation>
                    <Animation delay={500}>
                        <Typography variant="h5" className={classes.message}>
                            {item.message}
                        </Typography>
                    </Animation>
                    {item.link !== '' ? (
                        <Link className={classes.link} to={item.link}>
                            {item.des}
                        </Link>
                    ) : (
                        <Typography
                            className={classes.link}
                            component="a"
                            onClick={() => history.goBack()}
                        >
                            {item.des}
                        </Typography>
                    )}

                    {/* <Link className={classes.link} to={item.link}>
                        {item.des}
                    </Link> */}
                </div>
            ))}
        </div>
    )
}

export default Errors

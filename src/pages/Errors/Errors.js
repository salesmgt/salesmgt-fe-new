import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Animations } from '../../components'
import classes from './Errors.module.scss'
// import { useError } from '../../hooks/ErrorProvider'
// import { getError } from './ErrorsConfig'

function Errors(props) {
    const { error } = props
    // const { errors } = useError()
    // console.log(errors)
    // const error = getError('404')

    return (
        <div className={classes.root}>
            {error.map((item, index) => (
                <div className={classes.main} key={index}>
                    <Animations animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" className={classes.code}>
                            {item.code}
                        </Typography>
                    </Animations>
                    <Animations delay={500}>
                        <Typography variant="h5" className={classes.message}>
                            {item.message}
                        </Typography>
                    </Animations>
                    <Link className={classes.link} to={item.link}>
                        {item.des}
                    </Link>
                </div>
            ))}
        </div>
    )
}

Errors.prototype = {
    error: PropTypes.array.isRequired,
}

export default Errors

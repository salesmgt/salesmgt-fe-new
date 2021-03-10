import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Animate from '../../utils/Animate'
import classes from './Errors.module.scss'

function Errors(props) {
    const { error } = props
    return (
        <div className={classes.root}>
            {error.map((item, index) => (
                <div className={classes.main} key={index}>
                    <Animate animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" className={classes.code}>
                            {item.code}
                        </Typography>
                    </Animate>
                    <Animate delay={500}>
                        <Typography variant="h5" className={classes.message}>
                            {item.message}
                        </Typography>
                    </Animate>
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

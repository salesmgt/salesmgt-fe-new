import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Paw } from '../../assets/icons'
import classes from './NotFound.module.scss'

function NotFound(props) {
    const { title } = props

    return (
        <div className={classes.root}>
            <div className={classes.imgContainer}>
                <img src={Paw} alt="Not found" className={classes.img} />
            </div>
            <Typography className={classes.title} noWrap>
                {title}
            </Typography>
        </div>
    )
}

export default React.memo(NotFound)

NotFound.defaultProps = {
    title: 'Oopsy Daisy!',
}

NotFound.propTypes = {
    title: PropTypes.string,
}

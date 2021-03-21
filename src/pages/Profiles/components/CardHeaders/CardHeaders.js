import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import classes from './CardHeaders.module.scss'

function CardHeaders(props) {
    const { header } = props

    return (
        <AppBar className={classes.appBar} position="static" elevation={0}>
            <Toolbar>
                <Typography variant="h5">{header}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(CardHeaders)

CardHeaders.propTypes = {
    header: PropTypes.string.isRequired,
}

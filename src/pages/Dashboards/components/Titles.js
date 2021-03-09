import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

function Titles(props) {
    const { className, children } = props
    return (
        <Typography
            component="h2"
            variant="h6"
            gutterBottom
            className={className}
        >
            {children}
        </Typography>
    )
}
export default Titles

Titles.propTypes = {
    children: PropTypes.node,
}

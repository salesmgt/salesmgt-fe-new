import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import Titles from './Titles'

function preventDefault(event) {
    event.preventDefault()
}

const useStyles = makeStyles({
    cardContext: {
        flex: 1,
    },
})

function Cards(props) {
    const classes = useStyles()
    
    return (
        <React.Fragment>
            <Titles>Recent Deposits</Titles>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography
                color="textSecondary"
                className={classes.cardContext}
            >
                on 15 March, 2019
            </Typography>
            <div>
                <Link to="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    )
}

export default Cards

Cards.propTypes = {
    props: PropTypes.string,
}
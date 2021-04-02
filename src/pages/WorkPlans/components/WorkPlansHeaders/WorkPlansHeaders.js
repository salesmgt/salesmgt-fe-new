import React from 'react'
import clsx from 'clsx'
import moment from 'moment'
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Toolbar from 'react-big-calendar/lib/Toolbar'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { Animation } from '../../../../components'

const styles = (theme) => ({
    root: {
        // backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
        backgroundColor: '#FAFAFA',
        color: '#FFFFFF',
        backgroundSize: 'cover',
        backgroundPosition: '0 50%',
        backgroundRepeat: 'no-repeat',
        '&:before': {
            content: "''",
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 99,
            border: '1px solid red',
            background: 'red',
        },
        '&.Jan': {
            backgroundImage: "url('../../../../images/workplan/winter.jpg')",
            backgroundPosition: '0 85%',
        },
        '&.Feb': {
            backgroundImage: "url('../../../../images/workplan/winter.jpg')",
            backgroundPosition: '0 85%',
        },
        '&.Mar': {
            backgroundImage: "url('../../../../images/workplan/spring.jpg')",
            backgroundPosition: '0 40%',
        },
        '&.Apr': {
            backgroundImage: "url('../../../../images/workplan/spring.jpg')",
            backgroundPosition: '0 40%',
        },
        '&.May': {
            backgroundImage: "url('../../../../images/workplan/spring.jpg')",
            backgroundPosition: '0 40%',
        },
        '&.Jun': {
            backgroundImage: "url('../../../../images/workplan/summer.jpg')",
            backgroundPosition: '0 80%',
        },
        '&.Jul': {
            backgroundImage: "url('../../../../images/workplan/summer.jpg')",
            backgroundPosition: '0 80%',
        },
        '&.Aug': {
            backgroundImage: "url('../../../../images/workplan/summer.jpg')",
            backgroundPosition: '0 80%',
        },
        '&.Sep': {
            backgroundImage: "url('../../../../images/workplan/autumn.jpg')",
            backgroundPosition: '0 40%',
        },
        '&.Oct': {
            backgroundImage: "url('../../../../images/workplan/autumn.jpg')",
            backgroundPosition: '0 40%',
        },
        '&.Nov': {
            backgroundImage: "url('../../../../images/workplan/autumn.jpg')",
            backgroundPosition: '0 40%',
        },
        '&.Dec': {
            backgroundImage: "url('../../../../images/workplan/winter.jpg')",
            backgroundPosition: '0 85%',
        },
    },
})

const viewNamesObj = {
    month: {
        title: 'Month',
        icon: 'view_module',
    },
    week: {
        title: 'Week',
        icon: 'view_week',
    },
    work_week: {
        title: 'Work week',
        icon: 'view_array',
    },
    day: {
        title: 'Day',
        icon: 'view_day',
    },
    agenda: {
        title: 'Agenda',
        icon: 'view_agenda',
    },
}

class WorkPlansHeaders extends Toolbar {
    viewButtons() {
        const viewNames = this.props.views
        const { view } = this.props

        if (viewNames.length > 1) {
            return viewNames.map((name) => (
                <Tooltip title={viewNamesObj[name].title} key={name}>
                    <div>
                        <Animation animation="transition.expandIn" delay={500}>
                            <IconButton
                                aria-label={name}
                                onClick={() => this.props.onView(name)}
                                disabled={view === name}
                            >
                                <Icon>{viewNamesObj[name].icon}</Icon>
                            </IconButton>
                        </Animation>
                    </div>
                </Tooltip>
            ))
        }
        return null
    }

    render() {
        const { classes, label, date } = this.props
        return (
            <div className={clsx(classes.root, moment(date).format('MMM'))}>
                <div>
                    <div>
                        <div>
                            <Animation
                                animation="transition.expandIn"
                                delay={300}
                            >
                                <Icon>today</Icon>
                            </Animation>
                            <Animation
                                animation="transition.slideLeftIn"
                                delay={300}
                            >
                                <Typography variant="h6">Calendar</Typography>
                            </Animation>
                        </div>
                        <div>
                            <Tooltip title="Today">
                                <div>
                                    <Animation
                                        animation="transition.expandIn"
                                        delay={500}
                                    >
                                        <IconButton
                                            aria-label="today"
                                            onClick={this.navigate.bind(
                                                null,
                                                navigate.TODAY
                                            )}
                                        >
                                            <Icon>today</Icon>
                                        </IconButton>
                                    </Animation>
                                </div>
                            </Tooltip>
                            {this.viewButtons()}
                        </div>
                    </div>

                    <Animation delay={500}>
                        <div>
                            <Tooltip title="Previous">
                                <IconButton
                                    aria-label="Previous"
                                    onClick={this.navigate.bind(
                                        null,
                                        navigate.PREVIOUS
                                    )}
                                >
                                    <Icon>
                                        <MdChevronLeft />
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">{label}</Typography>
                            <Tooltip title="Next">
                                <IconButton
                                    aria-label="Next"
                                    onClick={this.navigate.bind(
                                        null,
                                        navigate.NEXT
                                    )}
                                >
                                    <Icon>
                                        <MdChevronRight />
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Animation>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(WorkPlansHeaders)

// function WorkPlansHeaders() {
//     return <h1>hi</h1>
// }

// export default WorkPlansHeaders

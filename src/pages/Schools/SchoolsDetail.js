import React, { useState } from 'react'
import clsx from 'clsx'
import {
    Tab,
    Tabs,
    Typography,
    makeStyles,
    Grid,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    AccordionActions,
    Button,
    Divider,
} from '@material-ui/core'
import { MdEdit } from 'react-icons/md'
import { CardHeaders } from '../Profiles/components'
import classes from './SchoolsDetail.module.scss'

const useStyles = makeStyles((theme) => ({
    root: { color: 'rgba(0, 0, 0, 0.87)' },
}))

function SchoolsDetail() {
    const [tabValue, setTabValue] = useState(0)

    const styles = useStyles()

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    return (
        <div className={classes.root}>
            <div className={classes.topBg} />
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <Typography variant="h4">header</Typography>
                    </div>
                    <div className={classes.body}>
                        <div className={classes.tabContainer}>
                            <Tabs
                                value={tabValue}
                                onChange={handleChangeTab}
                                indicatorColor="primary"
                                // textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                classes={{ root: styles.root }}
                            >
                                <Tab className="" label="School Detail" />
                                <Tab className="" label="Actions" />
                            </Tabs>
                        </div>
                        <div className={classes.wrapper}>
                            {tabValue === 0 && (
                                <div className={classes.tabPanel}>
                                    <Grid container>
                                        <Grid item>
                                            <Card elevation={1}>
                                                <CardHeaders header="General Information" />
                                                <CardContent
                                                    className={
                                                        classes.cardContent
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.cardText
                                                        }
                                                    >
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                        >
                                                            <Grid
                                                                item
                                                                sm={3}
                                                                md={3}
                                                                lg={3}
                                                            >
                                                                <Typography
                                                                    className={
                                                                        classes.titles
                                                                    }
                                                                >
                                                                    Title
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                sm={6}
                                                                md={6}
                                                                lg={6}
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.detailZone
                                                                    }
                                                                >
                                                                    <Typography
                                                                        className={
                                                                            classes.details
                                                                        }
                                                                    >
                                                                        Detail
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>

                                                    <div
                                                        className={
                                                            classes.cardText
                                                        }
                                                    >
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                        >
                                                            <Grid
                                                                item
                                                                sm={3}
                                                                md={3}
                                                                lg={3}
                                                            >
                                                                <Typography
                                                                    className={
                                                                        classes.titles
                                                                    }
                                                                >
                                                                    Title
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                sm={6}
                                                                md={6}
                                                                lg={6}
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.detailZone
                                                                    }
                                                                >
                                                                    <Typography
                                                                        className={
                                                                            classes.details
                                                                        }
                                                                    >
                                                                        Detail
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>

                                                    <form
                                                        noValidate
                                                        // onSubmit={emailSubmit(
                                                        //     onEmailSubmit
                                                        // )}
                                                    >
                                                        <Accordion
                                                            className={
                                                                classes.accor
                                                            }
                                                            elevation={0}
                                                            // expanded={
                                                            //     expanded ===
                                                            //     'email'
                                                            // }
                                                            // onChange={handleChange(
                                                            //     'email'
                                                            // )}
                                                        >
                                                            <AccordionSummary
                                                                className={
                                                                    classes.accorSum
                                                                }
                                                                // id="email"
                                                                expandIcon={
                                                                    <MdEdit />
                                                                }
                                                            >
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        sm={3}
                                                                        md={3}
                                                                        lg={3}
                                                                    >
                                                                        <Typography
                                                                            className={
                                                                                classes.titles
                                                                            }
                                                                        >
                                                                            Title
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        sm={6}
                                                                        md={6}
                                                                        lg={6}
                                                                    >
                                                                        <TextField
                                                                            className={clsx(
                                                                                classes.details,
                                                                                classes.detailsAccor
                                                                            )}
                                                                            type="text"
                                                                            // value={
                                                                            //     email
                                                                            // }
                                                                            fullWidth
                                                                            disabled
                                                                            InputProps={{
                                                                                disableUnderline: true,
                                                                                className:
                                                                                    classes.details,
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionSummary>
                                                            <AccordionDetails
                                                                className={
                                                                    classes.accorDetails
                                                                }
                                                            >
                                                                <Grid
                                                                    container
                                                                    direction="column"
                                                                >
                                                                    <Grid
                                                                        item
                                                                        sm={6}
                                                                        md={6}
                                                                        lg={6}
                                                                        className={
                                                                            classes.inputZone
                                                                        }
                                                                    >
                                                                        <TextField
                                                                            className={
                                                                                classes.inputField
                                                                            }
                                                                            fullWidth
                                                                            autoFocus
                                                                            required
                                                                            // name="email"
                                                                            // label={
                                                                            //     fields
                                                                            //         .email
                                                                            //         .label
                                                                            // }
                                                                            variant="outlined"
                                                                            type="text"
                                                                            // inputRef={
                                                                            //     emailRegister
                                                                            // }
                                                                            // error={
                                                                            //     !!emailErrors.email
                                                                            // }
                                                                            // helperText={
                                                                            //     emailErrors
                                                                            //         ?.email
                                                                            //         ?.message
                                                                            // }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                            <Divider />
                                                            <AccordionActions
                                                                className={
                                                                    classes.accorActions
                                                                }
                                                            >
                                                                <Button
                                                                    className={
                                                                        classes.cancelBtn
                                                                    }
                                                                    size="small"
                                                                    // onClick={() =>
                                                                    //     emailReset(
                                                                    //         {
                                                                    //             emailErrors: false,
                                                                    //         }
                                                                    //     )
                                                                    // }
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    className={
                                                                        classes.saveBtn
                                                                    }
                                                                    size="small"
                                                                    type="submit"
                                                                >
                                                                    Save
                                                                </Button>
                                                            </AccordionActions>
                                                        </Accordion>
                                                    </form>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div className={classes.tabPanel}>
                                    <h1>Item two</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchoolsDetail

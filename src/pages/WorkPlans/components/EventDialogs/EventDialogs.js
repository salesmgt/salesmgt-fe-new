import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Icon,
    IconButton,
    FormControlLabel,
    Switch,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DateTimePicker } from 'mui-pickers-v3'
import { MdDelete } from 'react-icons/md'
import moment from 'moment'
// import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useToggle from '../../../../hooks/useToggle'
// import DateFnsUtils from '@date-io/date-fns'

const clientSchema = yup.object().shape({
    title: yup.string().trim().max(30).required(),
    remark: yup.string().trim().max(50).required(),
})

function EventDialogs() {
    const { register, handleSubmit, getValues, errors, setError } = useForm({
        resolver: yupResolver(clientSchema),
    })

    const [open, setOpen] = useToggle()

    const [selectedDate, setSelectedDate] = React.useState(
        new Date('2014-08-18T21:11:54')
    )

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Button variant="outlined" onClick={setOpen}>
                Open dialog
            </Button>
            <Dialog
                className=""
                open={open}
                onClose={setOpen}
                fullWidth
                maxWidth="xs"
                component="form"
            >
                <AppBar className="">
                    <Toolbar className="">
                        <Typography variant="subtitle1">New Event</Typography>
                    </Toolbar>
                </AppBar>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent className="">
                        <TextField
                            label="Title"
                            name="title"
                            className=""
                            variant="outlined"
                            autoFocus
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register}
                            error={!!errors.title}
                            helperText={errors?.title?.message}
                        />
                        <FormControlLabel
                            className=""
                            label="All Day"
                            control={
                                <Switch
                                    // checked={form.allDay}
                                    id="allDay"
                                    name="allDay"
                                // onChange={handleChange}
                                />
                            }
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                label="Start"
                                className=""
                                inputVariant="outlined"
                                value={selectedDate}
                                onChange={handleDateChange}
                            // value={form.start}
                            // onChange={(date) => setInForm('start', date)}
                            // maxDate={form.end}
                            />
                            <DateTimePicker
                                label="End"
                                className=""
                                inputVariant="outlined"
                                value={selectedDate}
                                onChange={handleDateChange}
                            // value={form.end}
                            // onChange={(date) => setInForm('end', date)}
                            // minDate={form.start}
                            />
                        </MuiPickersUtilsProvider>

                        <TextField
                            label="Remark"
                            name="remark"
                            className=""
                            variant="outlined"
                            fullWidth
                            inputRef={register}
                            error={!!errors.remark}
                            helperText={errors?.remark?.message}
                        />
                        <TextField
                            label="Description"
                            name="des"
                            className=""
                            variant="outlined"
                            type="text"
                            multiline
                            rows={5}
                            fullWidth
                            inputRef={register}
                        // error={!!errors.des}
                        // helperText={errors?.des?.message}
                        />
                    </DialogContent>
                    <DialogActions className="">
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                        <IconButton onClick="">
                            <Icon>
                                <MdDelete />
                            </Icon>
                        </IconButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default EventDialogs

import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import { MdLocationOn } from 'react-icons/md'
import Geocode from 'react-geocode'

function loadScript(src, position, id) {
    if (!position) {
        return
    }

    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('id', id)
    script.src = src
    position.appendChild(script)
}

const autocompleteService = { current: null }

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}))

export default function AddressField(props) {
    const classes = useStyles()
    const {
        inputValue,
        setInputValue,
        setLatitude,
        setLongitude,
        onBlur,
        // errText,
        error,
        helperText,
    } = props // , latitude, longitude,

    const [value, setValue] = React.useState(null)
    // const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([])
    const loaded = React.useRef(false)

    // console.log('API_key: ', process.env.REACT_APP_GOOGLE_KEY);
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)
    Geocode.setLanguage('vi')
    Geocode.setRegion('VN')
    Geocode.setLocationType('ROOFTOP')
    Geocode.enableDebug() // Enable or disable logs

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places&region=VN&language=vi`,
                document.querySelector('head'),
                'google-maps'
            )
        }

        loaded.current = true
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                // console.log('request: ', request);
                // console.log('callback: ', callback);
                autocompleteService.current.getPlacePredictions(
                    request,
                    callback
                )
            }, 200),
        []
    )

    // useEffect() này chỉ nhằm để giải quyết vụ set initValue cho value của Autocomplete
    // useEffect(() => {
    //     let active = true;
    //     fetch((inputValue), (results) => {
    //         if (active) {
    //             let newOptions = [];

    //             if (value) {
    //                 newOptions = [value];
    //             }
    //             if (results) {
    //                 newOptions = [...newOptions, ...results];
    //             }
    //             console.log('Init address = ', value);
    //             setOptions(newOptions);
    //         }
    //     });

    //     return () => {
    //         active = false;
    //     };
    // }, []);

    useEffect(() => {
        let active = true

        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService()
        }
        if (!autocompleteService.current) {
            return undefined
        }

        if (inputValue === '') {
            setOptions(value ? [value] : [])
            // console.log('Address = ', value);

            return undefined
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = []

                if (value) {
                    newOptions = [value]
                }

                if (results) {
                    // console.log('result = ', results);
                    newOptions = [...newOptions, ...results]
                }

                // console.log('Address = ', value);
                setOptions(newOptions)

                // Xử lý convert address qua [lat, long] rồi gửi xuống Back-end
                Geocode.fromAddress(inputValue).then(
                    (response) => {
                        const { lat, lng } =
                            response.results[0].geometry.location
                        setLatitude(lat)
                        setLongitude(lng)
                        // console.log('useEffect(): inputValue = ', inputValue);
                    },
                    (error) => {
                        console.error(error)
                    }
                )
            }
        })

        return () => {
            active = false
        }
    }, [value, inputValue, fetch])

    // console.log('Outside: inputValue = ', inputValue);
    // console.log('[latitude, longitude] = ', latitude, longitude);

    return (
        <Autocomplete
            autoComplete
            autoHighlight
            options={options}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterSelectedOptions
            filterOptions={(x) => x}
            includeInputInList
            noOptionsText="No matched address"
            openOnFocus={true}
            onBlur={onBlur}
            clearOnBlur={false}
            value={value}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options)
                setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            renderInput={(params) => (
                <TextField
                    value={inputValue}
                    {...params}
                    label="Address"
                    variant="outlined"
                    fullWidth
                    required
                    // error={errText ? true : false}
                    // helperText={errText ? errText : ''}
                    error={error ? true : false}
                    helperText={helperText ? helperText : ''}
                />
            )}
            renderOption={(option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [
                        match.offset,
                        match.offset + match.length,
                    ])
                )

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <MdLocationOn className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 600 : 400,
                                    }}
                                >
                                    {part.text}
                                </span>
                            ))}
                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }}
        />
    )
}

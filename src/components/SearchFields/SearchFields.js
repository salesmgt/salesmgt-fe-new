// Xem xem có cách nào dùng lại đc ko

import React, { useState, useRef } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import { MdSearch } from 'react-icons/md'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  search: {
    maxHeight: '2.5rem',
    position: 'relative',
    borderRadius: '8px',  //theme.shape.borderRadius
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px -6px #000',  // 0px 1px 1px gray
    marginLeft: 0,
    height: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1.3, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

SearchFields.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
}

SearchFields.defaultProps = {
  onChange: null,
}

function SearchFields(props) {
  const classes = useStyles()
  const typingTimeOutRef = useRef('')
  const { onChange, placeholder, searchValue } = props
  const [searchKey, setSearchKey] = useState(searchValue ? searchValue : '')

  const handleChange = (e) => {
    e.preventDefault(true);
    const keyword = e?.target?.value

    console.log('keyword: ', keyword);

    setSearchKey(keyword)
    if (!onChange) {
      return;
    }
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }
    
    typingTimeOutRef.current = setTimeout(() => {
      onChange(keyword)
    }, 300)
  }

  // console.log('SearchFields: searchKey = ', searchKey);
  
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <MdSearch fontSize='20' />
      </div>
      <InputBase
        value={searchKey}
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchFields;
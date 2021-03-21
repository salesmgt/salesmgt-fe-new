import * as Actions from './reducer-action-type'

export const FilterReducer = (state, action) => {
    const { type, payload } = action
    const { filterType, filterValue, columnName, direction } = payload
    const { listFilters, searchKey, sort, pages, limit } = state

    switch (type) {
        case Actions.ADD_SCHOOL_YEAR:
        case Actions.ADD_DISTRICT:
        case Actions.ADD_SCHOOL_TYPE:
        case Actions.ADD_SCHOOL_LEVEL:
        case Actions.ADD_SCHOOL_SCALE:
        case Actions.ADD_PIC:
        case Actions.ADD_PURPOSE:
        // case Actions.ADD_SEARCH_KEYWORD:
            return [...addItem(listFilters, filterType, filterValue)]      

        case Actions.REMOVE_SCHOOL_YEAR:
        case Actions.REMOVE_DISTRICT:
        case Actions.REMOVE_SCHOOL_TYPE:
        case Actions.REMOVE_SCHOOL_LEVEL:
        case Actions.REMOVE_SCHOOL_SCALE:
        case Actions.REMOVE_PIC:
        case Actions.REMOVE_PURPOSE:
        // case Actions.REMOVE_SEARCH_KEYWORD:
            return [...removeItem(listFilters, 'filterType', payload.filterType)]
    
        case Actions.SORT:
            // action.payload { columnName: , direction:  }
            return;
        
        default:
            throw new Error();
    }
}

// Add new filter into list and update duplicate item with the newest values
function addItem(listFilters, filterType, filterValue) {
    listFilters.forEach(filter => {
        if (filter.filterType === filterType) {
            // Remove duplicate filters out of listFilters
            listFilters = [...removeItem(listFilters, 'filterType', filterType)]
        }
    })
    // Add new filter value
    listFilters = [...listFilters, { filterType: filterType, filterValue: filterValue }]
    return listFilters;
}

// Remove an object in array of object based on its attribute name and value
function removeItem(listFilters, attributeName, attributeValue) {
  let index = listFilters.length;
    while (index--) {
        if (listFilters[index]
            && listFilters[index].hasOwnProperty(attributeName)
            && (arguments.length > 2 && listFilters[index][attributeName] === attributeValue)) {
                listFilters.splice(index, 1);
            }
    }
    return listFilters;
}
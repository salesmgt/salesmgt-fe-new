import * as FilterActions from './reducer-action-type'

export const FilterReducer = (listFilters, action) => {
    const { type, payload } = action
    switch (type) {
        case FilterActions.ADD_FILTER_SCHOOL_YEAR:
        case FilterActions.ADD_FILTER_DISTRICT:
        case FilterActions.ADD_FILTER_SCHOOL_TYPE:
        case FilterActions.ADD_FILTER_SCHOOL_LEVEL:
        case FilterActions.ADD_FILTER_SCHOOL_SCALE:
        case FilterActions.ADD_FILTER_PIC:
        case FilterActions.ADD_FILTER_PURPOSE:
            return [...addItem(listFilters, payload.filterType, payload.filterValue)]      

        case FilterActions.REMOVE_FILTER_SCHOOL_YEAR:
        case FilterActions.REMOVE_FILTER_DISTRICT:
        case FilterActions.REMOVE_FILTER_SCHOOL_TYPE:
        case FilterActions.REMOVE_FILTER_SCHOOL_LEVEL:
        case FilterActions.REMOVE_FILTER_SCHOOL_SCALE:
        case FilterActions.REMOVE_FILTER_PIC:
        case FilterActions.REMOVE_FILTER_PURPOSE:
            return [...removeItem(listFilters, 'filterType', payload.filterType)]
    
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

//========================Code lần thử đầu tiên========================
// export const FilterReducer = (listFilters, action) => {
//     const { type, payload } = action
//     switch (type) {
//         case FilterActions.ADD_FILTER_SCHOOL_YEAR:
//             return [...listFilters, addItem('schoolYear', payload.schoolYear)]
        
//         case FilterActions.REMOVE_FILTER_SCHOOL_YEAR:
//             return [...removeItem(listFilters, 'schoolYear', payload.schoolYear)]

//         case FilterActions.ADD_FILTER_DISTRICT:
//             return [...listFilters, addItem('district', payload.district)]
        
//         case FilterActions.REMOVE_FILTER_DISTRICT:
//             return [...removeItem(listFilters, 'district', payload.district)]

//         case FilterActions.ADD_FILTER_SCHOOL_TYPE:
//             return [...listFilters, addItem('schoolType', payload.schoolType)]

//         case FilterActions.REMOVE_FILTER_SCHOOL_TYPE:
//             return [...removeItem(listFilters, 'schoolType', payload.schoolType)]

//         case FilterActions.ADD_FILTER_SCHOOL_LEVEL:
//             return [...listFilters, addItem('schoolLevel', payload.schoolLevel)]
        
//         case FilterActions.REMOVE_FILTER_SCHOOL_LEVEL:
//             return [...removeItem(listFilters, 'schoolLevel', payload.schoolLevel)]
        
//         case FilterActions.ADD_FILTER_SCHOOL_SCALE:
//             return [...listFilters, addItem('schoolScale', payload.schoolScale)]
        
//         case FilterActions.REMOVE_FILTER_SCHOOL_SCALE:
//             return [...removeItem(listFilters, 'schoolScale', payload.schoolScale)]
        
//         case FilterActions.ADD_FILTER_PIC:
//             return [...listFilters, addItem('PIC', payload.PIC)]
        
//         case FilterActions.REMOVE_FILTER_PIC:
//             return [...removeItem(listFilters, 'PIC', payload.PIC)]
        
//         case FilterActions.ADD_FILTER_PURPOSE:
//             return [...listFilters, addItem('purpose', payload.purpose)]
        
//         case FilterActions.REMOVE_FILTER_PURPOSE:
//             return [...removeItem(listFilters, 'purpose', payload.purpose)]
        
//         case FilterActions.ADD_FILTER_SEARCH_KEYWORD:
//             return [...listFilters, addItem('searchKey', payload.searchKey)]
        
//         case FilterActions.REMOVE_FILTER_SEARCH_KEYWORD:
//             return [...removeItem(listFilters, 'searchKey', payload.searchKey)]
    
//         default:
//             throw new Error();
//     }
// }

// function addItem(filterType, filterValue) {
//     return { key: filterType, value: filterValue }
// }
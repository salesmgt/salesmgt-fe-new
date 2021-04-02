import * as Actions from './reducer-action-type'

export const TargetSchoolReducer = (params, action) => {
    // const [listFilters, dispatchFilters] = useReducer(FilterReducer, [])
    const { type, payload } = action
    const { filterType, filterValue, paramName, paramValue, columnName, direction } = payload
    
    // Destructing dần dần để quy định đc cái bên trong 
    let { listFilters, searchKey, sorting, paging } = params


    switch (type) {
        case Actions.ADD_FILTER_SCHOOL_YEAR:
        case Actions.ADD_FILTER_DISTRICT:
        case Actions.ADD_FILTER_SCHOOL_TYPE:
        case Actions.ADD_FILTER_SCHOOL_LEVEL:
        case Actions.ADD_FILTER_SCHOOL_SCALE:
        case Actions.ADD_FILTER_PIC:
        case Actions.ADD_FILTER_PURPOSE:
            listFilters = [...addFilter(listFilters, filterType, filterValue)];
            return {...params, listFilters: listFilters}
            // return addParam(params, 'listFilters', listFilters)

        case Actions.REMOVE_FILTER_SCHOOL_YEAR:
        case Actions.REMOVE_FILTER_DISTRICT:
        case Actions.REMOVE_FILTER_SCHOOL_TYPE:
        case Actions.REMOVE_FILTER_SCHOOL_LEVEL:
        case Actions.REMOVE_FILTER_SCHOOL_SCALE:
        case Actions.REMOVE_FILTER_PIC:
        case Actions.REMOVE_FILTER_PURPOSE:
            listFilters = [...removeFilter(listFilters, 'filterType', filterType)]
            return {...params, listFilters: listFilters}
        
        case Actions.ENTER_SEARCH_KEYWORD:
            return {...params, searchKey: paramValue}

    
        case Actions.SORT_BY:
            // action.payload { columnName: , direction:  }
            return;
        
        default:
            return params;
    }
}

// Add new filter into list and update duplicate item with the newest values
function addFilter(listFilters, filterType, filterValue) {
    listFilters.forEach(filter => {
        if (filter.filterType === filterType) {
            // Remove duplicate filters
            listFilters = [...removeFilter(listFilters, 'filterType', filterType)]
        }
    })
    // Add new filter
    listFilters = [...listFilters, { filterType: filterType, filterValue: filterValue }]
    return listFilters;
}

// Remove an object in array of object based on its attribute name and value
function removeFilter(listFilters, attributeName, attributeValue) {
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

// Add new param into list and update duplicate item with the newest values
// function addParam(params, listFilters, paramValue) {
//     // ({ listFilters, ...params } = { paramValue: paramValue, ...params })
//     const newParams = {...params, listFilters: paramValue}
//     // console.log('paramValue: ', paramValue)
//     // console.log('........', { listFilters, ...params })

//     // params.forEach(param => {
//     //     console.log('ppppppppppp: ', param)
//     //     if (param.paramName === paramName) {
//     //         // Remove duplicate params
//     //         params = [...removeParam(params, 'paramName', paramName)]
//     //     }
//     // })
//     // Add new param
//     // params = [...params, { paramName: paramName, paramValue: paramValue }]
//     return newParams;
// }

// Remove an object in array of object based on its attribute name and value
// function removeParam(params, attributeName, attributeValue) {
//   let index = params.length;
//     while (index--) {
//         if (params[index]
//             && params[index].hasOwnProperty(attributeName)
//             && (arguments.length > 2 && params[index][attributeName] === attributeValue)) {
//                 params.splice(index, 1);
//             }
//     }
//     return params;
// }
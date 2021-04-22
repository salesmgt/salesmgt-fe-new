// Remove an object in array of object based on its attribute name and value
export function removeItem(array, attributeName, attributeValue) {
    let index = array.length;
    while (index--) {
        if (array[index]
            && array[index].hasOwnProperty(attributeName)
            && (arguments.length > 2 && array[index][attributeName] === attributeValue)) {
            array.splice(index, 1);
        }
    }
    return array;
}

// Check duplicate item in array
// export const checkDuplicate = (array, newItemID) => {
//     array.forEach(item => {
//         if (item.id === newItemID)
//             return true;
//     });
//     return false;
// }
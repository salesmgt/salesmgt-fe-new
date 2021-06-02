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

export function chunkArray(bigArray, chunkSize) {
    let newArray = [];
    for (let i = 0; i < bigArray.length; i += chunkSize) {
        newArray.push(bigArray.slice(i, i + chunkSize));
    }
    return newArray;
}

// Check duplicate item in array
// export const checkDuplicate = (array, newItemID) => {
//     array.forEach(item => {
//         if (item.id === newItemID)
//             return true;
//     });
//     return false;
// }
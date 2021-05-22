export const suggestPrice = (inputPrice, setPriceSuggestions) => {
    console.log('suggestPrice() - inputPrice = ', inputPrice);
    let suggestOptions = []
    setPriceSuggestions([])

    if (inputPrice > 0 && inputPrice < 10) {
        console.log('0 < inputPrice < 10');
        suggestOptions.push(inputPrice * 100000)
        if ((inputPrice * 1000000) <= 5000000) {
            suggestOptions.push(inputPrice * 1000000)
        }
        suggestOptions.push(5000000)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 10 && inputPrice < 100) {
        console.log('10 <= inputPrice < 100');
        suggestOptions.push(inputPrice * 10000)
        if ((inputPrice * 100000) <= 5000000) {
            suggestOptions.push(inputPrice * 100000)
        }
        suggestOptions.push(5000000)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 100 && inputPrice < 1000) {
        console.log('100 < inputPrice <= 1000');
        suggestOptions.push(inputPrice * 1000)
        if ((inputPrice * 10000) <= 5000000) {
            suggestOptions.push(inputPrice * 10000)
        }
        suggestOptions.push(5000000)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 1000 && inputPrice < 10000) {
        console.log('1000 < inputPrice <= 10.000');
        const firstThreeDigits = parseInt(String(inputPrice).substring(0, 3))
        suggestOptions.push(firstThreeDigits * 1000)
        if ((inputPrice * 1000) <= 5000000) {
            suggestOptions.push(inputPrice * 1000)
        }
        suggestOptions.push(5000000)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 10000 && inputPrice < 50000) {
        console.log('10.000 < inputPrice <= 50.000');
        const firstThreeDigits = parseInt(String(inputPrice).substring(0, 3))
        const firstFourDigits = parseInt(String(inputPrice).substring(0, 4))
        suggestOptions.push(firstThreeDigits * 1000)
        if ((firstFourDigits * 1000) <= 5000000) {
            suggestOptions.push(firstFourDigits * 1000)
        }
        suggestOptions.push(5000000)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 50000) {
        console.log('inputPrice > 50.000');
        const firstDigit = parseInt(String(inputPrice).charAt(0))
        const firstThreeDigits = parseInt(String(inputPrice).substring(0, 3))
        const firstFourDigits = parseInt(String(inputPrice).substring(0, 4))
        if (firstDigit > 5) {
            suggestOptions.push(5000000)
            suggestOptions.push(firstThreeDigits * 1000)
            suggestOptions.push(firstDigit * 100000)
        } else {
            suggestOptions.push(5000000)
            suggestOptions.push(firstFourDigits * 1000)
            suggestOptions.push(firstDigit * 1000000)
        }
        setPriceSuggestions(suggestOptions)
    }
    else {     // inputPrice === undefined (NaN), inputPrice <= 0
        suggestOptions.push(1000000)
        suggestOptions.push(1500000)
        suggestOptions.push(2000000)
        setPriceSuggestions(suggestOptions)
    }
}
const MAX_PRICE = 2000000
export const suggestPrice = (inputPrice, setPriceSuggestions) => {
    // console.log('suggestPrice() - inputPrice = ', inputPrice);
    let suggestOptions = []
    setPriceSuggestions([])

    if (inputPrice > 0 && inputPrice < 10) {
        alert(inputPrice)
        suggestOptions.push(inputPrice * 100000)
        if ((inputPrice * 1000000) <= MAX_PRICE) {
            suggestOptions.push(inputPrice * 1000000)
        }
        suggestOptions.push(MAX_PRICE)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 10 && inputPrice < 100) {
        console.log('10 <= inputPrice < 100');
        suggestOptions.push(inputPrice * 10000)
        if ((inputPrice * 100000) <= MAX_PRICE) {
            suggestOptions.push(inputPrice * 100000)
        }
        suggestOptions.push(MAX_PRICE)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 100 && inputPrice < 1000) {
        console.log('100 < inputPrice <= 1000');
        suggestOptions.push(inputPrice * 1000)
        if ((inputPrice * 10000) <= MAX_PRICE) {
            suggestOptions.push(inputPrice * 10000)
        }
        suggestOptions.push(MAX_PRICE)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 1000 && inputPrice < 10000) {
        console.log('1000 < inputPrice <= 10.000');
        const firstThreeDigits = parseInt(String(inputPrice).substring(0, 3))
        suggestOptions.push(firstThreeDigits * 1000)
        if ((inputPrice * 1000) <= MAX_PRICE) {
            suggestOptions.push(inputPrice * 1000)
        }
        suggestOptions.push(MAX_PRICE)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 10000 && inputPrice < 20000) {
        console.log('10.000 < inputPrice <= 20.000');
        const firstThreeDigits = parseInt(String(inputPrice).substring(0, 3))
        const firstFourDigits = parseInt(String(inputPrice).substring(0, 4))
        suggestOptions.push(firstThreeDigits * 1000)
        if ((firstFourDigits * 1000) <= MAX_PRICE) {
            suggestOptions.push(firstFourDigits * 1000)
        }
        suggestOptions.push(MAX_PRICE)
        setPriceSuggestions(suggestOptions)
    }
    else if (inputPrice >= 20000) {
        console.log('inputPrice > 20.000');
        const firstDigit = parseInt(String(inputPrice).charAt(0))
        const firstThreeDigits = parseInt(String(inputPrice).substring(0, 3))
        const firstFourDigits = parseInt(String(inputPrice).substring(0, 4))
        if (firstDigit > 2) {
            suggestOptions.push(firstDigit * 100000)
            if ((firstDigit * 100000) !== (firstThreeDigits * 1000)) {
                suggestOptions.push(firstThreeDigits * 1000)
            }
            suggestOptions.push(MAX_PRICE)
        } else if (firstDigit === 2) {
            suggestOptions.push(firstDigit * 100000)
            if ((firstDigit * 100000) !== (firstThreeDigits * 1000)) {
                suggestOptions.push(firstThreeDigits * 1000)
            }
            suggestOptions.push(MAX_PRICE)
        } else if (firstDigit === 1) {
            suggestOptions.push(firstDigit * 100000)
            if ((firstDigit * 100000) !== (firstFourDigits * 1000)) {
                suggestOptions.push(firstFourDigits * 1000)
            }
            suggestOptions.push(MAX_PRICE)
        }
        setPriceSuggestions(suggestOptions)
    }
    else {     // inputPrice === undefined (NaN), inputPrice <= 0
        suggestOptions.push(1000000)
        suggestOptions.push(1500000)
        suggestOptions.push(MAX_PRICE)
        setPriceSuggestions(suggestOptions)
    }
}
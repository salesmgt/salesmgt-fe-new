export function setWithExpiry(key, value, ttl) {
    const now = new Date()

    const item = {
        value: value,
        expiry: now.getTime() + ttl * 60 * 60 * 1000,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key) {
    const itemStr = sessionStorage.getItem(key)

    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
        sessionStorage.removeItem(key)
        return null
    }
    return item.value
}

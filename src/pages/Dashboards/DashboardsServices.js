import Api from '../../services/Api'

export async function getDashboards(type, name) {
    let url = `/dashboard?type=${type}`
    url = name ? url.concat(`&name=${name}`) : url

    const response = await Api.get(url)
    const data = await response.data
    return data
}
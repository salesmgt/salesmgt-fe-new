// import _ from 'lodash'
const errors = [
    {
        code: '404',
        message: 'Sorry, we could not find that page!',
        link: '/apps/dashboards',
        des: 'Go back to Dashboards',
    },
    {
        code: '500',
        message: 'Well, you broke the Internet!',
        link: '/apps/dashboards',
        des: 'Go back to Dashboards',
    },
]

function getError(code) {
    const result = errors.filter((error) => error.code === code)
    return result
}

export { getError }

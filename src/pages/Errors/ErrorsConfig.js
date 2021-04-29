const errors = [
    {
        code: 400,
        message: 'What is this? Is it a cake?',
        link: '',
        des: 'Go back',
    },
    {
        code: 401,
        message: 'Who are you now?',
        link: '/',
        des: 'Go back',
    },
    {
        code: 403,
        message: 'Sorry, this is THAT restricted area!',
        link: '/',
        des: 'Go back',
    },
    {
        code: 404,
        message: 'Sorry, we could not find that page!',
        link: '',
        des: 'Go back',
    },
    {
        code: 500,
        message: 'Well, you broke the Internet!',
        link: '',
        des: 'Go back',
    },
]

export function getError(code) {
    const result = errors.filter((error) => error.code === code)
    return result
}

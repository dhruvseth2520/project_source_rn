export const getThreads = () => {
    return [...threads]
}

export const getThreadById = (threadId) => {
    return {...threads.find((thread) => thread._id == threadId)}
}

export const getMessagesByThreadId = (threadId) => {
    return [...threads.find((thread) => thread._id == threadId).MESSAGES]
}

export const updateThreadById = (threadId, newThread) => {
    const index = threads.findIndex(thread => thread._id == threadId)
    threads[index] = newThread
}

export const updateMessagesByThreadId = (threadId, newMessages) => {
    const index = threads.findIndex(thread => thread._id == threadId)
    threads[index].MESSAGES = newMessages
}

export const updateThreadAsRead = (userId, threadId) => {
    const index = threads.findIndex(thread => thread._id == threadId)
    const copyOfThread = {...threads[index]}
    const newUnreadBy = copyOfThread.unreadBy.filter((user) => user != userId)
    copyOfThread.unreadBy = newUnreadBy
    threads[index] = copyOfThread
}


const threads = [
    {
        _id: 'kfwy34ufgnj4oivjv9n2ilkf2kgjgklj',
        createdAt: new Date("2020-09-07T22:54:00-06:30"),
        threadType: '1on1',
        unreadBy: ['64dhruv'],
        members: [
            {
                _id: '64dhruv',
                name: 'Dhruv',
                avatar: 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/15776868_1410970445593491_2341491425767806790_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=m4GCiM_MEDwAX_sNdMb&_nc_oc=AQmoFtOxjdy3DPmUOu2MMLbDGoaSsucFaqzGvwjQ5hPvHNiHYRXfH6qBFAo48vXYfBM&_nc_ht=scontent.fphl2-4.fna&oh=be8339c6eb02969a8214d84ba432e768&oe=5F74B743'
            },
            {
                _id: '64anthony',
                name: 'Anthony',
                avatar: 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/p960x960/23916454_10210562933285216_5634471730128896697_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=NzjN7IrihegAX_sC8BO&_nc_ht=scontent.fphl2-4.fna&tp=6&oh=dc143c6d46fda57a91ddbff666bc2772&oe=5F750783'
            }
        ],
        MESSAGES: [
            {
                _id: 'be3c0d09-2040-464b-b31b-fafb778c798b',
                createdAt: new Date("2020-09-08T22:54:00-06:30"),
                text: "Sup?",
                user: {
                    _id: '64dhruv',
                    Name: 'Dhruv',
                    avatar: 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/15776868_1410970445593491_2341491425767806790_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=m4GCiM_MEDwAX_sNdMb&_nc_oc=AQmoFtOxjdy3DPmUOu2MMLbDGoaSsucFaqzGvwjQ5hPvHNiHYRXfH6qBFAo48vXYfBM&_nc_ht=scontent.fphl2-4.fna&oh=be8339c6eb02969a8214d84ba432e768&oe=5F74B743'
                }
            },
            {
                _id: 'jdfwejfnrkwmvrkembvcdslvm',
                createdAt: new Date("2020-09-08T21:45:00-06:30"),
                text: "Hello",
                user: {
                    _id: '64anthony',
                    name: 'Anthony',
                    avatar: "https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/p960x960/23916454_10210562933285216_5634471730128896697_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=NzjN7IrihegAX_sC8BO&_nc_ht=scontent.fphl2-4.fna&tp=6&oh=dc143c6d46fda57a91ddbff666bc2772&oe=5F750783"
                }
            },
            {
                _id: 'jdfwejfnyuwmvrkembvcdslvm',
                createdAt: new Date("2020-09-08T20:15:00-06:30"),
                text: "New room created",
                system: true
            },
        ]
    },
    {
        _id: 'kfwy34ufgnjklivjv9n2ilkf2kgjgklj',
        createdAt: new Date("2020-09-07T22:54:00-06:30"),
        threadType: '1on1',
        unreadBy: [],
        members: [
            {
                _id: '64dhruv',
                name: 'Dhruv',
                avatar: 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/15776868_1410970445593491_2341491425767806790_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=m4GCiM_MEDwAX_sNdMb&_nc_oc=AQmoFtOxjdy3DPmUOu2MMLbDGoaSsucFaqzGvwjQ5hPvHNiHYRXfH6qBFAo48vXYfBM&_nc_ht=scontent.fphl2-4.fna&oh=be8339c6eb02969a8214d84ba432e768&oe=5F74B743'
            },
            {
                _id: '64anthony',
                name: 'Anthony',
                avatar: 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/p960x960/23916454_10210562933285216_5634471730128896697_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=NzjN7IrihegAX_sC8BO&_nc_ht=scontent.fphl2-4.fna&tp=6&oh=dc143c6d46fda57a91ddbff666bc2772&oe=5F750783'
            }
        ],
        MESSAGES: [
            {
                _id: 'jdfwejfnrkwmvjkgembvcdslvm',
                createdAt: new Date("2020-09-08T22:54:00-06:30"),
                text: "Sup?",
                user: {
                    _id: '64dhruv',
                    Name: 'Dhruv',
                    avatar: 'https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/15776868_1410970445593491_2341491425767806790_o.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=m4GCiM_MEDwAX_sNdMb&_nc_oc=AQmoFtOxjdy3DPmUOu2MMLbDGoaSsucFaqzGvwjQ5hPvHNiHYRXfH6qBFAo48vXYfBM&_nc_ht=scontent.fphl2-4.fna&oh=be8339c6eb02969a8214d84ba432e768&oe=5F74B743'
                }
            },
            {
                _id: 'jdfwejfnrkwmvrkembvcdslvm',
                createdAt: new Date("2020-09-08T21:45:00-06:30"),
                text: "Hello",
                user: {
                    _id: '64anthony',
                    name: 'Anthony',
                    avatar: "https://scontent.fphl2-4.fna.fbcdn.net/v/t31.0-8/p960x960/23916454_10210562933285216_5634471730128896697_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=NzjN7IrihegAX_sC8BO&_nc_ht=scontent.fphl2-4.fna&tp=6&oh=dc143c6d46fda57a91ddbff666bc2772&oe=5F750783"
                }
            },
            {
                _id: 'jdfwejfnyuwmvrkembvcdslvm',
                createdAt: new Date("2020-09-08T20:15:00-06:30"),
                text: "New room created",
                system: true
            },
        ]
    }
]
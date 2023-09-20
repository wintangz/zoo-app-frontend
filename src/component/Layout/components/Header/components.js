export const components = [
    {
        name: 'Home',
        path: '/#',
    },
    {
        name: 'Services',
        path: '/services',
        sub: [
            {
                name: 'Services1',
                path: '/services1',
            },
            {
                name: 'Services2',
                path: '/services2',
            },
            {
                name: 'Services3',
                path: '/services3',
            },
        ],
    },
    {
        name: 'Know the zoo',
        path: '/knowthezoo',
        sub: [
            {
                name: 'Know the zoo1',
                path: '/knowthezoo1',
            },
            {
                name: 'Know the zoo2',
                path: '/knowthezoo2',
            },
        ],
    },
    {
        name: 'Gallery',
        path: '/Gallery',
    },
    {
        name: 'Blog',
        path: '/blog',
        sub: [
            {
                name: 'Blog1',
                path: '/blog1',
            },
            {
                name: 'Blog2',
                path: '/blog2',
            },
        ],
    },
];

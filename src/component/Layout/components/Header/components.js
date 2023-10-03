export const components = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'News',
        path: '/news',
    },
    {
        name: 'Explore',
        sub: [
            {
                name: 'Animals',
                path: '/animals/1'
            },
            {
                name: 'Habitats',
                path: '/habitats'
            },
            {
                name: 'Zoo Map',
                path: '/maps',
            },

        ]
    },
    {
        name: 'Ticket',
        path: '/ticket',
    },
    {
        name: 'About',
        path: '/about',
    },

    // {
    //     name: 'Services',
    //     sub: [
    //         {
    //             name: 'Buy Ticket',
    //             path: '/buy',
    //         },
    //         {
    //             name: 'Home',
    //             path: '/',
    //         },
    //         {
    //             name: 'Services3',
    //             path: '/service',
    //         },
    //     ],
    // },
    // {
    //     name: 'Know the zoo',
    //     sub: [
    //         {
    //             name: 'Know the zoo1',
    //             path: '/knowthezoo1',
    //         },
    //         {
    //             name: 'Know the zoo2',
    //             path: '/knowthezoo2',
    //         },
    //     ],
    // },
    // {
    //     name: 'Gallery',
    //     path: '/Gallery',
    // },
    // {
    //     name: 'Blog',
    //     sub: [
    //         {
    //             name: 'Blog1',
    //             path: '/blog1',
    //         },
    //         {
    //             name: 'Blog2',
    //             path: '/blog2',
    //         },
    //     ],
    // },
];

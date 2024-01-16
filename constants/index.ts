export const headerLinks = [
    {
        id: 'home-link',
        label: 'Home',
        route: '/',
    },
    {
        id: 'create-event-link',
        label: 'Create Event',
        route: '/events/create',
    },
    {
        id: 'my-profile-link',
        label: 'My Profile',
        route: '/profile',
    },
]

export const socialsFooter = [
    {
        rel: 'noopener noreferrer',
        href: '#',
        label: 'Instagram',
    },
    {
        rel: 'noopener noreferrer',
        href: '#',
        label: 'Facebook',
    },
    {
        rel: 'noopener noreferrer',
        href: '#',
        label: 'Twitter',
    }
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}
import ticket_1 from '~/assets/img/ticket-1.png'
import ticket_2 from '~/assets/img/ticket-2.png'
import ticket_3 from '~/assets/img/ticket-3.png'

export const tickets = [
    { id: 't1', name: 'Adult', price: 60000, priceLabel: '60.000', info: ' - aged from 16 - ', img: ticket_1 },
    { id: 't2', name: 'Children', price: 40000, priceLabel: '40.000', info: ' - aged 4 to 16 - ', img: ticket_2 },
    { id: 't3', name: 'Children', price: 0, priceLabel: 'Free', info: ' - aged under 4 - ', img: ticket_3 },
]


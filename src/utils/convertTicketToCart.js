/** 
@param {Object[]} tickets - The ticket list
*/
export const convertTicketToCart = (tickets) => {
    return tickets.map(ticket => ({
        ...ticket,
        quantity: 0, totalItemPrice: 0
    }))
}
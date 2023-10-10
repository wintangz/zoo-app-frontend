/** 
@param {Object[]} tickets - The ticket list
*/
export const convertTicketToCart = (tickets) => {
    if (tickets != null) {
        return tickets.map(ticket => ({
            ...ticket,
            quantity: 0, totalItemPrice: 0
        }))
    }
}
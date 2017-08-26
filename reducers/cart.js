export default function locations(cart = {}, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            debugger;
        return cart;
        default:
            return cart;
    }
}
import { actionTypes, CartItemI, ItemI } from "../utils/types";

export const setItems = (result: ItemI[])  => ({
    type: actionTypes.SET_ITEMS,
    payload: result
});

export const setCartItems = (result: CartItemI[])  => ({
    type: actionTypes.SET_CART_ITEMS,
    payload: result
});

export const updateCartItemQuantity = (id: number, quantity: number)  => ({
    type: actionTypes.UPDATE_ITEM_QUANTITY,
    id, quantity
});

export const setTotalPrice = () => ({
    type: actionTypes.SET_TOTAL_PRICE,
});
import { actionTypes, AppStateI } from "../utils/types";
import {AnyAction} from "redux";

const initialState: AppStateI = {
    items: [],
    cartItems: [],
    totalPrice: 0
};

const reducer = (state = initialState, action: AnyAction): AppStateI => {
    switch (action.type) {
        case actionTypes.SET_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        case actionTypes.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case actionTypes.UPDATE_ITEM_QUANTITY:
            const updatedCart = state.cartItems.map((item) => {
                if (item.id === action.id) {
                  return { ...item, quantity: action.quantity };
                }
                return item;
            });
            return { ...state, cartItems: updatedCart };
        case actionTypes.SET_TOTAL_PRICE:
            const items = state.cartItems;
            let total = 0;

            for(let item of items) {
                total += item.price * item.quantity;
            };
            return {
                ...state,
                totalPrice: total,
            };
        default:
            return state;
    };
};

export default reducer;
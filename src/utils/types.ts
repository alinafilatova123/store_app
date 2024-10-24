
export interface CategoryI {
    creationAt: Date;
    id: number;
    image: string;
    name: string;
    updatedAt: Date;
};

export interface ItemI {
    id: number;
    images: string[];
    title: string;
    price: number;
    category: CategoryI;
    updatedAt: Date;
    description: string;
};

export interface CartItemI extends ItemI {
    quantity: number;
};

export interface AppStateI {
    items: ItemI[];
    cartItems: CartItemI[];
    totalPrice: number;
};

export enum actionTypes {
    SET_ITEMS = 'items/SET_ITEMS',
    SET_CART_ITEMS = 'items/SET_CART_ITEMS',
    UPDATE_ITEM_QUANTITY = 'items/UPDATE_ITEM_QUANTITY',
    SET_TOTAL_PRICE = 'items/SET_TOTAL_PRICE'
};
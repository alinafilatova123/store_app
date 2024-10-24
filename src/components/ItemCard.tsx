import {
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions, 
    Button,
    Box
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { setCartItems } from '../redux/actions';
import { ItemI, CartItemI } from '../utils/types';
import { useAppDispatch } from '../utils/hooks';

interface PropsI {
    item: ItemI;
    cartItems: CartItemI[];
    handleOpen: () => void;
}

const ItemCard:FC<PropsI> = ({item, cartItems, handleOpen}) => {
    const [isInCart, setIsInCart] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const inCart = !!cartItems.find(cartItem => cartItem.id === item.id);
        setIsInCart(inCart);
    }, []);

    const itemAction = () => {
        if (isInCart) {
            const newCartData = cartItems.filter(cartItem => cartItem.id !== item.id);
            dispatch(setCartItems(newCartData));
            setIsInCart(false);
        }
        else {
            const newItem = {...item, quantity: 1};
            dispatch(setCartItems([...cartItems, newItem]));
            setIsInCart(true);
            handleOpen();
        };
    };

    return (
        <Card 
            sx={{ 
                width: '100%',
                maxWidth: '366px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
            }} 
            variant="outlined"
        >
            <Box>
                <CardMedia
                    sx={{ minHeight: 300, maxHeight: 300 }}
                    image={item.images[0]}
                    title="itemImg"
                />
                <CardContent>
                    <Typography gutterBottom variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        $ {item.price}
                    </Typography>
                </CardContent>
            </Box>

            <CardActions>
                <Button variant="outlined" size="small" onClick={() => itemAction()}>
                    {isInCart ? "Удалить из корзины" : "Добавить в корзину"}
                </Button>
            </CardActions>
        </Card>
    )
};

export default ItemCard;
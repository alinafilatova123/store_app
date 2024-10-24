import {
    Box,
    Container,
    Typography,
    Button,
    Alert
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { Fragment } from 'react/jsx-runtime';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setCartItems, setTotalPrice } from '../redux/actions';
import { AppStateI, CartItemI } from '../utils/types';
import CartItem from '../components/CartItem';
import { useAppDispatch } from '../utils/hooks';

interface PropsI {
    cartItems: CartItemI[];
    totalPrice: number;
}

const CartPage:FC<PropsI> = ({cartItems, totalPrice}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const goBackHandler = () => {
        window.history.go(-1)
    };

    const deleteItem = useCallback((id:number) => {
        const newData = cartItems.filter((item) => item.id !== id);
        dispatch(setCartItems(newData));
        handleOpen()
    }, [cartItems]);

    useEffect(() => {
        dispatch(setTotalPrice())
    }, [cartItems]);

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 6, gap: 4 }}
        >
            <Button 
                variant="outlined" 
                sx={{maxWidth: 'fit-content'}} 
                startIcon={<KeyboardBackspaceIcon />} 
                onClick={goBackHandler}
            >
                Назад
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Корзина
                </Typography>
                {cartItems.length > 0 ? cartItems.map((item) => (
                    <Fragment key={item.id}>
                        <CartItem 
                            item={item} 
                            quantity={item.quantity}
                            deleteItem={deleteItem} 
                        />
                    </Fragment>
                )): <Typography variant="body2">Корзина пуста :(</Typography>}

                <>
                    <Typography variant="body1">Итого: ${totalPrice}</Typography>
                    <Button
                        disabled={cartItems.length === 0}
                        variant="contained"
                    >
                        Оформить заказ
                    </Button>
                </>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Товар удален из корзины!
                </Alert>
            </Snackbar>
        </Container>
    )
}

const mapStateToProps = (state: AppStateI) => ({
    cartItems: state.cartItems,
    totalPrice: state.totalPrice
});

export default connect(mapStateToProps)(memo(CartPage));
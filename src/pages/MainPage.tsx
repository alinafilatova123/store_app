import {
    Box,
    Container,
    Typography,
    Alert
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Snackbar from '@mui/material/Snackbar';

import { FC, Fragment, memo, useCallback, useEffect, useState } from "react"
import axios from 'axios';
import {connect} from 'react-redux';

import { setItems } from '../redux/actions';
import { apiUrl } from '../utils/api';
import Search from '../components/Search';
import ItemCard from '../components/ItemCard';
import Cart from '../components/Cart';
import { debounce } from '../utils/debounce';
import { AppStateI, CartItemI, ItemI } from '../utils/types';
import { useAppDispatch } from '../utils/hooks';

interface PropsI {
    items: ItemI[];
    cartItems: CartItemI[];
}

const MainPage:FC<PropsI> = ({items, cartItems}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleClose = () => setOpen(false);
    const handleOpen = useCallback(() => setOpen(true), []);

    const fetchData = () => {
        axios.get(`${apiUrl}/products?offset=0&limit=20`)
            .then(res => dispatch(setItems(res.data)))
    };

    const filterData = (text:string = '') => {
        axios.get(`${apiUrl}/products/?title=${text}`)
            .then(res => dispatch(setItems(res.data)))
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateDebounceText(e.target.value);
    }, [])

    const updateDebounceText = debounce((text) => {
        filterData(text)
    });

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 6, gap: 4 }}
        >
            <Cart itemsCount={cartItems.length}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Товары
                </Typography>
                <Search onChangeHandler={onChangeHandler}/>
                <Grid container spacing={3}>
                    {items.length > 0 ? items.map(item => (
                            <Fragment key={item.id}>
                                <ItemCard 
                                    item={item} 
                                    cartItems={cartItems}
                                    handleOpen={handleOpen}
                                />
                            </Fragment>
                        )) 
                        : <Typography variant="body2"> Товары не найдены. </Typography>
                    }
                </Grid>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Товар добавлен в корзину!
                </Alert>
            </Snackbar>
        </Container>
    )
};

const mapStateToProps = (state: AppStateI) => ({
    items: state.items,
    cartItems: state.cartItems
});

export default connect(mapStateToProps)(memo(MainPage));
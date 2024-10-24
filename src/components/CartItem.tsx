import {
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    CardActions, 
    Button,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FC, useEffect, useState } from 'react';

import { ItemI } from '../utils/types';
import { updateCartItemQuantity } from '../redux/actions';
import { useAppDispatch } from '../utils/hooks';

interface PropsI {
    item: ItemI;
    deleteItem: (id:number) => void;
    quantity: number;
}

const CartItem:FC<PropsI> = ({item, deleteItem, quantity}) => {
    const [itemQuantity, setItemQuantity] = useState<number>(quantity);
    const dispatch = useAppDispatch();

    const increaseQuantity = () => setItemQuantity(prev => prev+=1);
    const decreaseQuantity = () => setItemQuantity(prev => prev-=1);

    useEffect(() => {
        dispatch(updateCartItemQuantity(item.id, itemQuantity));
    }, [itemQuantity]);
    
    return (
        <Card 
            sx={{ 
                display: 'flex', 
                flexDirection: {xs: 'column', md: 'row'}, 
                justifyContent: 'space-between',
            }} 
            variant="outlined"
        >
            <Box sx={{ display: 'flex'}}>
                <CardMedia
                    sx={{ width: 140 }}
                    image={item.images[0]}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        $ {item.price}
                    </Typography>
                </CardContent>
            </Box>
            
            <CardActions sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button sx={{height: '30px'}} size="small" variant="outlined" color="error" onClick={() => deleteItem(item.id)}>
                    <DeleteIcon fontSize="small"/>
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button 
                        disabled={itemQuantity === 1}
                        sx={{height: '30px'}}
                        variant="outlined" size="small" 
                        onClick={decreaseQuantity}
                    >
                        -
                    </Button>

                    <Typography variant="body2">
                        {itemQuantity}
                    </Typography>
                        
                    <Button sx={{height: '30px'}} variant="outlined" size="small" onClick={increaseQuantity}>
                        +
                    </Button>
                </Box>
                
            </CardActions>
        </Card>
    );
};

export default CartItem;
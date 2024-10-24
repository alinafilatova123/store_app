import { Badge, Box, Typography } from "@mui/material"
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { FC } from "react";
import {
  Link
} from "react-router-dom";

interface PropsI {
  itemsCount: number;
}

const Cart:FC<PropsI> = ({itemsCount}) => {
  return (
    <Link to="/cart">
      <Typography
        component="div"
        variant="body1"
        style={{
          height: 100,
          width: 'fit-content',
          position: 'fixed',
          cursor: 'pointer',
          top: 48,
          right: 50
        }}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: '50%',
              p: 2,
              zIndex: 'tooltip',
            }}
          >
            <Badge badgeContent={itemsCount} color="primary">
              <ShoppingCart color="action" />
            </Badge>
          </Box>
        </Typography>
    </Link>
  );
};

export default Cart;
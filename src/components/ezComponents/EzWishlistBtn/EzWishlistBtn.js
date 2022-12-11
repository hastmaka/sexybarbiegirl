import {userSliceActions} from "../../../store/userSlice";
// material
import EzCustomIconButton from "../EzCustomIconButton/EzCustomIconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//
import {AddToWishlist} from "../../../helper/Helper";

//----------------------------------------------------------------

export default function EzWishlistBtn({isProductInWishlist, product, user}) {
    return (
        <>
            {isProductInWishlist ?
                <EzCustomIconButton
                    icon={<FavoriteIcon
                        sx={{
                            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                            fill: theme => theme.palette.ecommerce.pink
                        }}
                    />}
                    toolTipTitle='Remove from Wishlist'
                    onClick={_ => {
                        window.dispatch(userSliceActions.removeFromWishlist({product, user}));
                        window.displayNotification({
                            t: 'success',
                            c: `Product '${product.name}' remove to the Wishlist`
                        });
                    }
                    }
                />
                :
                <EzCustomIconButton
                    icon={<FavoriteBorderIcon
                        sx={{
                            color: theme => theme.palette.ecommerce.pink,
                            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                        }}
                    />}
                    toolTipTitle='Add to Wishlist'
                    onClick={_ => AddToWishlist(product, user)}
                />}
        </>
    );
}

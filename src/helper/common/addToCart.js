import {userSliceActions} from "../../store/userSlice";
import PropTypes from "prop-types";

export default function addToCart(selectedColor, selectedSize, item, id, image, name, user) {
    const variation = item.variation.filter(i => selectedColor === i.color && selectedSize === i.size);
    window.dispatch(userSliceActions.addToCart({
        variation: variation[0],
        product: {product_id: id, image, name},
        user
    }));
    window.displayNotification({
        t: 'success',
        c: 'Product add to the Cart'
    })
};

addToCart.prototype = {
    selectedColor: PropTypes.string.isRequired,
    selectedSize: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    // image: PropTypes.
    name: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}
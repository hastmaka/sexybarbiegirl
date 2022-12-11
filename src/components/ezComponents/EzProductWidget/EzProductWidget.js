import {useState} from "react";
//
import EzModal from "../EzModal/EzModal";
import EzProductDetails from "../../../sections/productDetail/EzProductDetails";
import Wrapper from "../../Wrapper/Wrapper";
import WidgetHeader from "./WidgetHeader";
import EzMiniCard from "../EzMiniCard/EzMiniCard";

//----------------------------------------------------------------

export default function ProductWidget({productToRender, header, sx}) {

    const [tempProduct, setTempProduct] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <EzModal open={open} handleClose={_ => handleClose()}>
                <EzProductDetails product={tempProduct} modal handleCloseCard={_ => handleClose()}/>
            </EzModal>
            <Wrapper sx={{padding: '0 0 20px 0', ...sx}}>
                <WidgetHeader text={header}/>
                {productToRender.map(item =>
                    <EzMiniCard
                        key={item.id}
                        item={item}
                        handleOpen={_ => handleOpen()}
                        setTempProduct={_ => setTempProduct(item)}
                        image={item.image[0].url}
                        name={item.name}
                        price={item.price}
                    />
                )}
            </Wrapper>
        </>
    );
}

/**
 * Receiving the product to render with the corresponding category
 */
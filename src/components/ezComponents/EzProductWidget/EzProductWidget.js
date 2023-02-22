import {useState} from "react";
//
import EzProductDetails from "../../../sections/productDetail/EzProductDetails";
import Wrapper from "../../Wrapper/Wrapper";
import WidgetHeader from "./WidgetHeader";
import EzMiniCard from "../EzMiniCard/EzMiniCard";
import {openModal} from "../../../helper/Helper";

//----------------------------------------------------------------

export default function ProductWidget({productToRender, header, sx}) {
    return (
        <>
            <Wrapper sx={{padding: '0 0 20px 0', ...sx}}>
                <WidgetHeader text={header}/>
                {productToRender.map(item =>
                    <EzMiniCard
                        key={item.id}
                        item={item}
                        handleOpen={_ => openModal(<EzProductDetails product={item} modal/>)}
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
import Summary from "./summary/Summary";
import Wrapper from "../../../components/Wrapper/Wrapper";

//----------------------------------------------------------------

export default function CartSummary({user, totalFromCheckedItems, total}) {
    return (
        <Wrapper sx={{gap: '20px',padding: '20px'}}>
            <Summary
                quantity={user.cart.quantity}
                subTotal={totalFromCheckedItems}
                taxes={totalFromCheckedItems * 0.07}//7% Florida
                total={total}
            />
        </Wrapper>
    );
}

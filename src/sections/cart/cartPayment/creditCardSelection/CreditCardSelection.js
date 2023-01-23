import {useSelector} from "react-redux";
//material
import {styled} from '@mui/material/styles';
import {Stack} from "@mui/material";
//
import visa from '../../../../resources/card_accepted/visa.jpg'
import EzCheckBox from "../../../../components/ezComponents/EzCheckBox/EzCheckBox";
import EzText from "../../../../components/ezComponents/EzText/EzText";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EzCustomIconButton from "../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import EzCard from "../../../../components/ezComponents/EzCard/EzCard";
import {deletePaymentMethod} from "../../../../helper/Helper";
//----------------------------------------------------------------

const Brand = styled(Stack)(({theme}) => ({
    width: '40px'
}));

const CardElementContent = styled(EzCard)(({handlecardselection, theme}) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: handlecardselection === 'false' ? '15px 20px' : '10px 10px 10px 5px'
}))

//----------------------------------------------------------------
const Card = (type) => {
    switch (type) {
        case 'visa':
            return <img src={visa} alt='visa'></img>
        default:
            return
    }
}

export default function CreditCardSelection({card, pm, handleCardSelection, checked}) {
    const {user} = useSelector(slice => slice.user);
    const {customer} = useSelector(slice => slice.stripe);

    const handleDeleteCard = (pm) => {
        //if the pm main
        const isMain = customer.payment_method.find(item => item.pm === pm && item.main);
        //!!isMain && length > 1 can't do it, user have to change pm manually
        if(!!isMain && customer.payment_method.length > 1) {
            return window.displayNotification({t: 'info', c: 'You can Delete Default Payment Method, Change it first', })
        }
        //length = 1 delete with a message tell have to add some pm later
        if(!!isMain && customer.payment_method.length === 1) {
            deletePaymentMethod(pm, user, customer)
            return window.displayNotification({t: 'info', c: 'Have to add some Payment Method later, to be able to make a purchase'})
        }
        //isMain === false  delete the pm
        deletePaymentMethod(pm, user, customer)
    }
    return (
        <CardElementContent handlecardselection={handleCardSelection.toString()}>
            <Stack flexDirection='row' gap='20px' alignItems='center'>
                {handleCardSelection !== false &&
                    <EzCheckBox
                        onChange={_ => handleCardSelection(pm)}
                        checked={checked}
                    />
                }
                <Brand>{Card(card.brand)}</Brand>
                <EzText text={`**** **** **** ${card.last4}`}/>
            </Stack>
            <EzText text={`${card.exp_month}/${card.exp_year}`}/>
            <EzCustomIconButton
                sx={{padding: 0}}
                icon={<DeleteOutlineOutlinedIcon/>}
                toolTipTitle='Delete Card'
                onClick={_ => handleDeleteCard(pm, card)}
            />
        </CardElementContent>
    );
}
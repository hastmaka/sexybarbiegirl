import {useState} from "react";
// material
import {Link, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import EzCustomIconButton from "../../../../components/ezComponents/EzCustomIconButton/EzCustomIconButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
//
import EzModalWithTransition from "../../../../components/ezComponents/EzModalWithTransition/EzModalWithTransition";
import AddressForm from "../../../../components/form/addressForm/AddressForm";
import {userSliceActions} from "../../../../store/userSlice";
import {useConfirmDialog, useNotification} from "../../../../helper/Hooks";
import EzCard from "../../../../components/ezComponents/EzCard/EzCard";
import {useSelector} from "react-redux";
import {generalSliceActions} from "../../../../store/gs-manager-slice";
import EzProductDetails from "../../../productDetail/EzProductDetails";
import EzModal from "../../../../components/ezComponents/EzModal/EzModal";

//----------------------------------------------------------------

const RootStyle = styled(EzCard)(({action, theme}) => ({
    padding: action === 'true' ? '10px 10px 0 10px' : '10px 10px 10px 10px'
}));

const ActionContainer = styled(Stack)(({main, theme}) => ({
    flexDirection: 'row',
    justifyContent: main === 'true' ? 'space-between' : 'flex-end',
    alignItems: 'center',
}));

const DefaultAddress = styled(Typography)(({theme}) => ({
    border: `1px solid ${theme.palette.ecommerce.pink}`,
    padding: '2px 4px',
    borderRadius: '4px'
}));

//----------------------------------------------------------------

export default function AddressCard({data, onClick, action = true}) {
    const {address, city, state, country, zip, main, first_name, last_name, phone, id} = data;
    const [addressToEdit, setAddressToEdit] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onClickHandler = (e, data) => {
        if(e.currentTarget.ariaLabel === 'edit_address') {
            setAddressToEdit(data)
            handleOpen()
        }
        if(e.currentTarget.ariaLabel === 'delete_address') {
            window.confirm({t: 'warning', c: `Want to Delete this 'Address?'`})
                .then(res => {
                    if(res) {
                        window.dispatch(userSliceActions.removeAddress({id: data.id}))
                        window.displayNotification({
                            t: 'success',
                            c: 'Address Deleted Successfully'
                        })
                    }
                })

        }
    }

    return (
        <RootStyle action={action.toString()}>
            <EzModal open={open} handleClose={_ => handleClose()}>
                <AddressForm type='edit' tempData={addressToEdit} afterSubmit={_ => handleClose()}/>
            </EzModal>
            <Typography variant='span'>{first_name} {last_name}</Typography>
            <Typography variant='span'>{address}, {city}, {zip}</Typography>
            <Typography variant='span'>{state}, {country}</Typography>
            <Typography variant='span'>{phone}</Typography>

            {action && <ActionContainer main={main.toString()}>
                {main ?
                    <DefaultAddress variant='span'>Default Address</DefaultAddress> :
                    <Link
                        onClick={_ => onClick(main, id)}
                        color='inherit'
                        sx={{
                            textDecoration: 'none',
                            cursor: 'pointer',
                            borderBottom: `1px solid transparent`,
                            mr: '10px',
                            '&:hover': {
                                borderBottom: `1px solid ${'#999'}`,
                            }
                        }}
                    >Make Default</Link>
                }
                <Stack flexDirection='row' alignItems='center'>
                    <EzCustomIconButton
                        toolTipTitle='Edit'
                        icon={<CreateOutlinedIcon/>}
                        ariaLabel='edit_address'
                        onClick={e => onClickHandler(e, data)}
                    />
                    <EzCustomIconButton
                        toolTipTitle='Delete'
                        icon={<DeleteOutlineOutlinedIcon/>}
                        ariaLabel='delete_address'
                        onClick={e => onClickHandler(e, data)}
                    />
                </Stack>
            </ActionContainer>}
        </RootStyle>
    );
}

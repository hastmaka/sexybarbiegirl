import {useState} from "react";
import {useSelector} from "react-redux";
// material
import {Box, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
//
import {createId} from "../../../helper/Helper";
import {userSliceActions} from "../../../store/userSlice";
import EzLoadingBtn from "../../ezComponents/EzLoadingBtn/EzLoadingBtn";
import {generalSliceActions} from "../../../store/gs-manager-slice";
import {shipEngineToDb, validateAddress} from "../../../helper/ShipEngine";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    gap: '15px',
    padding: '30px',
    '& form': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: '15px',
        '& .MuiInputBase-root:after': {
            borderBottom: `1px solid ${theme.palette.ecommerce.swatch_2}`,
            // '& ::hover::before': {
            //     borderBottom: `1px solid ${theme.palette.ecommerce.gold}`,
            // }
        },
        '& .MuiInput-input': {
            '&::placeholder': {
                color: '#dedede'
            },
        }
    }
}));

//----------------------------------------------------------------

export default function AddressForm({type, tempData, afterSubmit}) {
    const {user} = useSelector(slice => slice.user);
    const [loading, setLoading] = useState(false);
    const [addData, setAddData] = useState({...tempData});
    const title = type === 'edit' ? 'Edit' : type === 'create' ? 'Create' : '';

    // debugger

    const onChangeHandler = (e) => {
        setAddData({...addData, [e.target.name]: e.target.value})
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        //verifying address
        const addressVerified = await validateAddress({
            name: `${formData.get('first_name')} ${formData.get('last_name')}`,
            countryCode: 'US',
            addressLine1: formData.get('address_line_1'),
            cityLocality: formData.get('city_locality'),
            stateProvince: formData.get('state_province'),
            postalCode: formData.get('postal_code')
        }, user.token)
        if(addressVerified.status === 'error') {
            window.displayNotification({c: addressVerified.message})
            setLoading(false)
        } else {
            if(type === 'edit') {
                let {id, main} = tempData;
                window.dispatch(userSliceActions.editAddress({
                    ...shipEngineToDb(addressVerified.normalizedAddress),
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name'),
                    phone: formData.get('phone'),
                    id,
                    main
                }));
            } else {
                window.dispatch(userSliceActions.addAddress({
                    ...shipEngineToDb(addressVerified.normalizedAddress),//delete all empty keys
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name'),
                    phone: formData.get('phone'),
                    main: !user.address.length,
                    id: createId()
                }));
                window.displayNotification({
                    t: 'success',
                    c: 'Address Added Successfully'
                })
            }
            window.dispatch(generalSliceActions.closeModal())
            setLoading(false)
        }
    }

    return (
        <RootStyle >
            <Typography
                variant='span'
                sx={{
                    marginBottom: '25px',
                    color: theme => theme.palette.ecommerce.swatch_2
                }}
            >{title}</Typography>
            {Object.keys(addData).length && <Box component='form' onSubmit={e => handlerSubmit(e, addData)}>
                <TextField
                    value={addData.first_name}
                    onChange={onChangeHandler}
                    variant='standard'
                    size='small'
                    name='first_name'
                    placeholder='First Name'
                    autoFocus
                />
                <TextField
                    value={addData.last_name}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='last_name'
                    placeholder='Last Name'
                />
                <TextField
                    value={addData.phone}
                    onChange={onChangeHandler}
                    required
                    // type='number'
                    variant='standard'
                    size='small'
                    name='phone'
                    placeholder='Phone'
                    inputProps={{
                        maxLength: 10,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                    }}
                />
                <TextField
                    value={addData.country_code}
                    // onChange={onChangeHandler}
                    disabled
                    variant='standard'
                    size='small'
                    name='country_code'
                    placeholder='US'
                />
                <TextField
                    value={addData.address_line_1}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='address_line_1'
                    placeholder='11011 sw 88th st apt f312'
                />
                <TextField
                    value={addData.city_locality}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='city_locality'
                    placeholder='City'
                />
                <TextField
                    value={addData.state_province}
                    onChange={onChangeHandler}
                    required
                    variant='standard'
                    size='small'
                    name='state_province'
                    placeholder='State'
                />
                <TextField
                    value={addData.postal_code}
                    onChange={onChangeHandler}
                    required
                    type='number'
                    variant='standard'
                    size='small'
                    name='postal_code'
                    placeholder='Zip'
                />

                <EzLoadingBtn
                    sx={{marginTop: '25px'}}
                    color="inherit"
                    size='large'
                    type='submit'
                    variant='outlined'
                    loading={loading}
                >
                    {title}
                </EzLoadingBtn>
            </Box>}
        </RootStyle>
    );
}

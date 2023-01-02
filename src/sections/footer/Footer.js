// material
import {Divider, Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
//
import logo from '../../resources/logo@0.25x.png'
import FooterMenu from "./footerMenu/FooterMenu";
import {PathIcon} from "../../components/pathIcon/PathIcon";
import {useSelector} from "react-redux";
import EzSimpleLink from "../../components/ezComponents/EzSimpleLink/EzSimpleLink";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'center',
    height: '401px',
    backgroundColor: theme.palette.ecommerce.bg_parent,
    [theme.breakpoints.down(786)]: {
        height: '100%',
        marginBottom: '50px'
    }
}));

const FooterFixContent = styled(Stack)(({theme}) => ({
    maxWidth: '1432px',
    width: '1432px',
    backgroundColor: '#fff',
    gap: '15px',
    [theme.breakpoints.up(1432)]: {
        borderRadius: '4px 4px 0 0'
    }
}));

const IconContainer = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    '& > button': {
        margin: 0,
        padding: 0,
    },
    '& > button > svg': {
        cursor: 'pointer',
        fill: theme.palette.ecommerce.pink,
        '&:hover': {
            fill: theme.palette.ecommerce.darkGold
        }
    }
}));

//----------------------------------------------------------------
const ICONS = [{
    id: 1,
    path: 'M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z',
    name: 'instagram',
    width: '22px'
}, {
    id: 2,
    path: 'M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z',
    name: 'facebook',
    width: '22px'
}, {
    id: 3,
    path: 'M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z',
    name: 'tiktok',
    width: '22px'
}];

const Info = ({text, icon}) => {
  return (
      <Stack flexDirection='row' alignItems='center' gap='5px'>
          {icon}
          <Typography variant='span'>{text}</Typography>
      </Stack>
  )
}

export default function Footer() {
    const {screen} = useSelector(slice => slice.generalState)
    const COMPANYMENU = [{
        id: 1, text: 'Company', header: true
    }, {
        id: 2, text: 'About us'
    },{
        id: 3, text: 'Service'
    }, {
        id: 4, text: 'Blog'
    }, {
        id: 5, text: 'Contact'
    }];

    const ACCOUNTMENU = [{
        id: 1, text: 'Account', header: true
    }, {
        id: 2, text: 'Sign in'
    },{
        id: 3, text: 'View Cart'
    }, {
        id: 4, text: 'My Wishlist'
    }, {
        id: 5, text: 'Track my Order'
    }];
    return (
        <RootStyle >
            <FooterFixContent>
                <Stack alignItems='center'>
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            padding: '20px',
                            filter: '' +
                                'invert(40%) ' +
                                'sepia(58%) ' +
                                'saturate(3111%) ' +
                                'hue-rotate(280deg) ' +
                                'brightness(93%) ' +
                                'contrast(107%)'
                        }}
                    />
                </Stack>
                <Stack flexDirection='row' p='0 30px'>
                    <Stack flex={1} gap='15px'>
                        <Stack flexDirection='row'>
                            <IconContainer>
                                {ICONS.map(item =>
                                    <PathIcon
                                        key={item.id}
                                        path={item.path}
                                        width={item.width}
                                    />
                                )}
                            </IconContainer>
                        </Stack>
                        <Info icon={<LocalPhoneIcon sx={{color: '#F438DE'}}/>} text='info@partylifestyle.com'/>
                        <Info icon={<EmailIcon sx={{color: '#F438DE'}}/>} text='(305)-748-1194'/>
                        <Info icon={<LocationOnIcon sx={{color: '#F438DE'}}/>} text='16950 North Bay Road, Sunny Isles, 33160'/>
                        <Info icon={<AccessTimeFilledIcon sx={{color: '#F438DE'}}/>} text='10:00AM - 18:00PM, Mon - Sat'/>
                    </Stack>
                    {screen >= 786 && <Stack flex={1} flexDirection='row'>
                        <Stack flex={1} gap='15px'>
                            {COMPANYMENU.map(item =>
                                <FooterMenu
                                    key={item.id}
                                    text={item.text}
                                    header={item.header}
                                />
                            )}
                        </Stack>
                        <Stack flex={1} gap='15px'>
                            {ACCOUNTMENU.map(item =>
                                <FooterMenu
                                    key={item.id}
                                    text={item.text}
                                    header={item.header}
                                />
                            )}
                        </Stack>
                    </Stack>}
                </Stack>
                <Divider/>
                {screen >= 786 ?
                    <Stack flexDirection='row' justifyContent='space-between' p='10px 30px 0 30px'>
                        <Stack>Copyright © 2022 PartyLifestyle Inc. All rights reserved.</Stack>
                            <Stack flexDirection='row' gap={2}>
                                <EzSimpleLink text='Terms of Service' to='/test'/>
                                <EzSimpleLink text='Privacy Policy' to='/test'/>
                            </Stack>
                    </Stack> :
                    <Stack alignItems='center' p='0 20px 20px 20px' gap='5px'>
                        <EzSimpleLink text='Terms of Service' to='/test'/>
                        <EzSimpleLink text='Privacy Policy' to='/test'/>
                        <Stack>Copyright © 2022 PartyLifestyle Inc. All rights reserved.</Stack>
                    </Stack>
                }
            </FooterFixContent>
        </RootStyle>
    );
}

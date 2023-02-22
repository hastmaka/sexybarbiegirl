// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import EzText from "../../components/ezComponents/EzText/EzText";
import EzSimpleLink from "../../components/ezComponents/EzSimpleLink/EzSimpleLink";
import EzButton from "../../components/ezComponents/EzButton/EzButton";
import {fetchAPI} from "../../helper/FetchApi";
import {url} from "../../helper/stripe/StripeApi";

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    // width: '20%',
    // backgroundAttachment: 'fixed',
    // backgroundColor: '#d52525',
    // backgroundImage: `url(${a})`,
    // backgroundSize: '20% 600px',
    // backgroundPosition: 'left 0 bottom 0',
    // backgroundRepeat: 'no-repeat'
}));
//----------------------------------------------------------------

export default function Test() {
    const handleClick = () => {
        fetchAPI(url, 'get-rates', 'POST', {
            rateOptions: {
                carrierIds: ['se-4087584']
            },
            shipment: {
                validateAddress: "no_validation",
                shipTo: {
                    name: "luis",
                    // phone: "555-555-5555",
                    addressLine1: "11011 sw 88 st apt f312",
                    cityLocality: "Miami",
                    stateProvince: "FL",
                    postalCode: "33176",
                    countryCode: "US",
                    addressResidentialIndicator: "yes",
                },
                shipFrom: {
                    companyName: "PartyLifestyle",
                    name: "Yanet",
                    phone: "305-748-1194",
                    addressLine1: "1476 reef redge ct",
                    // addressLine2: "Suite 300",
                    cityLocality: "Las Vegas",
                    stateProvince: "NV",
                    postalCode: "89128",
                    countryCode: "US",
                    addressResidentialIndicator: "no",
                },
                packages: [{
                    weight: {
                        value: 1,
                        unit: "pound",
                    },
                    dimensions: {
                        length: 10,
                        width: 5,
                        height: 2,
                        unit: "inch"
                    }
                }],
            }
        }).then(res => {
            debugger
        })
    }
    return (
        <RootStyle>
           <EzButton
                onClick={_ => handleClick()}
           >ShipEngine</EzButton>
        </RootStyle>
    );
}

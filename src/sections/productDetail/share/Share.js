// material
import {Link, Stack, Tooltip} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    gap: '2px',
    '& > a > svg': {
        fill: theme.palette.ecommerce.pink,
        fontSize: '1.3rem',
        '&:hover': {
            fill: theme.palette.ecommerce.swatch_2
        }
    },
}));

//----------------------------------------------------------------
const ToolTipIcon = ({item}) => {
   return (
       <Tooltip title={item.social}>
           {item.icon}
       </Tooltip>
   )
}

export default function Share({link, data, sx}) {
    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            window.displayNotification({
                t: 'info',
                c: 'Link copied to clipboard. Share It!!'
            });
        }
        catch (err) {
            window.displayNotification({
                t: 'warning',
                c: `It seems you don't have permission to use clipboard`
            });
            console.log('some error coping to clipboard', err);
        }
    };
    return (
        <RootStyle {...sx}>
            {data.map(item => {
                switch (item.social) {
                    case "Facebook":
                        return (
                            <Link
                                key={item.social}
                                href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
                                target="_blank"
                            >
                                <ToolTipIcon item={item}/>
                            </Link>
                        )
                    case "Email":
                        return (
                            <Link
                                key={item.social}
                                href={`mailto:?subject=You Have to See This&body=Check Out This Site: ${link}`}
                                target="_blank"
                            >
                                <ToolTipIcon item={item}/>
                            </Link>
                        )
                    case "Whatsapp":
                        return (
                            <Link
                                key={item.social}
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(link)}`}
                                data-action="share/whatsapp/share"
                                target="_blank"
                            >
                                <ToolTipIcon item={item}/>
                            </Link>
                        )
                    case "Copy-to-clipboard":
                        return (
                            <Link
                                sx={{'&:hover': {cursor: 'pointer'}}}
                                key={item.social}
                                onClick={_ => copyToClipBoard(link)}
                                target="_blank"
                            >
                                <ToolTipIcon item={item}/>
                            </Link>
                        )
                    default:
                        return null
                }
            })}
            <Link>

            </Link>
        </RootStyle>
    );
}
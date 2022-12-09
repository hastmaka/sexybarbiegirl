// material
import {Stack, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(({theme}) => ({}));

//----------------------------------------------------------------

export default function FooterMenu({text, header}) {
    return (
        <RootStyle>
            <Typography 
                variant='span' 
                sx={{
                    borderBottom: header ? '' : '1px solid transparent',
                    color: header ? '#241722' : '#767193',
                    fontWeight: header ? 700 : 500, 
                    fontSize: header ? '14px' : '13px',
                    cursor: header ? '' : 'pointer',
                    width: 'fit-content',
                    transition: 'all 200ms',
                    '&:hover': {
                        borderBottom: header ? '' : `1px solid ${'#767193'}`,
                    }
                }}
            >
                {text}
            </Typography>
        </RootStyle>
    );
}

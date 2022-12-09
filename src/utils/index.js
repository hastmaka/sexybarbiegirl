import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import {NavLink} from 'react-router-dom';

export const generateLink = (items, padding = 0, child = 0, selectedTo, handleClick, handleMenuItemClick, open) => {

    let childCount = child;
    return (
        items.map((item) => {

            let childrenPath = '',
                condition = item.to === selectedTo;

            if (selectedTo !== item.link_to) {
                childrenPath = item.link_to.split('/')
                childrenPath = childrenPath[childrenPath.length - 1]
                condition = childrenPath === selectedTo
            }

            return <Paper key={item.link_id} sx={{backgroundColor: 'inherit'}}>
                <ListItemButton
                    sx={{pl: padding * childCount}}
                    dense
                    key={item.link_id}
                    to={item.link_to || ''}
                    component={NavLink}
                    onClick={() => {
                        if (item.items) {handleClick()}
                        handleMenuItemClick(item.link_name)
                    }}
                    selected={condition}
                >
                    <ListItemIcon sx={{paddingLeft: '6px', minWidth: '35px'}}>
                        <SendIcon sx={{fontSize: '16px'}}/>
                    </ListItemIcon>
                    <ListItemText
                        sx={{
                            '& .MuiListItemText-primary': {
                                textTransform: 'uppercase',
                                fontSize: '22px',
                                color: condition ?
                                    theme => theme.palette.ecommerce.gold :
                                    theme => theme.palette.ecommerce.gold
                            }
                        }}
                        primary={item.link_name}
                    />
                    {item.items?.length ? open ?
                        <ExpandLessIcon
                            sx={{color: theme => theme.palette.ecommerce.colorTwo}}
                        /> : <ExpandMoreIcon
                            sx={{color: theme => theme.palette.ecommerce.colorTwo}}
                        /> : ''}
                </ListItemButton>

                {item.items?.length ?
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            {generateLink(item.items, 4, child + 1)}
                        </List>
                    </Collapse>
                    : ''}
            </Paper>
        })
    )
}
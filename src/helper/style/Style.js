export const btnOutlined = {
    color: theme => theme.palette.ecommerce.pink,
    border: `1px solid ${'#f438de'}`,
    '&:hover': {
        color: theme => theme.palette.ecommerce.swatch_8,
        border: `1px solid ${'#fff'}`,
        backgroundColor: theme => theme.palette.ecommerce.pink,
    }
}

export const btnContained = {
    fontSize: '16px',
    color: '#FFF',
    border: '1px solid transparent',
    backgroundColor: theme => theme.palette.ecommerce.pink,
    boxShadow: theme => theme.shadows[0],
    transition: 'all 200ms',
    '&:hover': {
        border: '1px solid transparent',
        backgroundColor: theme => theme.palette.ecommerce.pink,
        boxShadow: theme => theme.shadows[10]
    },
    '& .MuiLoadingButton-loadingIndicator': {
        color: '#FFF'
    }
}

export const linkStyle = {
    borderBottom: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 200ms',
    '&:hover': {
        borderBottom: `1px solid ${'#999'}`,
    }
}
import React from 'react'

import { Box, Typography } from '@mui/material';

export const Header = ({title,subtitle}) => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);

  return (
 <Box>
    <Typography
    variant='h4'
    color={"white"}
    fontWeight='bold'
    // sx={{m:'5px'}}
    >{title}</Typography>
    <Typography
    
    variant='h4'
    color={"black"}
    fontWeight='bold'>{subtitle}</Typography>
 </Box>
  )
}

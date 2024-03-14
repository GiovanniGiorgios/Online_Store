import React, {useContext} from 'react';
import { CatalogStoreContext } from "../../index";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { styled } from '@mui/material/styles';

import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import { Grid, useMediaQuery } from '@mui/material';
import { useMode } from '../../theme';

const icons = {
    People: <People />,
    Public: <Public />,
    PermMedia: <PermMedia />,
    Dns: <Dns />,
};

const CatalogNavBar = styled(List)({
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
    },
  });

const CatalogList = () => {
    const catalog = useContext(CatalogStoreContext);
    const [theme] = useMode();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    return (
        <Grid container>
            {catalog.catalogСategories.map((item, index) => (
                <Grid 
                    item 
                    xs={12} 
                    sm={isSmallScreen ? 6 : 12} 
                    md={isSmallScreen ? 4 : 12} 
                    lg={isSmallScreen ? 3 : 12} 
                    key={index}
                >
                    <ListItemButton
                        sx={{ py: 0, minHeight: 32 }}
                    >
                        <ListItemIcon>
                            {icons[item.icon]}
                        </ListItemIcon>

                        <ListItemText
                        primary={item.category}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                </Grid>
            ))}
        </Grid>
    );
}
export default CatalogList;

{/* <CatalogNavBar component="nav" disablePadding>
            {catalog.catalogСategories.map((item, index) => (
                <ListItemButton
                    key={index}
                    sx={{ py: 0, minHeight: 32}}
                >
                    <ListItemIcon>
                        {icons[item.icon]}
                    </ListItemIcon>

                    <ListItemText
                    primary={item.category}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                </ListItemButton>
            ))}
        </CatalogNavBar> */}
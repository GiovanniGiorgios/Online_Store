import React, { useContext } from 'react';
import { UserStoreContext, InfoUserBlocksStoreContext } from "../../index";

import Box from '@mui/material/Box';

import BlockWelcome from './BlockWelcome/BlockWelcome';
import BlockSocials from './BlockSocials/BlockSocials';
import BlockInfoSimple from './BlockInfoSimple/BlockInfoSimple';
import CatalogList from '../CatalogList/CatalogList';


import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../utils/consts';
import { checkUserAuthFireBase } from '../../utils/fireBase/authFireBaseService';

const LeftBar = observer(() => {
  
  const user = useContext(UserStoreContext);
  const infoUserBlocks = useContext(InfoUserBlocksStoreContext);

  const TTT = () => {
    user.setIsAuth(!user.isAuth)
    console.log(user.isAuth)
  }
  const handleUserInfo = () => {
    console.log("User info", JSON.stringify(user.user))
  }
  const handleUserLogout = () => {
    user.logout();
  }
  return (  
    <Box sx={{display: "flex", width: "100%", height: "100%", paddingTop: "20px", backgroundColor: "primary.main"}}>
      <Box sx={{display: "flex", flexDirection: "column", gap: "20px", alignSelf: "flex-end", position: "sticky", bottom: "0px"}}>

        <CatalogList />

        {user.isAuth ? null : <BlockWelcome />}

        <Button sx={{color: "black"}} onClick={TTT}>Exit</Button>
        <Link to={ADMIN_ROUTE}>Admin</Link>

        <Button sx={{color: "black"}} onClick={handleUserInfo}>User Info</Button>
        <Box>{user.isAuth.toString()}</Box>
        <Button sx={{color: "black"}} onClick={handleUserLogout}>USER LOGOUT</Button>

        <BlockSocials />

        <BlockInfoSimple blockTitle="Information about the company" data={infoUserBlocks.blockAboutCompanyData} />
          
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocks.blockHelpData} />
          
        <BlockInfoSimple blockTitle="Information about the company" data={infoUserBlocks.blockAboutCompanyData} />

        <BlockInfoSimple blockTitle="Help" data={infoUserBlocks.blockHelpData} />
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocks.blockHelpData} />
        <BlockInfoSimple blockTitle="Help" data={infoUserBlocks.blockHelpData} />

      </Box>
    </Box>
  );
});

export default LeftBar
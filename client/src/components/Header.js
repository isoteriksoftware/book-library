import { MenuRounded } from "@mui/icons-material";
import { AppBar, Button, Divider, Drawer, Hidden, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import Link from './Link';

const Root = styled('div')(({ theme }) => ({
  
}));

const FlexGrow = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Bar = styled(AppBar)(({ theme }) => ({
  ...theme.appBar,
  background: '#1E1E1E',

  '& .toolbar': {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem 6rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1.5rem 1rem',
    },
    [theme.breakpoints.only('sm')]: {
      justifyContent: 'space-between',
      padding: '1.5rem 3rem',
    },

    '& .logo': {
      width: '200px',
      height: 'auto',
      [theme.breakpoints.only('xs')]: {
        width: '150px',
      },
    },
    '& .links': {
      display: 'flex',
      columnGap: '2rem',
      alignItems: 'center',
    },
    '& .link': {
      color: 'white',
      fontWeight: 500,
      transition: '.2s ease',

      '&:hover': {
        transition: '.2s ease',
        borderBottom: `1px inset ${theme.palette.primary.dark}`,
        color: theme.palette.primary.dark
      },
      '&.active': {
        transition: '.2s ease',
        color: theme.palette.primary.dark
      },
      '&.dropdown': {
        fontSize: '1rem',
        padding: 0,
      },
    },
    '& .btn': {
      textTransform: 'none',
      marginLeft: '2rem',
      fontWeight: 600,
      boxShadow: 'none',
      padding: '.4rem 2rem',
      borderRadius: '8px',
      fontSize: '1rem',
      [theme.breakpoints.only('sm')]: {
        width: '40%',
      },
    }
  }
}));

const MenuDrawer = styled(Drawer)(({ theme }) => ({
  width: 'auto',

  '& .divider': {
    margin: '1rem 0',
  },
  '& .btn': {
    textTransform: 'none',
    fontWeight: 600,
    boxShadow: 'none',
    padding: '.8rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem'
  },
  '& .link': {
    color: theme.palette.secondary.main,
    fontWeight: 500,
    transition: '.2s ease',
    width: '100%',

    '&:hover': {
      transition: '.2s ease',
      borderBottom: `1px inset ${theme.palette.primary.dark}`,
      color: theme.palette.primary.dark
    },
    '&.active': {
      transition: '.2s ease',
      color: theme.palette.primary.dark
    },
    '&.dropdown': {
      fontSize: '1rem',
      padding: 0,
    },
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Root>
      <Bar position="static" elevation={5}>
        <Toolbar className="toolbar">
          <Link href="/"><Typography variant="h5" className="title" style={{ color: 'white' }}>Book Library</Typography></Link>
          
          <Hidden smDown>
            <FlexGrow/>
          </Hidden>

          <Hidden mdDown>
            <div className="links">
              <Link href="/about" label="About Us" className="link"/>
              <Link href="/blog" label="Blog" className="link"/>
              <Link href="/contact" label="Contact Us" className="link"/>
            </div>
          </Hidden>

          <Hidden smDown>
            <Button 
              variant="contained" 
              color="primary" 
              className="btn"
            >
              Login
            </Button>
          </Hidden>

          <Hidden lgUp>
            <FlexGrow/>
            <IconButton color="secondary" size="large" onClick={() => setDrawerOpen(true)}>
              <MenuRounded fontSize="large"/>
            </IconButton>

            <MenuDrawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <div >
                <List>
                  <ListItem button onClick={() => setDrawerOpen(false)}>
                    <Link href="/about" label="About Us" className="link stretch"/>
                  </ListItem>
                  <ListItem button>
                    <Link href="/blog" label="Blog" className="link stretch"/>
                  </ListItem>
                  <ListItem button>
                    <Link href="/contact" label="Contact Us" className="link stretch"/>
                  </ListItem>

                  <Hidden smUp>
                    <Divider className="divider"/>

                    <ListItem>
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        className="btn"
                        target="_blank"
                        fullWidth
                      >
                        Get App
                      </Button>
                    </ListItem>
                  </Hidden>
                </List>
              </div>
            </MenuDrawer>
          </Hidden>
        </Toolbar>
      </Bar>
    </Root>
  );
};

export default Header;
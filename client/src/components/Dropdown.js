import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Button, Grow, MenuList, Paper, Popper, ClickAwayListener } from '@mui/material';
import React, { useEffect } from 'react';

export default function Dropdown ({ children, title, btnClass = {}, isOpen = false, disablePortal = true, }) {
  const [open, setOpen] = React.useState(isOpen);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    console.log(open);
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div
      style={{
        display: 'flex',
        zIndex: 10000000000000000
      }}
    >
      <div>
        <Button
          ref={anchorRef}
          aria-haspopup="true"
          onClick={handleToggle}
          className={btnClass}
          endIcon={open ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRounded/>}
          sx={{
            textTransform: 'none',
            background: 'rgba(0, 0, 0, 0) !important',
            padding: 0,
            borderRadius: '0',
          }}
        >
          {title}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal={disablePortal}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper
                sx={{
                  background: 'white',
                  borderRadius: '0',
                  //width: '200px',
                  boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)',
                  padding: '.3rem .5rem',
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {children}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

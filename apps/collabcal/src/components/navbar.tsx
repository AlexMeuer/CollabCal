import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectAccount,
  selectUserDataOne,
  useAppDispatch,
  userData,
} from "~/redux";

export interface NavBarProps {
  title: string;
  onAuthRequested: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ title, onAuthRequested }) => {
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { session } = useSelector(selectAccount);

  const userInfo = useSelector(selectUserDataOne(session?.id ?? ""));

  React.useEffect(() => {
    if (session) {
      dispatch(userData.fetchOne(session.id));
    }
  }, [session]);

  return (
    <AppBar position="static" sx={{ "box-shadow": "10px" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            color: "primary.main",
            textDecoration: "none",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            "justify-content": "end",
            display: "flex",
            // display: { xs: "flex", md: "none" },
          }}
        >
          {session ? (
            <IconButton onClick={onAuthRequested} sx={{ padding: 0 }}>
              <Avatar
                alt={userInfo?.name}
                src={userInfo?.photoURL}
                sx={{ m: 1, bgcolor: "secondary.main" }}
              />
            </IconButton>
          ) : (
            <Button onClick={onAuthRequested}>Sign In</Button>
          )}
          {/* <IconButton */}
          {/*   size="large" */}
          {/*   aria-label="menu" */}
          {/*   aria-controls="menu-appbar" */}
          {/*   aria-haspopup="true" */}
          {/*   onClick={handleOpenNavMenu} */}
          {/*   color="inherit" */}
          {/* > */}
          {/*   <MenuIcon /> */}
          {/* </IconButton> */}
          {/* <Menu */}
          {/*   id="menu-appbar" */}
          {/*   anchorEl={anchorElNav} */}
          {/*   anchorOrigin={{ */}
          {/*     vertical: "bottom", */}
          {/*     horizontal: "left", */}
          {/*   }} */}
          {/*   keepMounted */}
          {/*   transformOrigin={{ */}
          {/*     vertical: "top", */}
          {/*     horizontal: "left", */}
          {/*   }} */}
          {/*   open={Boolean(anchorElNav)} */}
          {/*   onClose={handleCloseNavMenu} */}
          {/*   sx={{ */}
          {/*     display: { xs: "block", md: "none" }, */}
          {/*   }} */}
          {/* > */}
          {/*   {pages.map((page) => ( */}
          {/*     <MenuItem key={page} onClick={handleCloseNavMenu}> */}
          {/*       <Typography textAlign="center">{page}</Typography> */}
          {/*     </MenuItem> */}
          {/*   ))} */}
          {/* </Menu> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

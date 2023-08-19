import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Stack, AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
const NavBar = () => {


  const { data: session } = useSession();

  const handleSubmit =()=>{
    signOut( {redirect: "/login"})
    
  }


  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between">
        <Box>
          <Typography>
            <Link href={"/"}>Personal Blogging App</Link>
          </Typography>
        </Box>
        <Box className="flex gap-3 ">
          {session ? (
            <>
            {/* <Typography>{userLog}</Typography> */}
            <Typography>
              <Button
                onClick={handleSubmit }
                className="bg-white hover:bg-white text-white "
                >
                Logout
              </Button>
            </Typography>
                </>
          ) : (
            <>
              <Typography>
                <Link href={"/signup"}>Signup</Link>
              </Typography>
              <Typography>
                <Link href={"/login"}>Login</Link>
              </Typography>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

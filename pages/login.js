import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import bg from "../public/assets/LoginBackground.jpg";
import Login from "../components/Login";
import { useSession, getProviders } from "next-auth/react"

const login = (props) => {
  const session = useSession();
  console.log('session', session);
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Grid
          container
          spacing={{ lg: "3.6", md: "2" }}
          sx={{ paddingTop: 10.25 }}
        >
          <Grid item xs={0} md={6} lg={6} />
          <Grid item xs={12} md={5} lg={4}>
            <Login {...props}/>
          </Grid>
          <Grid item xs={0} md={1} lg={2} />
        </Grid>
      </Box>
    </>
  );
};

export default login;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  }
}



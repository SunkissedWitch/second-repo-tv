import React, { useState } from "react";
import { CardContent, Stack, Button, Link } from "@mui/material";
import { OutlinedButton } from "../OutlinedButton";
import { CustomCardHeader } from "../Login/CustomCardHeader";
import { useRouter } from "next/router";
import {
  LoginCard,
  AuthIconButton,
  OrDivider,
  PasswordInput,
  EmailInput,
  UsernameInput
} from "./Login.styled";
import { FacebookRounded, Apple, ContentPasteSearchOutlined } from "@mui/icons-material";
import GoogleIcon from '../Icons/GoogleColorIcon'
import { TV_TALK_API } from "../../util/constants";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"

const Login = (props) => {
  const { data: session } = useSession()
  const { providers } = props;
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const authUrl = `${TV_TALK_API}/auth/login`

  const onSubmit = async () => {
    console.log("form values", formValues);

    // requared username - not email
    try {
      // const { data: { token } } = await axios.post(authUrl, formValues)
      signIn(providers.credentials.id, formValues);
      // router.push('/profile/reactions');
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <LoginCard>
      <CustomCardHeader
        title="Log In"
        subheader="New user?"
        subheaderLink="/registration"
        subheaderLinkTitle="Create an account"
      />
      <CardContent sx={{ paddingY: 2.5 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="column" spacing={1.25}>
            <AuthIconButton onClick={() => signIn(providers.google.id)} color="secondary" startIcon={<GoogleIcon />}>
              Continue with Google
            </AuthIconButton>
            <AuthIconButton onClick={() => signIn(providers.facebook.id)} color="primary" startIcon={<FacebookRounded />}>
              Continue with Facebook
            </AuthIconButton>
            <OutlinedButton onClick={() => signIn(providers.apple.id)} size="large" sx={{ color: 'text.primary'}} startIcon={<Apple />}>
              Continue with Apple
            </OutlinedButton>
          </Stack>
          <OrDivider />
          <Stack direction="column" spacing={3}>
            {/* <EmailInput value={formValues.email} onChange={handleChange} /> */}
            <UsernameInput value={formValues.username} onChange={handleChange} />
            <PasswordInput
              value={formValues.password}
              onChange={handleChange}
            />
            <Link href="#" underline="none" color="primary">
              Forgot Password?
            </Link>
          </Stack>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Login
          </Button>
        </Stack>
      </CardContent>
    </LoginCard>
  );
};

export default Login;

import { Container, Grid } from '@mui/material';
import React from 'react';
import { fetchProfile, ProfileLayout } from '../../components/ProfileLayout';
import ReactionCard from '../../components/ReactionCard';
import axios from '../../services/api';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from '../api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  const { user } = session;
  const { data: reactions } = await axios.get(`/profile/reactions`, {
    headers: {
      'Authorization': `Bearer ${user.tv_api_token}`
    }
  });
  const profile = await fetchProfile(user);
  return {
    props: {
      reactions,
      profile,
    }, // will be passed to the page component as props
  };
}

export default function Page({ reactions, profile }) {
  const { results: reactionsList, pagination } = reactions;
  return (
      <Grid container spacing={3.5}>
        {reactionsList?.map((result) => {
          return (
            <Grid item key={result.id} xs={12} md={6}>
              <ReactionCard {...result} profile={profile} />
            </Grid>
          );
        })}
      </Grid>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout mode='profile'>{page}</ProfileLayout>;
};
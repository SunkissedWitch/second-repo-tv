import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ProfileLayout, fetchProfile } from '../../components/ProfileLayout';

const mockData = {
	"pagination": {
		"current_page": 1,
		"total_pages": 3,
		"prev_page": null,
		"next_page": 2,
		"total_count": 69,
		"current_per_page": 25
	},
	"results": [{
		"id": 6059,
		"tmsId": "SH003781390000",
		"title": "Big Brother",
		"seasonNum": 1,
		"episodeNum": 1,
		"shares_count": 0,
		"likes_count": 1,
		"comments_count": 2,
		"stories_count": 0,
		"activity_count": 3,
		"popularity_score": 0,
		"shortDescription": "Strangers, cut off from the outside world, coexist in an isolated house.",
		"seriesId": "188043",
		"rootId": 188043,
		"preferred_image_uri": "http://wewe.tmsimg.com/assets/p18592610_b_v5_aa.jpg",
		"episodeTitle": null
	},
  {
		"id": 6060,
		"tmsId": "SH003781390000",
		"title": "Big Brother",
		"seasonNum": 1,
		"episodeNum": 1,
		"shares_count": 0,
		"likes_count": 1,
		"comments_count": 2,
		"stories_count": 0,
		"activity_count": 3,
		"popularity_score": 0,
		"shortDescription": "Strangers, cut off from the outside world, coexist in an isolated house.",
		"seriesId": "188043",
		"rootId": 188043,
		"preferred_image_uri": "http://wewe.tmsimg.com/assets/p18592610_b_v5_aa.jpg",
		"episodeTitle": null
	}
]
}

export async function getServerSideProps(context) {
    const username = 'funkparliament'
    let res = await fetch(`https://api.tvtalk.app/users/${username}/favorites`)
    console.log(res)

    let favorites = await res.json()
    const profile = await fetchProfile()
    console.log(favorites)
    return {
        props: {
          favorites,
            profile
        }
    }
}

export default function Page(data) {
  const { favorites } = data;
  console.log("favorites", favorites);
  // const { results } = favorites
  const { results } = mockData
  return (
    <>
      <ul>
        {results.map((favorite) => {
          return <li key={favorite.id}>{favorite.title} </li>;
        })}
      </ul>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
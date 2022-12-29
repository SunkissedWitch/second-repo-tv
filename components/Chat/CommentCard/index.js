import React from "react";
import { CardContent } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MessagesIcon from "../../Icons/MessagesIcon";
import ShareIcon from "../../Icons/ShareIcon";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import CardHeader from "../../ReactionCard/CardHeader";

import { ReactionCardMedia } from "../../ReactionCard/ReactionCard.styled";
import {
  CardWrapper,
  CommentCardActions,
  ActionButton,
  CardText,
  cardActionsMobileProps,
} from "./CommentCard.styled";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

const CommentCard = ({
  profile,
  id,
  text,
  images,
  created_at,
  tmsId,
  withoutActions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const timeAgo = dayjs(created_at).fromNow();

  const { username, image } = profile;
  // -- navigate user to current comment page --
  const openCommentPage = () => {
    console.warn("router", router);
    router.push({
      pathname: "/chat/[tmsId]/comments/[id]/replies",
      query: {
        tmsId: tmsId,
        id: id,
      },
    });
  };
  return (
    <CardWrapper sx={withoutActions ? { paddingBottom: 2 } : {}}>
      <CardHeader
        isMobile={isMobile}
        userData={{ id, username, image, timeAgo }}
      />
      <CardContent
        sx={
          isMobile
            ? { paddingX: 2, paddingTop: 0 }
            : { paddingX: 3.75, paddingTop: 0 }
        }
      >
        <CardText onClick={openCommentPage} isMobile={isMobile}>
          {text}
        </CardText>
        {images.length ? <ReactionCardMedia image={images[0]} /> : null}
      </CardContent>
      {withoutActions ? null : (
        <CommentCardActions
          sx={
            isMobile
              ? cardActionsMobileProps
              : { justifyContent: "flex-start" }
          }
        >
          <ActionButton
            title="Like"
            onClick={() => {
              console.log("click add to favorites - id:", id);
            }}
            aria-label="Like"
            icon={<FavoriteIcon fontSize="inherit" />}
          />
          <ActionButton
            title="Reply"
            aria-label="Reply"
            icon={<MessagesIcon fontSize="inherit" />}
          />
          <ActionButton
            title="Share"
            aria-label="Share"
            icon={<ShareIcon fontSize="inherit" />}
          />
        </CommentCardActions>
      )}
    </CardWrapper>
  );
};

export default CommentCard;

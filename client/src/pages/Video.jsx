import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { format } from 'timeago.js';
import Comments from "../components/Comments";
import Recommendation from "../components/Recommendation";
import { subcription } from "../redux/userSlice";
import { dislike, fetchFailure, fetchSuccess, like } from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width:100%;
  object-fit:cover;
`

const Video = () => {
  
  const {currentUser} = useSelector(state => state.user)
  const {currentVideo} = useSelector(state =>  state.video)
 console.log(currentUser)
 console.log(currentVideo)
  const dispatch = useDispatch()

// const path = useLocation().pathname.split('/')[2]

// or 
  const {id} = useParams()
  

  const [channel, setChannel] = useState({})
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
  
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const videoRes = await axios.get(`/video/find/${id}`)
        console.log(videoRes)
        const channelRes = await axios.get(`/user/find/${videoRes.data.userId}`)
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setIsLoading(false)
      } catch (error) {
        dispatch(fetchFailure())
      }
    }
    fetchData()

  },[id, dispatch])

  const handleLike = async () => {
    await axios.put(`/user/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

   const handleDisLike = async () => {
    await axios.put(`/user/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id) ?
    await axios.put(`/user/unsub/${channel._id}`) :
    await axios.put(`/user/sub/${channel._id}`)
    dispatch(subcription(channel._id))
  }
 
  
  return (
    <>
    {isLoading  ? 
    <Container>"Loading"</Container> 
    : 
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser?._id) ? 
              <ThumbUpIcon />
              : 
                <ThumbUpOutlinedIcon />
            }
             {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
            {currentVideo.dislikes?.includes(currentUser?._id) ? 
              <ThumbDownIcon />
              :
              <ThumbDownOffAltOutlinedIcon />  }
              {currentVideo.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.image} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
              {channel.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel?._id) ? 
              "SUBSCRIBED" : "SUBSCRIBE"
            }
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
      </Content>
      <Recommendation tags={currentVideo.tags}/>
      
    </Container>
    }
    </>
  );
};

export default Video;
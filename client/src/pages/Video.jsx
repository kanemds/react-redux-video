import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { format } from 'timeago.js';
import Comments from "../components/Comments";
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from "../redux/videoSlice";

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

const Recommendation = styled.div`
  flex: 2;
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

const Video = () => {
  
  const {currentUser} = useSelector(state => state.user)
  const {currentVideo} = useSelector(state =>  state.video)
 
  const dispatch = useDispatch()

const path = useLocation().pathname.split('/')[2]

// or 
  // const {id} = useParams()
  

  const [channel, setChannel] = useState({})



  useEffect(() => {
    dispatch(fetchStart())
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/video/find/${path}`)
        console.log("video", videoRes.data)
        const channelRes = await axios.get(`/user/find/${videoRes.data.userId}`)
        console.log("user", channelRes.data)
        setChannel(channelRes) 
        dispatch(fetchSuccess(videoRes.data))

      } catch (error) {
        dispatch(fetchFailure())
      }
    }
    fetchData()

  },[path, dispatch])

  const handleLike = async () => {
    await axios.put(`/user/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

   const handleDisLike = async () => {
    await axios.put(`/user/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) ? 
              <ThumbUpIcon />
              : 
                <ThumbUpOutlinedIcon />
            }
             {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
            {currentVideo.dislikes?.includes(currentUser._id) ? 
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
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments/>
      </Content>
      <Recommendation>
        {/* <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/> */}
      </Recommendation>
    </Container>
  );
};

export default Video;
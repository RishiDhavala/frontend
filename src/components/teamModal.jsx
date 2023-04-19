import {
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "../assets/close_icon.svg";
import Frame from "../assets/Popup_Frame.svg";
import { useCookies } from "react-cookie";
//import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

Modal.setAppElement("#root");

/**
 * Leaderboard for the contest
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 
 */

export const TeamModal=({handleClose, show, iter, children})=>{
      const serverUrl ="https://huntreasure-api.onrender.com" || "";
  const [teamState, setteamState] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [update,setUpdate]=useState(0)
  const [cookies]=useCookies(["uid"])
  const count = useRef(0);
 let uid=cookies["uid"];
  useEffect(() => {
    axios.get(`${serverUrl}/getTeam`, {
        headers: {
          uid: uid,
        },
      }).then((res) => {
      console.log(res.data);
      setteamState(res.data);
      console.log(teamState);
     
     // console.log(teamState["uid"]);
      setLoading(false);
    });
  }, [isLoading]);

 

 const SetTableRow = (team) => {
    return (
      <Tr>
        <Td>
          <p>{team.unlockedClues}</p>
        </Td>
        <Td>
          <p>{team.teamName}</p>
        </Td>
        <Td>
          <p>{team.score}</p>
        </Td>
      </Tr>
    );
  };


 return (
    <Modal
      isOpen={show}
      onRequestClose={handleClose}
      className="ReactModal__Overlay"
      overlayClassName="ReactModal__Overlay"
    >
      <Center>
        <div
          style={{
            height: "80vh",
            position: "absolute",
            top: "10%",
            maxWidth: "600px",
            aspectRatio: 0.5344,
            backgroundSize: "contain",
            backgroundClip: "border-box",
            backgroundImage: `url(${Frame})`,
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            colorScheme="BlackAlpha"
            isRound="true"
            onClick={handleClose}
            position="relative"
            top="-3%"
            right="45%"
            zIndex="100"
          >
            <Image height="5vh" src={CloseIcon}></Image>
          </IconButton>
          <Heading>{teamState.uid}</Heading>
          <VStack
            style={{
              marginRight: "8%",
              marginLeft: "8%",
              paddingTop: "4%",
              marginBottom: "10%",
              display: "flex",
              height: "100%",
              width: "80%",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "scroll",
            }}
          >
            <Box display="none">
              {count.current === iter ? void 0 : (count.current = iter)}
            </Box>
             <Table variant="simple" overflowY="scroll">
              <Thead>
                <Tr>
                  <Th isNumeric color="white">
                    Level
                  </Th>
                  <Th color="white">Team</Th>
                  <Th isNumeric color="white">
                    Score
                  </Th>
                </Tr>
                
                {(teamState.map(SetTableRow))}
              </Thead>
            </Table>
</VStack>
</div>
</Center>
</Modal>
 );


}
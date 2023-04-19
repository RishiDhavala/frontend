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
import PageBackdrop from "../components/PageBackdrop";

Modal.setAppElement("#root");

/**
 * Leaderboard for the contest
 *
 * @param {show} show value for show/hide of the modal
 * @param {handleClose} handleClose action to be performed for closing the modal
 w
 */
export const Admin = ({ handleClose, show, iter, children }) => {
  const serverUrl = "http://localhost:5000" || "";
  const [boardState, setboardState] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    axios.get(`${serverUrl}/getLeaderboard`).then((res) => {
      res.data = setRank(res.data);
      setboardState(res.data);
      setLoading(false);
    });
  }, [count.current]);
console.log(boardState);
  const setRank = (data) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].rank = i + 1;
      }
    }
    return data;
  };

  const SetTableRow = (team) => {
    return (
      <Tr>
        <Td>
          <p>{team.rank}</p>
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

  return(
    <PageBackdrop>
 <Center>
        <div
          style={{
            //width:"80vw",

            height: "80vh",
            position: "absolute",
            top: "10%",
            maxWidth: "80vw",
            aspectRatio: 1,
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
      
          <Heading>Leaderboard</Heading>
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
                    Rank
                  </Th>
                  <Th color="white">Team</Th>
                  <Th isNumeric color="white">
                    Score
                  </Th>
                </Tr>
                {boardState.map(SetTableRow)}
              </Thead>
            </Table>
          </VStack>
        </div>
      </Center>
      </PageBackdrop>
  );
}
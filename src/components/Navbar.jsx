import { Flex, IconButton, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import eventLogo from "../assets/cosmic_pursuit.png";
import HelpIcon from "../assets/help_icon.svg";
import LeaderBoardIcon from "../assets/leaderboard_icon.svg";
import MapIcon from "../assets/map_icon.svg";
import { InfoModal } from "./ClueModal";
import { LeaderModal } from "./LeaderBoardModal";
import { MapModal } from "./MapModal";
import { TeamModal } from "./teamModal";
import PowerIcon from "../assets/power-off-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["uid"]);
  const [showClue, setshowClue] = useState(false);
  const [leaderCallNo, setleaderCallNo] = useState(0);
  const [showLeader, setshowLeader] = useState(false);
  const [showMap, setshowMap] = useState(false);
  const[showTeam,setShowTeam]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()

  function handleLogout(event) {
    event.preventDefault();
    setLoading(true);
    // console.log("teamId:", teamId);
    // console.log("password:", password);
    removeCookie("uid");
    setLoading(false);
    
    
  }
 

  const showClueModal = (event) => {
    setshowClue(true);
  };

  const showMapModal = (event) => {
    setshowMap(true);
  };

  const showTeamModal=(event)=>{
    setShowTeam(true);
  }

  const showLeaderModal = (event) => {
    setleaderCallNo(leaderCallNo + 1);
    setshowLeader(true);
  };

  const hideModal = (event) => {
    setshowClue(false);
    setshowMap(false);
    setshowLeader(false);
    setShowTeam(false);
  };
  return (
    <Flex w="100%" pos="fixed" zIndex="100" px="2">
      
      <Flex
        position="relative"
        pr={3}
        mt={2}
        align="center"
        // bgColor={["none","none","blue.50"]}
        w="100%"
        justify="flex-end"
      >
        <Flex position="relative" pr={3} justify="flex-end">
          <IconButton
            isDisabled={cookies["uid"] ? false : true}
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={showClueModal}
          >
            <Image height="5vh" src={HelpIcon}></Image>
          </IconButton>
        </Flex>

        <Flex position="relative" pr={3} justify="flex-end">
          <IconButton
            isDisabled={cookies["uid"] ? false : true}
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={showTeamModal}
          >
            <Image height="5vh" src={MapIcon}></Image>
          </IconButton>
        </Flex>
<Flex position="relative" pr={3} justify="flex-end">
          <IconButton
            isDisabled={cookies["uid"] ? false : true}
            colorScheme="whiteAlpha"
            isRound="true"
            onClick={handleLogout}
          >
            <Image height="5vh" src={PowerIcon}></Image>
          </IconButton>
        </Flex>
        

        <InfoModal show={showClue} handleClose={hideModal}></InfoModal>
        <TeamModal show={showTeam} handleClose={hideModal}></TeamModal>
        
      </Flex>
    </Flex>
  );
};

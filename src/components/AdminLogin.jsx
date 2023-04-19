import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { HelpModal } from "./helpModal";

import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import MainPanel from "./MainPanel";
import MainPanelChild from "./MainPanelChild";
import PageBackdrop from "./PageBackdrop";

export const AdminLogin = () => {
  return (
    <MainPanel>
      <MainPanelChild>
        <VStack height="97%" width="90%" justify="center" pt="30%">
          <LoginHeader />
          <AdminLoginForm />
        </VStack>
      </MainPanelChild>
    </MainPanel>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading color={"white"} size="l">
        Welcome, Admin
      </Heading>
    </Box>
  );
};

const AdminLoginForm = () => {

  const [password, setpassword] = useState();
  const[email,setEmail]=useState();
  const [uid,setUid]=useState();
  const navigate = useNavigate();
  const [showHelp, setshowHelp] = useState(false);

  const axios = require("axios").default;
  const serverUrl = "https://huntreasure-api.onrender.com" || "";
  const [isLoading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["uid"]);

  // When the page loads, check for UID, if present that means
  // the user has logged in, so we can redirect them to the gamescreen
  // if (cookies["uid"]) {
  //   console.log("Already logged in!");
  //   <Navigate to="/play" />;
  // }

  const showHelpModal = (event) => {
    event.preventDefault();
    setshowHelp(true);
  };

  const hideModal = (event) => {
    setshowHelp(false);
  };

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    // console.log("teamId:", teamId);
    // console.log("password:", password);
    axios
      .post(`${serverUrl}/isAdmin`, {
        uid:uid,
        email:email,
       // teamNo: parseInt(teamId) || 0,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          setCookie("uid", response.data.uid, {
            path: "/",
          });
          navigate("/adminDashBoard");
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status !== 200 && error.response.data !== undefined)
          alert(error.response.data.message);
        else alert(error.message);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function handleLogout(event) {
    event.preventDefault();
    setLoading(true);
    // console.log("teamId:", teamId);
    // console.log("password:", password);
    removeCookie("uid");
    setLoading(false);
  }

  function handleContinue(event) {
    event.preventDefault();
  }

  return (
   
    <Box my={8} textAlign="left">
      {cookies["uid"] ? (
        <VStack spacing="25">
          <Link to="/">
            <Button colorScheme="blue">Continue</Button>
          </Link>
          <Button colorScheme="red" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      ) : (
        <form>
          <FormControl
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            isRequired
          >
            <FormLabel color={"white"}>Email</FormLabel>
            <Input
              type="mail"
              placeholder="Enter your Team ID"
              color={"white"}
            />
          </FormControl>

          <FormControl
            mt={4}
            onChange={(event) => setpassword(event.target.value)}
            value={password}
            isRequired
          >
            <FormLabel color={"white"}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              color={"white"}
            />
          </FormControl>

           <FormControl
            mt={4}
            onChange={(event) => setUid(event.target.value)}
            value={uid}
            isRequired
          >
            <FormLabel color={"white"}>User ID</FormLabel>
            <Input
              type="text"
              placeholder="Enter your userId"
              color={"white"}
            />
          </FormControl>

          <Button
            width="full"
            mt={4}
            onClick={handleLogin}
            isLoading={isLoading}
            variant="solid"
            background="blue.600"
          >
            Sign In
          </Button>

          
          <Center pt="1rem">
            <button
              onClick={showHelpModal}
              style={{
                textDecoration: "underline",
                alignItems: "center",
                fontSize: 10,
              }}
            >
              {" "}
            Want Help?Click Here
            </button>
          </Center>
        </form>
      )}
      <HelpModal show={showHelp} handleClose={hideModal}></HelpModal>
    </Box>

  );
};

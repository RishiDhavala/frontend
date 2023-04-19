import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import GamePage from "./pages/gamePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { Admin } from "./pages/adminPage";
import { AdminLogin } from "./components/AdminLogin";
import AdminLoginPage from "./pages/adminLogin";

const App = () => {
  const [cookies] = useCookies(["uid"]);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: "white",
        },
        a: {
          color: "gray.200",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/admin" element={<AdminLoginPage/>}/>
          <Route exact path="/adminDashboard" element={<Admin/>}/>
          <Route
            exact
            path="/"
            element={!cookies["uid"] ? <LoginPage /> : <GamePage />}
          />
        </Routes>


        <Footer />
        
      </Router>
    </ChakraProvider>
  );
};

export default App;

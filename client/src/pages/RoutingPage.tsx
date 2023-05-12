import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import CommunityList from "./CommunityList";
import MypageProfile from "./MypageProfile";
import Home from "./Home";
import Navbar from "../components/NavBar";
import Signup from "./Signup";
import Login from "./Login";
import PostDetail from "./PostDetail";
import CreatePost from "./CreatePost";
import MypageBookmark from "./MypageBookmark";

function RoutingPage() {
   const { pathname } = useLocation();
   const [condition, setCondition] = useState(true);
   useEffect(() => {
      if (pathname === "/signup" || pathname === "/login") setCondition(false);
      else setCondition(true);
   }, [pathname]);
   return (
      <Container>
         <div className="nav">{condition ? <Navbar /> : null}</div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myprofile" element={<MypageProfile />} />
            <Route path="/bookmark" element={<MypageBookmark />} />
            <Route path="/communitylist" element={<CommunityList />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<PostDetail />} />
         </Routes>
      </Container>
   );
}

export default RoutingPage;

const Container = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   position: relative;
   transform: rotate(0);
   padding-left: 300px;
   .nav {
      display: flex;
      position: relative;
      /* flex-direction: column; */
   }
`;

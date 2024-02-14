import NavbarComponent from "./components/Navbar"
import MainPoll from "./pages/Polls/MainPoll"
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import MainCommunity from "./pages/Communities/MainCommunity";
import CommunityPage from "./pages/Communities/CommunityPage"; // Import the CommunityPage component

const Container = styled.div`
  padding: 0;
  margin: 0;
`

export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} /> {/* Use `index` for the default route */}
              <Route path="polls" element={<MainPoll />} />
              <Route path="communities" element={<MainCommunity />} />
              <Route path="communities/:communityId" element={<CommunityPage />} /> {/* Dynamic route */}
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </Container>
  )
}

import Home from "../Home/Home"
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer"
import Login from "../Login/Login";
import Bills from "../Bills/Bills";
import { Routes, Route} from 'react-router';

export default function App() {
  return (<>

    <NavBar />
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bills" element={<Bills />} />
    </Routes>
    <Footer />

  </>
  )
}
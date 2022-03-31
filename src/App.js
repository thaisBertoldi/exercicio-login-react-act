import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";
import Address from "./pages/Address";
import CreateUser from "./pages/CreateUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/address" element={<Address />} />
              {/* <Route path="/create-user" element={<CreateUser />} /> */}
              <Route path='/create-user' element={<CreateUser />}>
                <Route path=':id' element={<CreateUser />} />
              </Route>
            </Routes>
            <Footer />
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

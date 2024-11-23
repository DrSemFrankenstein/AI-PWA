import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Breadcrumb } from "antd";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ThemeToggle from "./Components/ThemeToggle";
import ScreenMode from "./Components/ScreenMode";
import DrawerMenu from "./Components/DrawerMenu"; // Import DrawerMenu
import "./App.css"; // Assuming this includes the styles
import MenuItems from "./assets/MenuItems";
import Tester from "./Pages/APITester";
import APITester from "./Pages/APITester";
import Settings from "./Pages/Settings";
import AI from "./Pages/AI";

function App() {
  return (
    <>
      <ScreenMode />{" "}
      <div>
        {/* Static Breadcrumb Navigation and Drawer Menu for Small Screens */}
        <div
          className="breadcrumb-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Breadcrumb for larger screens */}
          <div className="breadcrumb-for-large">
            <Breadcrumb style={{ margin: 0 }} items={MenuItems} />
          </div>

          <ThemeToggle />

          {/* Drawer Menu for smaller screens */}
          <div className="breadcrumb-for-small">
            <DrawerMenu />
          </div>
        </div>

        {/* Routes with margin-top for content */}
        <div className="body-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<APITester />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

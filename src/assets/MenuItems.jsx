// MenuItems.js (or MenuItems.jsx)
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  BugOutlined,
  CarOutlined,
  ApiOutlined,
  SettingOutlined,
  OpenAIOutlined,
} from "@ant-design/icons";

const MenuItems = [
  {
    title: <Link to="/">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    title: <Link to="/about">About</Link>,
    icon: <InfoCircleOutlined />,
  },
  {
    title: <Link to="/test">APITester</Link>,
    icon: <ApiOutlined />,
  },
  {
    title: <Link to="/ai">AI</Link>,
    icon: <OpenAIOutlined />,
  },
  {
    title: <Link to="/test2">Tester</Link>,
    icon: <BugOutlined />,
  },
  {
    title: <Link to="/settings">Settings</Link>,
    icon: <SettingOutlined />,
  },
  // {
  //   title: <Link to="/carplay">CarPlay</Link>,
  //   icon: <CarOutlined />,
  // },
];

export default MenuItems;

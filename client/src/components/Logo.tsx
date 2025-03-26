import { Image } from "@mantine/core";
import logo from "/LogoFruity.svg";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Image
      onClick={handleClick}
      draggable="false"
      src={logo}
      alt="logo"
      width={300}
      height={50}
    />
  );
};
export default Logo;

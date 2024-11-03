import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <StyledHeaderMenu>
        <li>
          <ButtonIcon>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          {/* <DarkModeToggle /> */}
          {/* DARK */}
        </li>
        <li>
          <Logout />
        </li>
      </StyledHeaderMenu>
    </StyledHeader>
  );
}

export default Header;

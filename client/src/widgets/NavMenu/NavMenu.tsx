"use client";
import { type } from "os";
import {
  Container,
  Doc,
  FlexContainer,
  Help,
  Icon,
  KingIc,
  Kruk,
  Links,
  Menu,
  Prof,
  Settings,
} from "./style";
import { ReactNode } from "react";

interface Props {
  stateMenu: boolean;
  setStateMenu: (stateMenu: boolean) => any;
}
type LinksType = {
  id: number;
  href: string;
  icon: ReactNode;
  text: string;
};
const dataLinks: LinksType[] = [
  {
    id: 1,
    href: "/testing",
    icon: (
      <Kruk
        dangerouslySetInnerHTML={{
          __html: '<span class="red">â</span>[5',
        }}
      ></Kruk>
    ),
    text: "Выучи знамёна",
  },
  {
    id: 2,
    href: "/profile",
    icon: <Prof />,
    text: " Мой профиль",
  },
  {
    id: 3,
    href: "/rating",
    icon: <KingIc />,
    text: "Рейтинг",
  },
  {
    id: 4,
    href: "/documentation",
    icon: <Doc />,
    text: "Доукументация",
  },
  {
    id: 5,
    href: "/help",
    icon: <Help />,
    text: "Поддержка",
  },
  {
    id: 6,
    href: "/settings",
    icon: <Settings />,
    text: "Настройки",
  },
];
export default function NavMenu({ stateMenu, setStateMenu }: Props) {
  return (
    <Menu $stateMenu={stateMenu}>
      <Container>
        <FlexContainer>
          {dataLinks.map((e) => {
            return (
              <Links
                key={e.id}
                onClick={() => {
                  setStateMenu(!stateMenu);
                }}
                href={e.href}
              >
                {e.icon}
                {e.text}
              </Links>
            );
          })}
        </FlexContainer>
      </Container>
    </Menu>
  );
}

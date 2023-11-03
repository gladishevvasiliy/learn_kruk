"use client";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { BiPencil } from "react-icons/bi";

import React, { useEffect } from "react";
import { Kruk } from "@/widgets/NavMenu/style";
import { useDeleteTestMutation, useGetTestsQuery } from "@/redux/api/testApi";
import { Body, Container, ContainerButton, ListContainer, Text } from "./style";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function TestList() {
  const router = useRouter();
  const { data } = useGetTestsQuery();
  const [deleteTest, { isError, isSuccess, error }] = useDeleteTestMutation();

  return (
    <Container>
      {data?.data.tests &&
        data?.data.tests.map(({ _id, icon, name }) => (
          <ListContainer key={_id}>
            <Kruk
              dangerouslySetInnerHTML={{
                __html: icon,
              }}
            ></Kruk>
            <Text>{name}</Text>
            <IconButton
              edge="end"
              aria-label="delete"
              color="info"
              onClick={() => router.push(`/settings/${_id}`)}
            >
              <BiPencil>
                {/* <Link href={`/settings/${_id}`}></Link> */}
              </BiPencil>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              color="error"
              onClick={() => deleteTest(_id)}
            >
              <MdDeleteOutline />
            </IconButton>
          </ListContainer>
        ))}
    </Container>
  );
}

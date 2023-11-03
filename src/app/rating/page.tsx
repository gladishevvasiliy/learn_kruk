"use client";

import {
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Container, Item } from "./style";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default function UsersList() {
  const { data } = useGetUsersQuery();
  console.log(data);

  const usersRating = data?.data.users.map(item => ({
    ...item,
    score: item.statistics?.reduce((prev, current) => {
      return prev + current.correctAnswers
    }, 0) || 0
  }))

  usersRating?.sort((curr, next) => {
    if (curr.score > next.score) {
      return -1;
    }

    if (curr.score < next.score) {
      return 1;
    }

    return 0;

  })

  return (
    <>
      {usersRating && (
        <Container>
          <List>
            {usersRating.map((e) => (
              <ListItem key={e._id}>
                <Link href={`/profile/${e._id}`} style={{ width: '100%' }}>
                  <Item>
                    <div>
                      {e.name}
                    </div>
                    <div>
                      {e.score}
                    </div>
                  </Item>
                </Link>
              </ListItem>
            ))}
          </List>
        </Container>
      )}
    </>
  );
}

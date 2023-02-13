// PLUGINS IMPORTS //
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { Avatar } from "components/molecules";

// EXTRA IMPORTS //
import { getUserCookie } from "utils";
import { EAvatar } from "types/pages";
import styles from "./nav-user.module.css";
import { useAppSelector } from "app/store";
import { useGetMeMutation } from "features/slices/authSlice";

/////////////////////////////////////////////////////////////////////////////
type NavUserProps = {};

const NavUser = (props: NavUserProps) => {
  // get state from userSlice
  const { user } = useAppSelector(state => state.userState);

  return (
    <article className={`${styles["nav-user-wrapper"]}`}>
      <section>
        <Avatar size={EAvatar.SMALL} rounded />
      </section>
      <section className={`${styles["user-info"]}`}>
        <Typography
          variant="subtitle1"
          sx={{
            marginLeft: ".2em",
          }}
        >
          u/{user.username}
        </Typography>
        <ArrowDropDownOutlinedIcon />
      </section>
    </article>
  );
};

export default NavUser;

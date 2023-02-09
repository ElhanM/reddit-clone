// PLUGINS IMPORTS //
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import { Avatar } from "components/molecules";

// EXTRA IMPORTS //
import { EAvatar } from "types/pages";
import styles from "./nav-user.module.css";

/////////////////////////////////////////////////////////////////////////////
type NavUserProps = {};

const NavUser = (props: NavUserProps) => {
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
          u/elco
        </Typography>
        <ArrowDropDownOutlinedIcon />
      </section>
    </article>
  );
};

export default NavUser;

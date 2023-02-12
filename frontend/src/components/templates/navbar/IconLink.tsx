// PLUGINS IMPORTS //
import { MenuItem } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// COMPONENTS IMPORTS //
import { PlainLink, StyledIconButton } from "components/atoms";

// EXTRA IMPORTS //
import { ELink } from "types/pages";

/////////////////////////////////////////////////////////////////////////////

type CreatePostLinkProps = {
  link: ELink;
  handleClick?: () => void;
  linkOnly?: boolean;
  renderIconText?: boolean;
  lgScreenRenderText?: boolean;
};

// this array can take icons that we use on lg screens and render them, and also on sm screens it knows to not render the icons
// but instead display the icon text in the dropdown menu instead
// and it can also take the links we use in the user dropdown menu that do not have icons and only display them in the seperate user dropdown menu on lg screen
// and on sm screens it takes these links and displays them in the sm screen's dropdown menu together with the icon texts
const iconLinks: {
  icon?: JSX.Element;
  ariaLabel?: string;
  to: string;
  text: string;
}[] = [
  {
    icon: <AddOutlinedIcon />,
    ariaLabel: "add-post",
    to: "/create-post",
    text: "Create Post",
  },
  {
    to: "#",
    text: "Profile",
  },
  {
    to: "#",
    text: "My account",
  },
];


// this component makes the navbar navigation icons and other links easier to manage by rendering them all using one component
// this way when I want to change something about them or add more of them or add a link to them, I don't have to change multiple files
// i just have to add them to the array above and the component will render them
const CreatePostLink = ({ link, handleClick, linkOnly, renderIconText, lgScreenRenderText }: CreatePostLinkProps) => {
  let content: JSX.Element;

  if (link === ELink.ICON) {
    content = (
      <>
        {iconLinks.map(
          iconLink =>
            // only render if iconLink.icon exists and do not render if linkOnly is true
            // linkOnly = true means that we do not want the icon rendered in the menu on small screen
            iconLink.icon &&
            !linkOnly && (
              <PlainLink to={iconLink.to}>
                <StyledIconButton ariaLabel={iconLink.ariaLabel} icon>
                  {iconLink.icon}
                </StyledIconButton>
              </PlainLink>
            ),
        )}
      </>
    );
  } else if (link === ELink.TEXT) {
    content = (
      <>
        {iconLinks.map(
          iconLink =>
            // here basically the logic we need is the following
            // if we are on lg screen, if we have an icon in the navbar, we do not need to render it again in the user dropdown menu
            // but on sm screen, we need to render the text in the dropdown menu regardless
            (renderIconText || (lgScreenRenderText && !iconLink.icon)) && (
              <PlainLink to={iconLink.to}>
                <MenuItem onClick={handleClick}>{iconLink.text}</MenuItem>
              </PlainLink>
            ),
        )}
      </>
    );
  }

  return <>{content}</>;
};

export default CreatePostLink;

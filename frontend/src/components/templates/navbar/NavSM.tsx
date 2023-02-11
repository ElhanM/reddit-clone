// PLUGINS IMPORTS //
import MoreIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type NavSMProps = {
  handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  mobileMenuId: string;
};

const NavSM = ({ handleMobileMenuOpen, mobileMenuId }: NavSMProps) => {
  return (
    <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
      <MoreIcon />
    </IconButton>
  );
};

export default NavSM;

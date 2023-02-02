// PLUGINS IMPORTS //
import { parseISO, formatDistanceToNow } from "date-fns";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./time-ago.module.css";
/////////////////////////////////////////////////////////////////////////////

type Props = {
  timestamp: string;
};

const TimeAgo = ({ timestamp }: Props) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span className={`${styles["header-rest"]}`}>
      <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;

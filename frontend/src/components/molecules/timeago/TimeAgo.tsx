// PLUGINS IMPORTS //
import { parseISO, formatDistanceToNow } from "date-fns";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./time-ago.module.css";
/////////////////////////////////////////////////////////////////////////////

type TimeAgoProps = {
  timestamp: string;
  noStyles?: boolean;
};

const TimeAgo = ({ timestamp, noStyles }: TimeAgoProps) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return <span className={`${noStyles || styles["header-rest"]}`}>{noStyles ? <span>{timeAgo}</span> : <i>{timeAgo}</i>}</span>;
};

export default TimeAgo;

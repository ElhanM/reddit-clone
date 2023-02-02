// PLUGINS IMPORTS //
import { parseISO, formatDistanceToNow } from "date-fns";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

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
    <span>
      <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;

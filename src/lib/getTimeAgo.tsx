export const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const commentDate = new Date(createdAt);
    const timeDifference = now.getTime() - commentDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
  
    // Check if the date is within the last two days
    if (seconds < 172800) {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
  
      // Check if it's today
      if (commentDate.toDateString() === now.toDateString()) {
        const hours = commentDate.getHours();
        const minutes = commentDate.getMinutes();
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `Today at ${formattedHours}:${formattedMinutes} ${amOrPm}`;
      }
  
      // Check if it's yesterday
      else if (commentDate.toDateString() === yesterday.toDateString()) {
        const hours = commentDate.getHours();
        const minutes = commentDate.getMinutes();
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `Yesterday at ${formattedHours}:${formattedMinutes} ${amOrPm}`;
      }
    }
  
    // For dates older than two days, display the full date and time
    const formattedDate = commentDate.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  
    return formattedDate;
  };
  
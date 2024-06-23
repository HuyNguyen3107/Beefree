// create a function with parameter time and return a day since the time passed in the parameter til now
export const timeSince = (time) => {
  const now = new Date();
  const timePassed = now - new Date(time);
  const seconds = Math.floor(timePassed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  return `${seconds} seconds ago`;
};

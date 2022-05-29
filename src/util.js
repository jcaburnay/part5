export const compareLikes = (a, b) => {
  if (a.likes < b.likes) {
    return 1;
  } else if (a.likes > b.likes) {
    return -1;
  }
  return 0;
};

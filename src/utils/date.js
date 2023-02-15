const getMMDD = () => {
  const d = new Date();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();

  const str = `${[(mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join(
    ""
  )}`;
  return str;
};

export { getMMDD }

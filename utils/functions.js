const getDayOfWeekWithDate = (dateString) => {
  const [year, month, day] = dateString
    .split("-")
    .map((num) => parseInt(num, 10));

  const date = new Date(year, month - 1, day + 1);

  const options = { weekday: "long", day: "2-digit", month: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};

export default getDayOfWeekWithDate;

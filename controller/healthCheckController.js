function formatDate(date) {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}
const check = async (req, res, next) => {
  const currentDate = new Date();
  res.send(formatDate(currentDate))
};

const csrfToken = (req, res) => {
  // Send the CSRF token as JSON
 // res.json({ CSRFToken: req.CSRFToken() });
};


module.exports = {
    check,
    csrfToken
};

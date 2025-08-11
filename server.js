const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));

app.use(express.static(__dirname));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
// Motivational quotes
const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. – Winston Churchill",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "Dream big and dare to fail. – Norman Vaughan",
  "Do something today that your future self will thank you for.",
];

// Goals rotation
const goals = [
  { label: "3 Days", days: 3 },
  { label: "1 Week", days: 7 },
  { label: "2 Weeks", days: 14 },
];

let currentGoalIndex = 0;
let goalStartDate = new Date();

app.get("/motivation", (req, res) => {
  const goal = goals[currentGoalIndex];

  const today = new Date();
  const daysPassed = Math.floor(
    (today - goalStartDate) / (1000 * 60 * 60 * 24)
  );
  const progress = Math.min((daysPassed / goal.days) * 100, 100);

  if (progress >= 100) {
    currentGoalIndex = (currentGoalIndex + 1) % goals.length;
    goalStartDate = today;
    progress = 0;
  }

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  res.json({
    quote,
    goal: goals[currentGoalIndex],
    progress: Math.round(progress),
  });
});

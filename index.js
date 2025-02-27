const express = require("express");

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(bodyParser.json());

const meals = [
  { id: 1, title: "Sushi", when: "2025-05-10 19:00:00" },
  { id: 2, title: "Burger", when: "2025-02-15 18:30:00" },
  { id: 3, title: "Steak", when: "2025-06-05 20:00:00" },
];

// Get future meals
apiRouter.get("/future-meals", (req, res) => {
  res.json(meals.filter((meal) => new Date(meal.when) > new Date()));
});

// Get past meals
apiRouter.get("/past-meals", (req, res) => {
  res.json(meals.filter((meal) => new Date(meal.when) < new Date()));
});

// Get all meals (sorted by ID)
apiRouter.get("/all-meals", (req, res) => {
  res.json([...meals].sort((a, b) => a.id - b.id));
});

// Get first meal (by ID)
apiRouter.get("/first-meal", (req, res) => {
  res.json(meals.reduce((min, meal) => (meal.id < min.id ? meal : min)));
});

// Get last meal (by ID)
apiRouter.get("/last-meal", (req, res) => {
  res.json(meals.reduce((max, meal) => (meal.id > max.id ? meal : max)));
});

app.use("/api", apiRouter); // Correctly mount the API router

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

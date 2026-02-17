const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const loadData = () => {
  const dataDir = path.join(__dirname, "../data");
  const files = fs.readdirSync(dataDir);
  let allTerms = [];

  files.forEach(file => {
    const content = JSON.parse(
      fs.readFileSync(path.join(dataDir, file))
    );
    allTerms = allTerms.concat(content);
  });

  return allTerms;
};

app.get("/api/terms", (req, res) => {
  const terms = loadData();
  res.json(terms);
});

app.get("/api/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const terms = loadData();

  const filtered = terms.filter(term =>
    term.term.toLowerCase().includes(query)
  );

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Mogu server running on http://localhost:${PORT}`);
});

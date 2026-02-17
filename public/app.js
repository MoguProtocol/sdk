const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

const fetchTerms = async (query = "") => {
  const endpoint = query
    ? `/api/search?q=${query}`
    : "/api/terms";

  const res = await fetch(endpoint);
  const data = await res.json();
  displayTerms(data);
};

const displayTerms = (terms) => {
  resultsDiv.innerHTML = "";

  terms.forEach(term => {
    const div = document.createElement("div");
    div.className = "term";
    div.innerHTML = `
      <h3>${term.term}</h3>
      <p><strong>Category:</strong> ${term.category}</p>
      <p>${term.definition}</p>
    `;
    resultsDiv.appendChild(div);
  });
};

searchInput.addEventListener("input", (e) => {
  fetchTerms(e.target.value);
});

fetchTerms();

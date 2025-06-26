document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.getElementById("query").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Carregando...";

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    const books = data.docs.slice(0, 10); // Limita a 10 resultados

    resultsDiv.innerHTML = books.map((book) => {
      const title = book.title || "Sem título";
      const author = book.author_name ? book.author_name.join(", ") : "Autor desconhecido";
      const year = book.first_publish_year || "Ano desconhecido";
      const coverId = book.cover_i;
      const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
      const link = book.key ? `https://openlibrary.org${book.key}` : "#";

      return `
        <div class="book">
          ${coverUrl ? `<img src="${coverUrl}" alt="Capa do livro">` : ""}
          <div class="book-title"><a href="${link}" target="_blank" rel="noopener">${title}</a></div>
          <div><strong>Autor:</strong> ${author}</div>
          <div><strong>Ano:</strong> ${year}</div>
        </div>
      `;
    }).join("");

  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    resultsDiv.innerHTML = "<p>Ocorreu um erro ao buscar os livros.</p>";
  }
});

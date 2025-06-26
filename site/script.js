document.getElementById("search-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = document.getElementById("query").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Carregando...</p>";

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.docs.length) {
      resultsDiv.innerHTML = "<p>Nenhum livro encontrado.</p>";
      return;
    }

    const books = data.docs
      .filter(book => book.title && book.author_name)
      .sort((a, b) => (a.first_publish_year || 9999) - (b.first_publish_year || 9999));

    resultsDiv.innerHTML = books.map(book => `
      <div class="book">
        <div class="book-title">${book.title}</div>
        <div>Autor: ${book.author_name.join(", ")}</div>
        <div>Ano: ${book.first_publish_year || "Desconhecido"}</div>
      </div>
    `).join("");
  } catch (error) {
    resultsDiv.innerHTML = "<p>Erro ao buscar livros. Tente novamente mais tarde.</p>";
    console.error(error);
  }
});

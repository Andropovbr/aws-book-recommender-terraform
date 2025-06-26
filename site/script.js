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

    resultsDiv.innerHTML = books.map(book => {
      const title = book.title;
      const author = book.author_name.join(", ");
      const year = book.first_publish_year || "Desconhecido";
      const cover = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null;
      const link = book.key ? `https://openlibrary.org${book.key}` : "#";

      return `
        <div class="book">
          ${cover ? `<img src="${cover}" alt="Capa de ${title}" style="height:150px; float:left; margin-right:10px;" />` : ""}
          <div class="book-title"><a href="${link}" target="_blank">${title}</a></div>
          <div>Autor: ${author}</div>
          <div>Ano: ${year}</div>
          <div style="clear:both;"></div>
        </div>
      `;
    }).join("");
  } catch (error) {
    resultsDiv.innerHTML = "<p>Erro ao buscar livros. Tente novamente mais tarde.</p>";
    console.error(error);
  }
});

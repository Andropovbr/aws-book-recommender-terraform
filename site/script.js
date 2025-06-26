document.getElementById("search-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const query = document.getElementById("search-input").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Buscando livros...</p>";

  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }

    const normalizedQuery = query.toLowerCase();

    const books = data.docs
      .filter(book => book.title && book.title.toLowerCase().includes(normalizedQuery))
      .slice(0, 10); // Limita aos 10 primeiros resultados filtrados

    if (books.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhum resultado corresponde exatamente ao título pesquisado.</p>";
      return;
    }

    resultsDiv.innerHTML = books.map(book => {
      const title = book.title || "Sem título";
      const author = book.author_name ? book.author_name.join(", ") : "Autor desconhecido";
      const year = book.first_publish_year || "Ano desconhecido";
      const cover = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/128x180?text=Sem+Capa";
      const link = book.key ? `https://openlibrary.org${book.key}` : "#";

      return `
        <div class="book">
          <img src="${cover}" alt="Capa de ${title}">
          <div>
            <h3><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h3>
            <p><strong>Autor:</strong> ${author}</p>
            <p><strong>Ano de publicação:</strong> ${year}</p>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    resultsDiv.innerHTML = "<p>Erro ao buscar livros. Tente novamente mais tarde.</p>";
    console.error(error);
  }
});

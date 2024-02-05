import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { BooksList } from "./components/BooksList";
import { BooksFilters } from "./components/BooksFilters";
import { BooksData } from "./api/api";
import Footer from "./components/Footer";

function App() {
  const [availableBooks, setAvailableBooks] = useLocalStorage("availableBooks", []);
  const [readingList, setReadingList] = useLocalStorage("readingList", []);
  const [genre, setGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagesNumber, setPagesNumber] = useState(null);

  // Función asincrónica para obtener datos de libros y actualizar el estado de libros disponibles.
  const fetchData = async () => {
    const library = await BooksData();
    if (library) {
      setAvailableBooks(library);
    } else {
      console.error("Erroor: No se pudo obtener la lista de libros");
    }
  };

  // Efecto secundario para cargar datos de libros si la lista de libros disponibles está vacía.
  useEffect(() => {
    if (availableBooks.length === 0) {
      fetchData();
    }
  }, [availableBooks]);

  // Cálculo de filtros iniciales para géneros y número de páginas.
  const filters = availableBooks.reduce(
    (result, curr) => {
      const book = curr.book;

      result.genres.push(book.genre);
      book.pages > result.pages.max
        ? (result.pages.max = book.pages)
        : (result.pages.min = book.pages);
      return result;
    },
    { genres: [], pages: { min: +Infinity, max: -Infinity } },
  );
  filters.genres = ["Todos", ...new Set(filters.genres)];

  //? Funcion para remover un libro de la lista de lectura
  const removeBook = (isbn, list) => {
    let bookIndex = null;
    const filteredList = list.filter((el, index) => {
      if (el.book["ISBN"] === isbn) {
        bookIndex = index;
        return false;
      }

      return true;
    });

    return [bookIndex, filteredList];
  };

  // Funciones para agregar o remover un libro a la lista de lectura
  const handleAddToReadingList = (isbn) => {
    const [bookIndex, filteredList] = removeBook(isbn, availableBooks);
    setAvailableBooks(filteredList);
    setReadingList([availableBooks[bookIndex], ...readingList]);
  };

  const handleRemoveFromReadingList = (isbn) => {
    const [bookIndex, filteredList] = removeBook(isbn, readingList);
    setReadingList(filteredList);
    setAvailableBooks([readingList[bookIndex], ...availableBooks]);
  };

  // Función para filtrar libros según términos de búsqueda, género y número de páginas.
  function filterBooks(list) {
    let filteredList = list;

    if (searchTerm) {
      filteredList = filteredList.filter((el) => {
        return new RegExp(searchTerm, "i").test(el.book.title);
      });
    }
    if (genre) {
      filteredList = filteredList.filter((el) => {
        return el.book.genre === genre;
      });
    }
    if (pagesNumber) {
      filteredList = filteredList.filter((el) => el.book.pages <= pagesNumber);
    }

    return filteredList;
  }

  // Manejadores de cambios en la interfaz de usuario.
  const handleSearchChange = (value) => setSearchTerm(value);
  const handleFilterPages = (value) => setPagesNumber(value);
  const handleGenreChange = (e) => {
    const selectedOption = e.target.value === "Todos" ? "" : e.target.value;
    setGenre(selectedOption);
  };

  // Filtrado de libros disponibles excluyendo los que ya están en la lista de lectura.
  const availableBooksToDisplay = filterBooks(availableBooks).filter(
    (book) =>
      !readingList.some((readingBook) => readingBook.book.ISBN === book.book.ISBN),
  );

  const tabsData = [
    {
      name: `Libros disponibles (${availableBooksToDisplay.length})`,
      content: (
        <BooksList
          data={filterBooks(availableBooksToDisplay)}
          onFavoriteClick={handleAddToReadingList}
        />
      ),
    },
    {
      name: `Lista de lectura (${readingList.length})`,
      content: (
        <BooksList
          data={filterBooks(readingList)}
          isReadingList={true}
          onFavoriteClick={handleRemoveFromReadingList}
        />
      ),
    },
  ];

  return (
    <section className="container max-w-7xl">
      <Header />
      <BooksFilters
        onSearchChange={handleSearchChange}
        onGenreChange={handleGenreChange}
        onFilterPages={handleFilterPages}
        genres={filters.genres}
        pages={filters.pages}
      />
      <Tabs data={tabsData} />
      <Footer />
    </section>
  );
}

export default App;

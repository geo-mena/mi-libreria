## Mi Libreria - Prueba Tenica

En resumen general, **Mi Librería** es un proyecto de prueba técnica con una lista limitada de libros, todos los detalles fueron proporcionados por la API de jelou.

### Características principales:

- Muestra una lista de todos los libros disponibles, junto con sus respectivas portadas, título, reseña, números de páginas y género.
- Permite a los usuarios crear una lista de lectura a partir de los libros disponibles.
- Permite a los usuarios buscar un libro, si no se encuentra, se mostrará un mensaje indicando que no está disponible.
- Permite a los usuarios filtrar la lista de libros disponibles por género.
- Persistir los datos de la lista de lectura en el almacenamiento local del navegador. Al recargar la página, la lista de lectura se mantiene.
- Vale la pena señalar que la aplicación es totalmente **responsive** en la mayoría de los dispositivos.

### Instalación

1. Clonar el repositorio a su máquina local utilizando:

```sh
git clone https://github.com/geo-mena/mi-libreria.git
```

2. Diríjase al directorio del proyecto con el siguiente comando:

```sh
cd mi-libreria
```

3. Instale las dependencias del proyecto:

```sh
npm install
```

### Running the Project

To start the development server, use the command:

```sh
npm run dev
```

To build the project for production, use the command:

```sh
npm run build
```

To start the production server, use the command:

```sh
npm run start
```

### Resources

- API: It was developed in Python using Django and later deployed on **RENDER.** [See API](https://api-movies-exam.onrender.com/movies)
- DB: It was implemented in PostgreSQL and similarly deployed on **RENDER.**
- Docker: for improved API deployment.
- The project is built with **React.**
- React Router is used for navigation within the application.
- The project includes various React components, such as MovieDetail, MovieList, Loading, Footer, and Header.
- React Player is utilized for playing the trailers and summaries of the movies.
- The application's styles are written in separate CSS files for each component.
- ESLint is used for static code analysis and to identify coding issues.
- **VERCEL** is used for deploying the application: [See APP](https://en-minutos.vercel.app/)
- Also, it's worth mentioning that **POSTMAN** was used for querying and updating movies.

#### If you've made it this far, thank you very much.

> Geovanni Mena

<div align="center"><img src="https://github.com/darsaveli/Mariam/blob/main/1479814528_webarebears.gif" width="385px" align="center"></div>

import { ImBooks } from "react-icons/im";

export function Header() {
  return (
    <header className="mt-12 sm:mt-24 mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
        <span className="flex items-center">
          <ImBooks className="mr-2" />
          Mi Libreía
        </span>
      </h1>
    </header>
  );
}

import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8 p-4 border-b dark:border-gray-700">
      <h1 className="text-2xl font-bold">NOTES APP</h1>
      <div className="flex flex-row gap-4">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/notes"}>Notes</NavLink>
      </div>
    </header>
  );
}

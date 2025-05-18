import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-evenly items-center h-17 mb-3 p-4 dark:border-gray-700 bg-blue-200">
      <NavLink to="/"><h1 className="text-xl font-bold">NOTES APP</h1></NavLink>
      <div className="flex flex-row gap-10 ">
        <NavLink to={"/"} className="text-[18px]">Home</NavLink>
        <NavLink to={"/notes"} className="text-[18px]">Notes</NavLink>
      </div>
    </header>
  );
}

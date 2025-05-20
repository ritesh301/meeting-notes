import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex w-full justify-center items-center h-17 mb-3  dark:border-gray-700 bg-white">
      <div className="flex px-4 md:px-4 items-center justify-between w-[800px]">
      <NavLink to="/"><h1 className="text-xl text-black font-bold">NOTES APP</h1></NavLink>
      <div className="flex flex-row gap-5 ">
        <NavLink to={"/"} className="btn btn-accent text-[18px] hover:scale-105 ">Home</NavLink>
        {/* <button className="btn btn-accent">hello</button> */}
        <NavLink to={"/notes"} className="btn btn-accent text-[18px]  hover:scale-105">Notes</NavLink>
      </div>
      </div>
    </header>
  );
}

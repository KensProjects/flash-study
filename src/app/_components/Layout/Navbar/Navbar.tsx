import Link from "next/link";
import NavbarButtonGroup from "./NavbarButtonGroup";
import SearchBar from "./SearchBar";

export default async function Navbar() {

  return (
    <header className="w-full h-20 hidden md:flex justify-between items-center bg-blue-300 px-4 border-b-2 border-black">
        <Link href={"/"}>FLASH STUDY</Link>
        <SearchBar />
        <NavbarButtonGroup />
    </header>
  )
}

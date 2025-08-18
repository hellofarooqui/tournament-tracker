import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="h-16 font-dynapuff text-dark-brown-01 w-screen absolute top-0 left-0 bg-light-brown-01 p-4 flex justify-between">
      <Link to="/">
        <h1 className="text-2xl font-semibold">Carrom</h1>
      </Link>
      <div>
        <ul className="flex gap-x-2 text-xl">
          
          <Link to='all-tournaments'>
            <li className="border-2 border-light-brown-03 px-2 rounded-full text-light-brown-03 text-sm py-1">Tournaments</li>
          </Link>
          <li className="border-2 border-light-brown-03 px-2 rounded-full text-light-brown-03 text-sm py-1">Login</li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar
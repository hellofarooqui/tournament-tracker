import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="h-16 font-dynapuff text-yellow-01 w-screen absolute top-0 left-0 bg-purple-02 p-4 flex justify-between">
        <Link to='/'><h1 className="text-2xl">Carrom Tracker</h1></Link>
        <div>
            <ul className="flex gap-x-6 text-xl">
                <li>Home</li>
                <li>Login</li>
            </ul>
        </div>
    </div>
  )
}
export default Navbar
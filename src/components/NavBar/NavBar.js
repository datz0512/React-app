import NavBarItem from "./NavBarItem"

const navBarTitles = ['home', 'news', 'contact']

const NavBar = () => {
    return (
        <nav>
            <ul>
                {navBarTitles.map((navBarTitle) => (
                    <NavBarItem name={navBarTitle}/>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar
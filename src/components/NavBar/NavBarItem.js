
const NavBarItem = (props) => {
    return (
        <li>
            <a href={props.name === 'home' ? `/` : `/${props.name}`}>{props.name}</a>
        </li>
    )
}

export default NavBarItem
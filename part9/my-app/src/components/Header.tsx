
interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps):JSX.Element => <h1>{props.name}</h1>

export default Header
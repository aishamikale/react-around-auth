import headerPath from '../images/headerlogo.svg';

function Header() {
    return (
        <header className="header">
            <img src={headerPath} alt="Around the U.S." className="logo" />
        </header>
    );
}

export default Header;
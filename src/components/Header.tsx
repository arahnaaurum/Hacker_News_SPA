import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header(): JSX.Element {
    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">Hacker News</h1>
                <Link to={'/'}><img src="/main.png" width='50' height='50' /></Link>
            </div>
        </header>
    );
}
export default Header;
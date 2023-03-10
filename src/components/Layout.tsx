import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import "../styles/Layout.css"

function Layout(): JSX.Element {
    return (
        <>
            <div className="wrapper">
                <div className="content">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}
export default Layout;
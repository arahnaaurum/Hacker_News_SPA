import "../styles/Loader.css"
function Loader(): JSX.Element {
    return (
        <div className="lds-container">
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
export default Loader;
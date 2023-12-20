
import {Outlet} from "react-router-dom";
import _Header from "../Header/Header.tsx";
import _Footers from "../Footer/Footer.tsx";

function _Layout() {
    return (
        <>
            <header>
                <_Header/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <_Footers/>
            </footer>
        </>
    );
}

export default _Layout;
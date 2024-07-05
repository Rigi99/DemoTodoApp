import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedLayout from "./layouts/ProtectedLayout";
import DefaultLayout from "./layouts/DefaultLayout.tsx";

function App() {
    return (
        <Routes>
            <Route element={<DefaultLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
            <Route element={<ProtectedLayout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
        </Routes>
    );
}

export default App;

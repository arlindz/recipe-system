import { useState } from "react";
import Login from './Login';
import Register from "./Register";
export default function LogInPage() {
    const [logIn, setLogIn] = useState(true);
    return (
        <>
            {logIn === true ? <Login setLogIn={setLogIn} /> : <Register setLogIn={setLogIn} />}
        </>
    );
}
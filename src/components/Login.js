import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleclick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Logged in Successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container c1" style={{ marginTop: "10px" }}>
            <div className='container' style={{ maxWidth: "400px" }}>
                <h2 className='h2'>Log In</h2>
                <form onSubmit={handleclick}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            aria-describedby="emailHelp"
                            value={credentials.email}
                            onChange={onchange}
                            placeholder='Email Address'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            value={credentials.password}
                            onChange={onchange}
                            placeholder='Password'
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

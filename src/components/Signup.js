import React,{useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({name: "",email: "",password: "",cpassword: ""})
    let history = useHistory();

    const handleclick = async (e)=>{
        e.preventDefault();
            const response = await fetch(`${host}/api/auth/createuser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              }, 
              body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password, cpassword: credentials.cpassword}), 
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                // Save the auth token and redirect 
                localStorage.setItem('token', json.authtoken);
                history.push("/");
                props.showAlert("Account Created Successfully", "success");
            }
            else{
              props.showAlert("Invalid Details", "danger");
            }
    }

    const onchange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container c1" style={{ marginTop: "10px" }}>
      <div className='container' style={{ maxWidth: "400px" }}>
      <h2 className="h2">Sign Up</h2>
      <form onSubmit={handleclick}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onchange}
            placeholder="Name"
          />
            </div>
          <div className="mb-2">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onchange}
            placeholder="Email Address"
          />
          </div>
        <div className="mb-2">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onchange}
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onchange}
            minLength={5}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Signup
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;

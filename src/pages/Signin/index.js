
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8080/api/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            .then((res) => res.json())
            .then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid email');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('email', email);
                        sessionStorage.setItem('userrole', resp.role);
                        sessionStorage.setItem('userid', resp.userId); // Set user ID here
                        usenavigate('/');
                    } else {
                        toast.error('Please Enter valid credentials');
                    }
                }
            })
            .catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    };
    
    // const ProceedLoginusingAPI = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         ///implentation
    //         // console.log('proceed');
    //         let inputobj={"email": email,
    //         "password": password};
    //         fetch("https://localhost:44308/User/Authenticate",{
    //             method:'POST',
    //             headers:{'content-type':'application/json'},
    //             body:JSON.stringify(inputobj)
    //         }).then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             console.log(resp)
    //             if (Object.keys(resp).length === 0) {
    //                 toast.error('Login failed, invalid credentials');
    //             }else{
    //                  toast.success('Success');
    //                  sessionStorage.setItem('email',email);
    //                  sessionStorage.setItem('jwttoken',resp.jwtToken);
    //                usenavigate('/')
    //             }
    //             // if (Object.keys(resp).length === 0) {
    //             //     toast.error('Please Enter valid username');
    //             // } else {
    //             //     if (resp.password === password) {
    //             //         toast.success('Success');
    //             //         sessionStorage.setItem('username',username);
    //             //         usenavigate('/')
    //             //     }else{
    //             //         toast.error('Please Enter valid credentials');
    //             //     }
    //             // }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });
    //     }
    // }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>email <span className="errmsg">*</span></label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> |
                            <Link className="btn btn-success" to={'/signup'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;
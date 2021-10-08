import React,{useState} from 'react'
import { useHistory } from 'react-router'

function Login() {
    const history =useHistory()
    const [cradentials, setCradentials] = useState({email:'',password:''})
    const handleChange = (e) => {
        setCradentials({...cradentials,[ e.target.name] : e.target.value})
    }
    const userLogin = async (e) => {
        e.preventDefault()
        // API
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:cradentials.email,password:cradentials.password}),
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.token)
            history.push('/')
        }else{
            alert("Invalid cradentials")
        }
    }

    return (
        <>
            <form onSubmit={userLogin} className="container card bg-light" style={{ maxWidth: "50rem" , marginTop:"30px" }}>
                <h2 className="card-header">Login</h2>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    )

}

export default Login
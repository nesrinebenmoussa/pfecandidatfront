import { Link } from "react-router-dom";
import { register,reset } from "../features/auth/authSlice";
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'  
import React from 'react'

function Register(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name:'',
        tel:'',
        adress:''
      })
    
      const { email, password,name ,tel,adress} = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) { 
           navigate('/Login')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
          name,tel,adress
        }
    
        dispatch(register(userData)).unwrap().then(data=>{ console.log(data)}).catch(
            err=>{console.error(err)}
        )
        if(isSuccess){
            navigate('/Login')
        }
   
      }
    return(
<section className="vh-100" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: 25}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <form className="mx-1 mx-md-4" onSubmit={onSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="text"  className="form-control" onChange={onChange} name="name"/>
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="email"  className="form-control" onChange={onChange} name="email" />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="text"  className="form-control" onChange={onChange} name="adress"/>
                      <label className="form-label" htmlFor="form3Example4c">Adresse</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="number"  className="form-control" onChange={onChange} name="tel"/>
                      <label className="form-label" htmlFor="form3Example4c">Telephone</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type="password"  className="form-control" onChange={onChange} name="password"/>
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>
                 

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit    " className="btn btn-primary btn-lg">Sign Up</button>
                    
                  </div>
                  <Link to="/Login">
              
              <span>alReady have an account!</span>
            </Link>
                  
                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    )
}
export default Register
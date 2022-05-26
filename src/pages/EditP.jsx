import React from "react";
import NavBar from "./NavBar";
import { useEffect ,useState} from "react"; 
import { toast } from 'react-toastify' ;
import { useParams } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getById , update,reset} from '../features/Postulation/PostulationSlice'
 
function EditP() {
    const {id}=useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { postulations } =
    useSelector((state) => state.postulations);
   
  useEffect(() => {
    dispatch(getById(id)).unwrap().then(
      (res)=>{
     console.log(res)
        

      }
      
    )

    return () => {
      dispatch(reset());
    };
    
   
  }, [
    dispatch,
    navigate,
    
 
    
  
  ]);



    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
      
   
          
    const [formData, setFormData] = useState({
      diplome: postulations.diplome,
      datedep: postulations.datedep,
      exp:postulations.exp,
      moyfe:postulations.moyfe,
      tel:postulations.tel,
      cin:postulations.cin,
      name:postulations.name,
      lastname:postulations.lastname,
      datenaissance:postulations.datenaissance,
      email:postulations.email,
    })
    
    const { diplome,datedep,exp,moyfe,tel,cin,name,lastname,datenaissance,email } = formData




      const onSubmit = (e) => {
        e.preventDefault()
    
      const _id=postulations._id
  
        const postData = {
          diplome,datedep,exp,moyfe,tel,cin,name,lastname,datenaissance,email, _id 
        }
      console.log('3lech le',postData)
      console.log('id ', postulations._id)
      dispatch(update(postData)).unwrap().then(
        data=>{ toast.success('done')
         navigate('/')
         }).catch(
        err=>{console.error(err)}
    
    )
    

      
        }
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row gutters">
        
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName">Num Cin</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter num cin"
                        onChange={onChange}
                        defaultValue={postulations.cin}
                        name="cin"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">date de naissance</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter date"
                        onChange={onChange}
                        defaultValue={postulations.datenaissance}

                        name="datenaissance"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChange}
                        name="name"
                        placeholder="Enter name"
                        defaultValue={postulations.name}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="website">LastName</label>
                      <input
                        type="url"
                        className="form-control"
                        onChange={onChange}
                        name="lastname"
                        placeholder="ENter Last Name"
                        defaultValue={postulations.lastname}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="website">tel </label>
                      <input
                        type="url"
                        className="form-control"
                        onChange={onChange}
                        name="tel"
                        placeholder="Enter tel number"
                        defaultValue={postulations.tel}

                      />
                    </div>
                  </div>
                 
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="website">Email</label>
                      <input
                        type="url"
                        className="form-control"
                        onChange={onChange}
                        name="email"
                        defaultValue={postulations.email}

                        placeholder="Enter email adresse"
                      />
                    </div>
                  </div>
                                  </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">
                      Experience Professionelle
                    </h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Street">Diplome</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChange}
                        name="diplome"
                        placeholder="Enter diplome"
                        defaultValue={postulations.diplome}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="ciTy">Date obtention</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChange}
                        name="datedep"
                        placeholder="Enter Date"
                        defaultValue={postulations.datedep}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="sTate">experience</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={onChange}
                        name="exp"
                        placeholder="Enter experience month number"
                        defaultValue={postulations.exp}

                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="zIp">moyenne fin d'etude</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={onChange}
                        name="moyfe"
                        placeholder="Enter moyenne"
                        defaultValue={postulations.moyfe}

                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        onClick={onSubmit}
                        className="btn btn-primary"
                      >
Update                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditP;

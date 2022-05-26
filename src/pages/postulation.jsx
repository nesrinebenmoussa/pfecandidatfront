import React from "react";
import { useParams } from "react-router";
import { getAnnonceByid } from "../features/annonce/annonceSlice";
import { getRecruter } from "../features/recruter/recruterSlice";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { create, reset } from "../features/Postulation/PostulationSlice";
import { toast } from "react-toastify";

function Postulation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    diplome: "",
    datedep: "",
    exp: "",
    moyfe: "",
    tel: "",
    tel2: "",
    cin: "",
    name: "",
    lastname: "",
    datenaissance: "",
    email: "",
    email2: "",
  });

  const {
    diplome,
    datedep,
    exp,
    moyfe,
    tel,
    cin,
    name,
    lastname,
    datenaissance,
    email,
    tel2,
    email2,
  } = formData;

  const { user } = useSelector((state) => state.auth);

  const { postulations, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.postulations
  );

  useEffect(() => {
  

    return () => {
      dispatch(reset());
    };
  }, [postulations, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email != email2 || tel != tel2 || !exp || !moyfe ||!cin || !datenaissance || !datedep )  {
      toast.error("please fill all fields  ");
    } else {
    const annonce = id;
    const condidat = user._id;  
    let dt = new Date();
    let dn = new Date(datenaissance);
    let dep  =  new Date(datedep) 
    console.log(dt , 'hedhom datete',dn)
    let dateconfirm =  (dn<dt);
    let dateCon = (dep<dt);
    console.log(dateconfirm , 'hedhy conpa date')
    if(dateconfirm && dateCon){
    const postData = {
      diplome,
      datedep,
      exp,
      moyfe,
      tel,
      cin,
      name,
      lastname,
      datenaissance,
      email,
      annonce,
      condidat,
    };
   

    dispatch(create(postData)).unwrap().then(data  => navigate("/jobs")
    ).catch(err => toast.error(err))

  }else {
    toast.error('please verify date  ')
  }
}
  };
  /////

  const { annonces } = useSelector((state) => state.annonces);
  const { recruters } = useSelector((state) => state.recruters);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAnnonceByid(id))
      .unwrap()
      .then((res) => {
        console.log(res, "gmara");
        dispatch(getRecruter(res.recruter));
      });
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className='container mt-4'>
        <div className='row gutters'>
          <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='account-settings'>
                  <div className='user-profile'>
                    <div className='user-avatar'>
                      <img
                        src='https://bootdey.com/img/Content/avatar/avatar7.png'
                        alt='Maxwell Admin'
                      />
                    </div>
                    <h5 className='user-name'>{recruters.name}</h5>
                  </div>
                  <div className='about'>
                    <h5>{annonces.specialite}</h5>
                    <p>{annonces.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='row gutters'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <h6 className='mb-2 text-primary'>Personal Details</h6>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='fullName'>Num Cin</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Enter num cin'
                        onChange={onChange}
                        name='cin'
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='eMail'>date de naissance</label>
                      <input
                        type='date'
                        className='form-control'
                        placeholder='Enter date'
                        onChange={onChange}
                        name='datenaissance'
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='phone'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={onChange}
                        name='name'
                        value={user.name}
                        placeholder='Enter name'
                        disabled='true '
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='website'>LastName</label>
                      <input
                        type='url'
                        className='form-control'
                        onChange={onChange}
                        name='lastname'                        value={user.name}

                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='website'>tel1</label>
                      <input
                        type='url'
                        className='form-control'
                        onChange={onChange}
                        name='tel'
                        value={user.tel}
                        disabled='true '
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='website'>tel2</label>
                      <input
                        type='url'
                        className='form-control'
                        onChange={onChange}
                        name='tel2'
                        placeholder='confirm tel number'
                        value={user.tel}
                        disabled='true '
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='website'>Email1</label>
                      <input
                        type='url'
                        className='form-control'
                        onChange={onChange}
                        name='email'
                        value={user.email}
                  disabled='true '
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='website'>Email2</label>
                      <input
                        type='url'
                        className='form-control'
                        onChange={onChange}
                        name='email2'
                        disabled='true '
                        value={user.email}
                        />
                    </div>
                  </div>
                </div>
                <div className='row gutters'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <h6 className='mt-3 mb-2 text-primary'>
                      Experience Professionelle
                    </h6>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='Street'>Diplome</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={onChange}
                        name='diplome'
                        placeholder='Enter diplome'
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='ciTy'>Date obtention</label>
                      <input
                        type='date'
                        className='form-control'
                        onChange={onChange}
                        name='datedep'
                        placeholder='Enter Date'
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='sTate'>experience</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={onChange}
                        name='exp'
                        placeholder='Enter experience month number'
                      />
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                    <div className='form-group'>
                      <label htmlFor='zIp'>moyenne fin d'etude</label>
                      <input
                        type='number'
                        className='form-control'
                        onChange={onChange}
                        name='moyfe'
                        placeholder='Enter moyenne'
                      />
                    </div>
                  </div>
                </div>
                <div className='row gutters'>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className='text-right'>
                      <button
                        type='button'
                        id='submit'
                        name='submit'
                        onClick={onSubmit}
                        className='btn btn-primary'>
                        postuler
                      </button>
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

export default Postulation;

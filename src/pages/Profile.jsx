import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateCondidat, getCondidatById, reset } from "../features/condidat/condidatSlice";
import {logout} from "../features/auth/authSlice";

function Profile() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {condidats } = useSelector((state)=>state.condidats)
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getCondidatById(user._id)).unwrap().then(res => console.log(res , 'condidats state '))
  }, [user, dispatch]);

   

  const [formData, setFormData] = useState({
    email: condidats.email,
    name: condidats.name,
    tel: condidats.tel,
    adress: condidats.adress,
    _id: condidats._id,
  });

  const { email, password, name, tel, adress, _id } = formData;

  useEffect(() => {
    
 
  }, [condidats,user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      name,
      tel,
      adress,
      _id: user._id,
    };

    dispatch(updateCondidat(userData))
      .unwrap()
      .then((data) => {
        toast.success("done");
        navigate('/profile')
      })
      .catch((err) => {
        toast.error("verify");
      });
  };
  return (
    <>
      <NavBar />
      <div>
        <link
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
          rel='stylesheet'
        />
        <div className='container'>
          <div className='view-account'>
            <section className='module'>
              <div className='module-inner'>
                <div className='side-bar'>
                  <div className='user-info'>
                    <img
                      className='img-profile img-circle img-responsive center-block'
                      src='https://bootdey.com/img/Content/avatar/avatar1.png'
                      alt
                    />
                    <ul className='meta list list-unstyled'>
                      <li className='name'>{condidats.name}</li>
                      <li>{condidats.tel} </li>
                      <li className='activity'>{condidats.adress}</li>
                    </ul>
                  </div>
                </div>
                <div className='content-panel'>
                  <h2 className='title'>Profile </h2>
                  <form className='form-horizontal' onSubmit={onSubmit}>
                    <fieldset className='fieldset'>
                      <h3 className='fieldset-title'>Personal Info</h3>

                      <div className='form-group'>
                        <label className='col-md-2 col-sm-3 col-xs-12 control-label'>
                          Name
                        </label>
                        <div className='col-md-10 col-sm-9 col-xs-12'>
                          <input
                            type='text'
                            className='form-control'
                            defaultValue={condidats.name}
                            onChange={onChange}
                            name='name'
                          />
                        </div>
                      </div>

                      <div className='form-group'>
                        <label className='col-md-2 col-sm-3 col-xs-12 control-label'>
                          Adresse
                        </label>
                        <div className='col-md-10 col-sm-9 col-xs-12'>
                          <input
                            type='text'
                            className='form-control'
                            defaultValue={condidats.adress}
                            onChange={onChange}
                            name='adress'
                          />
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className='fieldset'>
                      <h3 className='fieldset-title'>Contact Info</h3>
                      <div className='form-group'>
                        <label className='col-md-2  col-sm-3 col-xs-12 control-label'>
                          Email
                        </label>
                        <div className='col-md-10 col-sm-9 col-xs-12'>
                          <input
                            type='email'
                            className='form-control'
                            defaultValue={condidats.email}
                            onChange={onChange}
                            name='email'
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='col-md-2  col-sm-3 col-xs-12 control-label'>
                          tel
                        </label>
                        <div className='col-md-10 col-sm-9 col-xs-12'>
                          <input
                            type='text'
                            className='form-control'
                            defaultValue={condidats.tel}
                            name='tel'
                            onChange={onChange}
                          />
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                    <div className='form-group'>
                      <div className='col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0'>
                        <input
                          className='btn btn-primary'
                          type='submit'
                          defaultValue='Update Profile'
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

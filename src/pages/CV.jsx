import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react'
import {create , get, update , deleteCV} from '../features/condidat/cvSlice'
import {Navigate, useNavigate} from "react-router";
import {toast} from "react-toastify";

function CV() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const { user } = useSelector((state) => state.auth);
  const {cv } = useSelector(state => state.cv)
  useEffect(()=>{
  dispatch(get(user._id)).unwrap().then(res =>console.log(res , 'cv cv cv')).catch(err => console.log(err))
 
 
},[dispatch , user])
 
 


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [formData, setFormData] = useState({
    email:user.email,
    name : user.name,
    adress : user.adress,
    tel : user.tel ,
    niveau :cv?.niveau,
    formation : cv?.formation,
    langues:cv?.langues , 
    diplome:cv?.diplome, 
    experience :cv?.experience
  });
  const { condidat , email,name,  adress , tel , niveau , formation, langues , diplome , experience } = formData;
 
 const deletecv = ()=>{
 
    console.log('deleeteeee')
    if(cv._id!=null){

    dispatch(deleteCV(cv._id))
    console.log('deleeted ')
    toast.success('deleted')
    navigate('/')
    }
    else{
      console.log(' already deleted')
      toast.error('you have no cv ')
    }
    }
 


  return (
    <>
<NavBar />
  
  
  <div className='container-xl px-4 mt-4'>
  <hr className='mt-0 mb-4' />
  <div className='row'>
    <div className='col-xl-8'>
      <div className='card mb-4'>
        <div className='card-header'>CV Details</div>
        <div className='card-body'>
          <form>
            <div className='mb-3'>
              <label class='small mb-1'>Username </label>
              <input
                class='form-control'
                type='text'
                placeholder='Enter your username'
                value={user.name}
                disabled='true '
              />
            </div>

            <div className='row gx-3 mb-3'>
              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputFirstName'>
                  Address
                </label>
                <input
                  class='form-control'
                  id='inputFirstName'
                  type='text'
                  placeholder='Enter your first name'
                  value={user.adress}
                  disabled='true '
                />
              </div>
              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputLastName'>
                  Tel
                </label>
                <input
                  class='form-control'
                  id='inputLastName'
                  type='text'
                  placeholder='Enter your last name'
                 value={user.tel}
                 disabled='true '
                />
              </div>
            </div>
            <div className='row gx-3 mb-3'>
              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputOrgName'>
                  Niveau{" "}
                </label>
                <input
                  class='form-control'
                  id='inputOrgName'
                  type='text'
                  placeholder='Enter your niveau'
                 name="niveau"
                 onChange={onChange}
                 defaultValue={cv?.niveau}
                />
              </div>

              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputLocation'>
                  Formation
                </label>
                <input
                  class='form-control'
                  id='inputLocation'
                  type='text'
                  placeholder='Enter your foramtion'
                  name = "formation"

                  defaultValue={cv?.formation}
                 onChange={onChange}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label class='small mb-1' htmlFor='inputEmailAddress'>
                Email
              </label>
              <input
                class='form-control'
                id='inputEmailAddress'
                type='email'
                placeholder='Enter your email address'
                value={user.email}
                disabled='true '
              />
            </div>

            <div className='row gx-3 mb-3'>
              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputPhone'>
                  Langues
                </label>
                <input
                  class='form-control'
                  id='inputPhone'
                  type='tel'
                  placeholder='Enter some languages'
                 name="langues"

                 defaultValue={cv?.langues}

                 onChange={onChange}
                />
              </div>
              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputBirthday'>
                  Diplome
                </label>
                <input
                  class='form-control'
                  id='inputBirthday'
                  type='text' 
                  placeholder='Enter your diplome'
                 name="diplome"

                 defaultValue={cv?.diplome}
                 onChange={onChange}
                />
              </div>

              <div className='col-md-6'>
                <label class='small mb-1' htmlFor='inputBirthday'>
                  Experience
                </label>
                <input
                  class='form-control'
                  id='inputBirthday'
                  type='text'
                  name='experience'
                  placeholder='Enter your experience'
                  
                 defaultValue={cv?.experience}
                  onChange={onChange}
                />
              </div>
            </div>
            <button class='btn btn-primary mr-3' type='button' onClick={()=>{
              if(!niveau || !formation || !langues || !diplome || !experience){
                toast.error('please fill all fields')
              }else{
                    formData.condidat = user._id
            console.log(formData , 'hedha fesh nabeeth ')
            if(cv){
              formData._id = cv._id;
              console.log(formData  , 'updated cv ')
              update( formData)
              toast.success('cv updated ')
              navigate('/')
            }else{
              dispatch(create(formData)).unwrap().then((res)=>{console.log(res , 'totototot')
              toast.success('cv created ')
              navigate('/')
            })
              }
        
       
            }
                 }}>
              Save changes
            </button>

            <button class='btn btn-danger' type='button' onClick={deletecv}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
 
    
    </>
  );
}

export default CV;

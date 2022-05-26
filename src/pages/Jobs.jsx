import React from 'react'
import NavBar from './NavBar'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import{getByC, reset} from "../features/Postulation/PostulationSlice"
import Job from './Job';

function Jobs() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { postulations, isLoading, isError, message } =
    useSelector((state) => state.postulations);
   
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getByC(user._id)).unwrap().then(
      (res)=>{
     console.log(res)
        

      }
      
    )
    
   
  }, [
    user,
    dispatch,
    navigate,
    
 
    
  
  ]);
  /////////////////////
  


 
  return (
      <>
      
      <NavBar/>


<div className="container mt-4">
  <div className="col-12 col-sm-12 col-md-12">
    <div className="card">
      <div className="card-header">
        <h4>my jobs</h4>
      </div>
      <div className="card-body">
        <div className="media-list position-relative">
          <div className="table-responsive" id="project-team-scroll" tabIndex={1} style={{height: 400, overflow: 'hidden', outline: 'none'}}>
            <table className="table table-hover table-xl mb-0">
              <thead>
                <tr>
                  <th> Name</th>
                  <th>status</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {postulations.map((p)=>(

<Job key={p._id}  postulation={p}/> 
               
              
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Jobs

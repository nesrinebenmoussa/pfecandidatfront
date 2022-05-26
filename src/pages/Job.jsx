import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import{getAnnonceByid} from "../features/annonce/annonceSlice"
import {FaAd, FaPen} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import { toast } from "react-toastify";
import {remmove} from '../features/Postulation/PostulationSlice'

function Job({postulation}) {
  const { annonces } = useSelector((state) => state.annonces);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {


    dispatch(getAnnonceByid(postulation.annonce)).unwrap().
    then(data => console.log(data , 'hedhy annoce'));
  }, [ navigate, dispatch]);
 const edit=()=>{
     navigate(`/edit/${postulation._id}`)
 }
 const deletea=()=>{
  var answer = window.confirm("Delete data?");
  if (answer) {
    dispatch(remmove(postulation._id)).unwrap().
    then(data =>toast.success("dleeteed "))
    .catch(err=>toast.error(err))
}}
  return(
      <>
        <tr >
                  <td className="text-truncate">{postulation.diplome}</td>
                  <td className="text-truncate">
                {postulation.reponse}
                  </td>
                  <td className="text-truncate">
                   <tr> <td onClick={edit}><FaPen   />  </td>    
                    <td onClick={deletea}><FaTrash/></td>
                    <td onClick={()=>{
                      navigate('/questionaire/'+postulation._id)
                    }}> <FaAd /></td>
                    </tr>
                  </td>
                </tr></>
   )
}

export default Job;

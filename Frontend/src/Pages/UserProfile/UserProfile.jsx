import React from 'react'
import { useParams, useNavigate } from 'react-router';
import useUser from '../../Hooks/useUser';

const UserProfile = () => {
    const {state : user_state, dispatch} = useUser();
    const {id} = useParams();
    const navigate = useNavigate();

    if(!id && !user_state){
        <p>You have to login first</p>
        setTimeout(()=>navigate('/'), 1000);
    }
    else{
        if(id){
            
        }
        else{

        }
    }


  return (
    <main id="profile-page">
        <div>UserProfile</div>
    </main>
  )
}

export default UserProfile
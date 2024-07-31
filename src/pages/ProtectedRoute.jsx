import { useEffect } from 'react'
import { useAuth } from '../contexts/fakeAuthContent';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
 const {isAuthenticated}= useAuth();
 const navigate= useNavigate();
 useEffect(function(){
    if(isAuthenticated === false)
        navigate('/')
 },[isAuthenticated,false])
  return (
      isAuthenticated ? children : null
  )
}

export default ProtectedRoute;

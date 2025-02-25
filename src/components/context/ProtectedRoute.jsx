import { useSelector } from "react-redux"
import {Route, Navigate} from "react-router-dom"
export default function ProtectedRoute({children}){
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }else{
      const user = useSelector(state => state.auth.user);
      if(user.role === "admin"){
        return <Navigate to="/dashboard"/>
      }
      return children;
    }

}
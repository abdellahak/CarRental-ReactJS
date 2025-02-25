import { useSelector } from "react-redux"
import {Route, Navigate} from "react-router-dom"
export default function ProtectedRoute({children}){
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }else{
      const users = useSelector(state => state.users);
      const user = useSelector(state => state.auth.user);
      if(users.find(u => u.id === user.id).role === "admin"){
        return <Navigate to="/dashboard"/>
      }
      return children;
    }

}
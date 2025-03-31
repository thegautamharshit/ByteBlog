import { Navigate } from "react-router-dom";
import { useUser } from "../hooks";
import React from "react";

interface PortectedRouterProps {
    children: React.JSX.Element;
}

export const ProtectedRoute = ({ children }: PortectedRouterProps) => {
    const {user, loading} = useUser();

    if(loading){
        return <div>
            
        </div>;
    }

    if(!user){
        return <Navigate to = "/signin" />
    }

    return children;
}
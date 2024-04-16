import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from "js-cookie"

const index = (props) => {
    const token = Cookies.get("token")
    if(token === undefined){
        return <Navigate to="/login" replace />;
    }
    return <props.element />
}

export default index;

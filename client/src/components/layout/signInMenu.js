import React from 'react'

const signInMenu = ({logout}) => {
    return (
         <li onClick={logout}><a href="#">Logout</a></li>
        
    )
}

export default signInMenu

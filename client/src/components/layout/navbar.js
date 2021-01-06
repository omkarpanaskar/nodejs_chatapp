import React, {  useContext }from 'react'
import { UserContext } from '../../UserContext';
import SignInMenu from './signInMenu';
import SignedOutMenu from './signedOutMenu';


function navbar() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, setUser } = useContext(UserContext);
    const logout = async() => {
        try {
            const url = 'http://localhost:5000/logout';
        const res = await fetch(url, {
          mode: 'cors',
          credentials: 'include'
    })
    const data = await res.json();
    console.log("logout user", data);
    setUser(null);
        } catch (error) {
            console.log("Navbar.logout::",error);
        }
    }
    const menu = user ? <SignInMenu logout={logout}/> : <SignedOutMenu />
    return (
        // react doesn't allow to render more than one elements block so we use '<> </>'
        <>
        <nav className="green">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Chat</a>
                <a href=" " data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {menu}
                </ul>
            </div>
        </nav>
         <ul className="sidenav" id="mobile-demo">
         {menu}
       </ul>
       </>

    )
}

export default navbar

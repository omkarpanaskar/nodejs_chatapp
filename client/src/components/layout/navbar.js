import React from 'react'

function navbar() {
    return (
        // react doesn't allow to render more than one elements block so we use '<> </>'
        <>
        <nav className="green">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Chat</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#">Login</a></li>
                    <li><a href="#">SignUp <span className="new badge">4</span></a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
        </nav>
         <ul className="sidenav" id="mobile-demo">
         <li><a href="sass.html">Login</a></li>
         <li><a href="badges.html">SignUp</a></li>
         <li><a href="collapsible.html">Logout</a></li>
       </ul>
       </>

    )
}

export default navbar

import {  NavLink} from "react-router-dom"

function PageNavigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" >Home</NavLink> 
                </li>
                <li>
                    <NavLink to="/about" >About </NavLink> 
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink> 
                </li>
                <li>
                    <NavLink to="/app" >App LayOut</NavLink> 
                </li>
                
            </ul>
            
        </nav>
    )
}

export default PageNavigation

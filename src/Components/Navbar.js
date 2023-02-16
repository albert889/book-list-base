import { firebaseAuthentication } from '../config/firebase'
import imgLogo from '../images/img_logo.svg'
import '../style/style.css'

const Navbar = (isShowLogout) => {
  const handleLogOut = () =>{
    firebaseAuthentication.signOut()
}

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img src={imgLogo} alt="" width="50" height="50" className="d-inline-block align-text-top ms-2"/>
          <span className="ms-2 brand-name">MyBook</span>
        </a>
        {
          isShowLogout.value ? (
            <div className="d-flex me-2">
          <button onClick={handleLogOut} className="btn-logout">Logout</button>
        </div>
          ):false
        }
        
      </div>
    </nav>
  )
}

export default Navbar
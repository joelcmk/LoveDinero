import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import './nav.css';

const Navbar = function (props) {

  const [pp, setPp] = useState();
  const [profileName, setProfileName] = useState('')

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.photoURL === null) {
          setProfileName(user.displayName[0]);
        } else {
          setPp(user.photoURL);
        }
      } else {
        navigate('/login')

      }
    });
  }, [user]);


  const profilePhoto = (name) => {
    setProfileName(name[0])
  }

  console.log(profileName !== '')


  return (
    <div className="nav">
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <Link to="/profile">
        {profileName !== '' ?
          <div className="profile_name"><p>{profileName}</p></div> :
          <img className="pp" src={pp} />
        }

      </Link>
    </div>
  )
}

export default Navbar;
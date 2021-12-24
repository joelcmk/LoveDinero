import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import './nav.css';

const Navbar = function (props) {

  const [pp, setPp] = useState();

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPp(user.photoURL);
      } else {
        navigate('/login')

      }
    });
  }, [user]);

  return (
    <div className="nav">
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <Link to="/profile">
        <img className="pp" src={pp} />
      </Link>
    </div>
  )
}

export default Navbar;
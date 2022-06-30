import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutAuthUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOutAuthUser();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          {
            currentUser
              ? (
                <span className='nav-link' onClick={handleSignOut}>
                  Sign Out
                </span>
              ) : (
                <Link className='nav-link' to='/auth'>
                  Sign In
                </Link>
              )
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
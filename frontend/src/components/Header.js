import { Link, Route, Routes} from 'react-router-dom';
import logoHeader from '../images/logo-header.svg'

function Header ({logout, email}) {
  return (
    <>
      <header className="header">
        <div className='header__container'>
          <img
            className="header__logo"
            src={logoHeader}
            alt="Логотип"
          />
          <div className='header__title-box'>
            <Routes>
              <Route path="/register" element={
                <Link to="/login" className="header__title">Войти</Link>
              }/>
              <Route path="/login" element={
                <Link to="/register" className="header__title">Регистрация</Link>
              }/>
              <Route path="/*" element={
                <>
                  <p className='header__title'>{email || ''}</p>
                  <Link
                  onClick={logout}
                  className="header__title"
                  >Выйти</Link>
                </>
              }/>
            </Routes>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
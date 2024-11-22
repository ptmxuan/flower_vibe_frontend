import Info from "../header/Info";
import Nav from "../header/Nav"; 
import '@/styles/Header.scss'

function Header() {
  return (
    <div className="header">
      <Info />
      <Nav />
    </div>
  );
}

export default Header;

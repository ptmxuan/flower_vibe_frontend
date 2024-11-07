import Header from "../header/Header";
import ContentHome from "../content/content-home/ContentHome";
import Footer from "../footer/Footer";
import "@/styles/Home.scss"
function Home() {
  return (
    <div className="home">
      <div className="header-home">
        <Header />
      </div>
      <div className="content">
        <ContentHome />
      </div>
      <div className="footer-home">
        <Footer/>
      </div>
    </div>
  );
}

export default Home;

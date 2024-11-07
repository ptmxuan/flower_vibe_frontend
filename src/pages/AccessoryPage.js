import Accessories from "@/components/accessories/Accessories";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "@/styles/Accessory.scss";
function AccessoryPage() {
  return (
    <>
      <Header />
      <div className="accessory-page">
        <Accessories />
      </div>
      <Footer />
    </>
  );
}

export default AccessoryPage;

import background from "@/assets/img/background_home.png";
import banel2 from "@/assets/img/banel2.png";
import banel3 from "@/assets/img/banel3.png";
import { Carousel } from "antd";
function SliderBanner() {
  return (
    <div className="slider-banner">
      <Carousel autoplay autoplaySpeed={2000} dots={false}>
        <div className="banner">
          <img src={background} alt="banner" />
        </div>
        <div className="banner">
          <img src={banel2} alt="banner" />
        </div>
        <div className="banner">
          <img src={banel3} alt="banner" />
        </div>
      </Carousel>
    </div>
  );
}

export default SliderBanner;

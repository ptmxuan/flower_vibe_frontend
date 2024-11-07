import "@/styles/Info.scss";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
function Info() {
  return (
    <div className="info">
      <div className="left-info">
        <div className="sdt">
          <PhoneOutlined />
          <span>0344490477</span>
        </div>
        <div className="email">
          <MailOutlined />
          <span>flowervibe@gmail.com</span>
        </div>
      </div>
      <div className="right-info">
        <span>Follow Us:</span>
        <FacebookOutlined />
        <InstagramOutlined />
      </div>
    </div>
  );
}
export default Info;

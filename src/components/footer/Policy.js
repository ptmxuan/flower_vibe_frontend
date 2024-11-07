import Header from "@/components/header/Header";
function Policy() {
  return (
    <>
      <Header />
      <div
        className="policy"
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        <h1>Điều Khoản & Chính Sách Của FlowerVibe</h1>

        <h2>1. Chính Sách Thanh Toán</h2>
        <p>
          Chúng tôi chấp nhận các phương thức thanh toán bao gồm thanh toán trực
          tuyến và thanh toán khi nhận hàng.
        </p>

        <h2>2. Chính Sách Giao Hàng</h2>
        <p>
          Chúng tôi cung cấp dịch vụ giao hoa ở các khu vực như Vĩnh Long - Cần
          Thơ - Vị Thanh và giao trong ngày cho các đơn hàng đặt trước 12 giờ
          trưa. Các đơn hàng sau thời gian này sẽ được giao vào ngày hôm sau.
          Phí giao hàng sẽ được tính dựa trên khoảng cách và khu vực giao nhận.
          Đối với những đơn hàng trong khu vực nội ô Thành phố Cần Thơ sẽ được
          giao trong 1 giờ và miễn ship nếu khoảng cách dưới 10km.
        </p>

        <h2>3. Chính Sách Hủy Đơn Hàng và Hoàn Tiền</h2>
        <p>
          Khách hàng có thể hủy đơn hàng trong vòng 1 giờ sau khi đặt hàng mà
          không mất phí. Đơn hàng không thể hủy sau khi đã được xử lý và giao
          cho bộ phận vận chuyển. Hoàn tiền chỉ được áp dụng khi sản phẩm không
          đạt yêu cầu như đã cam kết (hoa héo, sai loại hoa).
        </p>

        <h2>4. Chính Sách Đổi Trả</h2>
        <p>
          Chúng tôi không áp dụng chính sách đổi trả với hoa tươi vì tính chất
          sản phẩm. Trong trường hợp hoa bị hư hỏng, không đúng loại hoặc số
          lượng, vui lòng liên hệ với chúng tôi trong vòng 2 giờ kể từ khi nhận
          được hoa để được hỗ trợ.
        </p>

        <h2>5. Chính Sách Bảo Mật Thông Tin</h2>
        <p>
          Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng.
          Thông tin sẽ chỉ được sử dụng để xử lý đơn hàng và cung cấp dịch vụ
          tốt hơn, không chia sẻ với bất kỳ bên thứ ba nào trừ khi được yêu cầu
          bởi pháp luật.
        </p>

        <h2>6. Liên Hệ Hỗ Trợ</h2>
        <p>
          Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email
          hoặc hotline có sẵn trên trang web. Đội ngũ chăm sóc khách hàng của
          chúng tôi sẵn sàng hỗ trợ 24/7.
        </p>
      </div>
    </>
  );
}

export default Policy;

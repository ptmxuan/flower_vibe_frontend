function UserInfor() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="user-infor">
      <div className="user-title">
        <h1>Thông tin tài khoản</h1>
      </div>
      <div className="user-info">
        <div className="account-name">
          <p>Username: </p>
          <span>{user.username}</span>
        </div>
        <div className="user-name">
          <p>Họ và tên: </p>
          <span>{user.name}</span>
        </div>
        <div className="user-phone">
          <p>Số điện thoại: </p>
          <span>{user.phone}</span>
        </div>
        <div className="user-male">
          <p>Giới tính: </p>
          <span>{user.gender}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfor;

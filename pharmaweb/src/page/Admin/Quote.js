import React, { useState } from 'react';
import '../../assets/Admin/css/feedback.css';

const fakeQuotes = [
  {
    id: 1,
    fullName: 'Nguyễn Văn A',
    companyName: 'Công ty ABC',
    address: '123 Đường Lê Lợi',
    city: 'Hà Nội',
    state: 'Hà Nội',
    postalCode: '100000',
    country: 'Việt Nam',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    message: 'Tôi muốn nhận báo giá về gói dịch vụ A.',
  },
  {
    id: 2,
    fullName: 'Trần Thị B',
    companyName: 'CT TNHH XYZ',
    address: '456 Nguyễn Huệ',
    city: 'TP. HCM',
    state: 'TP. HCM',
    postalCode: '700000',
    country: 'Việt Nam',
    email: 'tranthib@example.com',
    phone: '0919876543',
    message: 'Vui lòng tư vấn thêm về dịch vụ thiết kế.',
  
  }
];

const Quote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quotes, setQuotes] = useState(fakeQuotes);

  const filteredQuotes = quotes.filter((q) =>
    (
      q.fullName +
      q.email +
      q.phone +
      q.companyName +
      q.address +
      q.city +
      q.state +
      q.postalCode +
      q.country +
      q.message 
    
    ).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phản hồi này?')) {
      setQuotes(quotes.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="feedback-container">
      <h2>📬 Danh sách yêu cầu báo giá</h2>

      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Công ty</th>
            <th>Địa chỉ</th>
            {/* <th>Thành phố</th> */}
            <th>Tỉnh/Bang</th>
            <th>Bưu điện</th>
            {/* <th>Quốc gia</th> */}
            <th>Nội dung</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuotes.map((q) => (
            <tr key={q.id}>
              <td>{q.fullName}</td>
              <td>{q.email}</td>
              <td>{q.phone}</td>
              <td>{q.companyName}</td>
              <td>{q.address} {q.city}{q.country}</td>
              {/* <td></td> */}
              <td>{q.state}</td>
              <td>{q.postalCode}</td>
              {/* <td></td> */}
              <td>{q.message}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-action btn-view" title="Xem">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="btn-action btn-reply" title="Phản hồi">
                    <i className="fas fa-reply"></i>
                  </button>
                  <button
                    className="btn-action btn-delete"
                    title="Xóa"
                    onClick={() => handleDelete(q.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredQuotes.length === 0 && (
            <tr>
              <td colSpan="12" style={{ textAlign: 'center', padding: '1rem' }}>
                Không có kết quả phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Quote;

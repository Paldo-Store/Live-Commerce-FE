import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

const Wrapper = styled.div`
  width: 900px;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OrderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #388e3c;
  }
`;

const BackButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  color: #999;
`;

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:19091/api/v1/orders?page=${page}&size=1`,
          {
            headers: { Authorization: token },
          }
        );

        console.log(res.data);  // 응답 데이터 확인

        // 응답 데이터 구조 확인 후, 'companies'가 있는 경우에만 처리
        if (res.data && res.data.data && res.data.data.companies) {
          setOrders(res.data.data.companies);  // companies 데이터가 있을 경우만 상태 업데이트
        } else {
          console.error("No companies data found!");
          setOrders([]);  // 데이터가 없을 경우 빈 배열로 설정
        }
      } catch (err) {
        console.error('❌ 주문 조회 실패:', err);
        setOrders([]);  // 실패한 경우 빈 배열로 설정
      }
    };

    fetchOrders();
  }, [page]);

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleBack = () => {
    navigate(-1);  // 뒤로 가기
  };

  return (
    <Wrapper>
      <h2>📦 주문 목록</h2>

      {orders.length === 0 ? (
        <Message>현재 등록된 주문이 없습니다.</Message>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.orderId}>
            <div>
              <div><strong>주문 번호: {order.orderId}</strong></div>
              <div><strong>상품 번호: {order.productId}</strong></div>
              <div>주문 상태: {order.status}</div>
              <div>주문 금액: {order.finalPaidPrice}</div>
              <div>주문일: {new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <Button onClick={() => handleViewDetails(order.orderId)}>주문 상세보기</Button>
          </OrderCard>
        ))
      )}
      <BackButton onClick={handleBack}>뒤로 가기</BackButton>
    </Wrapper>
  );
}

export default OrderListPage;

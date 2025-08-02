import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

const Wrapper = styled.div`
  width: 900px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OrderDetail = styled.div`
  margin-bottom: 20px;
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

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();  // useNavigate 훅 사용
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // 주문 상세 정보 조회
    const fetchOrderDetails = async () => {
      try {
        const orderRes = await axios.get(
          `http://localhost:19091/api/v1/orders/${orderId}`,
          { headers: { Authorization: token } }
        );
        setOrder(orderRes.data.data);  // 주문 정보 저장

        // 상품 정보 조회 (주문에 포함된 상품 ID를 통해)
        const productRes = await axios.get(
          `http://localhost:19091/api/v1/products/30000000-0000-0000-0000-000000000007`,
          { headers: { Authorization: token } }
        );
        setProduct(productRes.data.data);  // 상품 정보 저장
      } catch (err) {
        console.error('❌ 주문 또는 상품 조회 실패:', err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // 총 금액 계산
  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toLocaleString();
  };

  return (
    <Wrapper>
      {order && product ? (
        <>
          <h2>📦 주문 상세 정보</h2>
          <OrderDetail><strong>주문 번호:</strong> {order.orderId}</OrderDetail>
          <OrderDetail><strong>주문 상태:</strong> {order.status}</OrderDetail>
          <OrderDetail><strong>주문일:</strong> {new Date(order.createdAt).toLocaleString()}</OrderDetail>
          <OrderDetail><strong>요청 사항:</strong> {order.requirement}</OrderDetail>

          <h3>상품 정보</h3>
          <OrderDetail><strong>상품명:</strong> {product.name}</OrderDetail>
          <OrderDetail><strong>상품 가격:</strong> {product.price.toLocaleString()}원</OrderDetail>
          <OrderDetail><strong>주문 수량:</strong> {order.productQuantity}</OrderDetail>
          <OrderDetail><strong>총 금액:</strong> {calculateTotalPrice(product.price, order.productQuantity)}원</OrderDetail>

          <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
        </>
      ) : (
        <p>주문 또는 상품 정보를 불러오는 중입니다...</p>
      )}
    </Wrapper>
  );
}

export default OrderDetailsPage;

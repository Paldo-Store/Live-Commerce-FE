import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 900px;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductCard = styled.div`
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

const OrderBox = styled.div`
  border: 2px solid #3f51b5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Select = styled.select`
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
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

// New container for header and button to be aligned horizontally
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [requirement, setRequirement] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:19091/api/v1/products/search', {
          headers: { Authorization: token },
        });
        setProducts(res.data.data.products || []);
      } catch (err) {
        console.error('❌ 상품 조회 실패:', err);
      }
    };

    const fetchCoupons = async () => {
      try {
        const res = await axios.get('http://localhost:19091/api/v1/issued-coupons/', {
          headers: { Authorization: token },
        });
        setCoupons(res.data.data.coupons || []);
      } catch (err) {
        console.error('❌ 쿠폰 조회 실패:', err);
      }
    };

    fetchProducts();
    fetchCoupons();
  }, []);

  const handleOrderSubmit = async () => {
    if (!selectedProduct) return;
    try {
      const token = localStorage.getItem('accessToken');
      const orderBody = {
        productId: selectedProduct.productId,
        orderQuantity,
        requirement,
        broadcastId: '10000000-0000-0000-0000-0000000000b5',
        couponId: selectedCouponId || null,
      };

      await axios.post('http://localhost:19091/api/v1/orders', orderBody, {
        headers: { Authorization: token },
      });

      alert('✅ 주문이 성공적으로 접수되었습니다!');
      setSelectedProduct(null);
      setOrderQuantity(1);
      setRequirement('');
      setSelectedCouponId('');
      navigate('/orders');  // 주문 목록 페이지로 리다이렉트
    } catch (err) {
      console.error('❌ 주문 실패:', err);
      alert('주문 실패');
      navigate('/orders');  // 실패 시에도 주문 목록 페이지로 리다이렉트
    }
  };

  const handleBack = () => {
    navigate(-1);  // 뒤로 가기
  };

  return (
    <Wrapper>
      {/* New container for header and button to be placed horizontally */}
      <HeaderContainer>
        <h2>📦 상품 목록</h2>
        <BackButton onClick={handleBack}>뒤로 가기</BackButton>
      </HeaderContainer>

      {selectedProduct && (
        <OrderBox>
          <h3>🛒 주문하기: {selectedProduct.name}</h3>
          <p>{selectedProduct.description}</p>
          <Input
            type="number"
            value={orderQuantity}
            min={1}
            onChange={(e) => setOrderQuantity(Number(e.target.value))}
            placeholder="수량"
          />
          <Input
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="요청사항 입력"
          />
          {coupons.length > 0 && (
            <Select
              value={selectedCouponId}
              onChange={(e) => setSelectedCouponId(e.target.value)}
            >
              <option value="">쿠폰 선택 (선택사항)</option>
              {coupons.map((coupon) => (
                <option key={coupon.id} value={coupon.id}>
                  {coupon.couponCode} - {coupon.expiresAt.slice(0, 10)}
                </option>
              ))}
            </Select>
          )}
          <Button onClick={handleOrderSubmit}>📦 주문 접수</Button>
        </OrderBox>
      )}

      {products.map((product) => (
        <ProductCard key={product.productId}>
          <div>
            <div><strong>{product.name}</strong></div>
            <div>{product.description}</div>
            <div>{product.price.toLocaleString()}원</div>
          </div>
          <Button onClick={() => setSelectedProduct(product)}>주문하기</Button>
        </ProductCard>
      ))}
    </Wrapper>
  );
}

export default ProductListPage;

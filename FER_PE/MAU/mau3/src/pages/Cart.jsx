// Cart.jsx - Trang giỏ hàng
// GENERIC TEMPLATE: Tùy chỉnh field hiển thị (name, title, etc.) theo entity của bạn
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useItems } from '../contexts/ItemContext';
import * as api from '../services/api';
import NavigationHeader from '../components/NavigationHeader';
import ConfirmModal from '../components/ConfirmModal';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const { updateItemStock } = useItems();
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Xử lý cập nhật quantity
  const handleQuantityChange = async (id, newQuantity) => {
    // Kiểm tra quantity hợp lệ
    if (newQuantity < 1) {
      return; // Không cho phép quantity < 1
    }

    const item = items.find(i => i.id === id);
    if (!item) return;

    // Tính sự khác biệt về quantity
    const quantityDiff = newQuantity - item.quantity;

    // Cập nhật quantity trong cart
    updateQuantity(id, newQuantity);

    // Cập nhật stock trong JSON Server
    try {
      // Lấy thông tin item hiện tại từ server
      const currentItem = await api.getItemById(id);
      
      // Tính stock mới (nếu tăng quantity thì giảm stock, ngược lại tăng stock)
      const newStock = currentItem.stock - quantityDiff;
      
      // Nếu stock không đủ, không cho phép cập nhật
      if (newStock < 0) {
        // Revert quantity về giá trị cũ
        updateQuantity(id, item.quantity);
        alert('Not enough stock available!');
        return;
      }

      // Cập nhật stock trong JSON Server
      await api.updateItem(id, {
        ...currentItem,
        stock: newStock
      });

      // Cập nhật state trong context
      await updateItemStock(id, newStock);
    } catch (error) {
      console.error('Error updating stock:', error);
      // Revert quantity về giá trị cũ nếu có lỗi
      updateQuantity(id, item.quantity);
      alert('Failed to update quantity');
    }
  };

  // Xử lý xóa item khỏi cart (restore stock)
  const handleRemove = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    try {
      // Lấy thông tin item hiện tại từ server
      const currentItem = await api.getItemById(id);
      
      // Restore stock: thêm lại số lượng đã mua
      const newStock = currentItem.stock + item.quantity;
      
      // Cập nhật stock trong JSON Server
      await api.updateItem(id, {
        ...currentItem,
        stock: newStock
      });

      // Cập nhật state trong context
      await updateItemStock(id, newStock);

      // Xóa item khỏi cart
      removeFromCart(id);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  // Tính tổng tiền
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  // Xử lý checkout
  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmCheckout = () => {
    // Lưu total trước khi clear cart
    const finalTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCheckoutTotal(finalTotal);
    
    // Clear cart sau khi checkout thành công
    clearCart();
    setShowCheckoutModal(false);
    setCheckoutSuccess(true);
    
    // Redirect về trang items sau 2 giây
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCheckoutTotal(0);
      navigate('/items');
    }, 2000);
  };

  // Nếu cart trống và không phải sau khi checkout thành công
  if (items.length === 0 && !checkoutSuccess) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <h1 className="mb-4">Your Cart</h1>
          <Alert variant="info">Your cart is empty.</Alert>
          <Button variant="primary" onClick={() => navigate('/items')} className="mt-3">
            Go to Item List
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
      <h1 className="mb-4">Your Cart</h1>
      
      {/* Checkout Success Message */}
      {checkoutSuccess && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Checkout Successful!</Alert.Heading>
          <p className="mb-0">Thank you for your purchase. Total amount: <strong>${checkoutTotal.toFixed(2)}</strong></p>
          <p className="mb-0 mt-2">Redirecting to item list...</p>
        </Alert>
      )}
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {/* LƯU Ý: Thay "name" bằng field hiển thị của bạn (model, title, productName, etc.) */}
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQty = parseInt(e.target.value) || 1;
                    handleQuantityChange(item.id, newQty);
                  }}
                  style={{ width: '80px' }}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">
              Total:
            </td>
            <td className="fw-bold">${total.toFixed(2)}</td>
            <td>
              <Button
                variant="success"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>

      <div className="mt-3">
        <Button variant="secondary" onClick={() => navigate('/items')}>
          Continue Shopping
        </Button>
      </div>

      {/* Checkout Confirmation Modal */}
      <ConfirmModal
        show={showCheckoutModal}
        onHide={() => setShowCheckoutModal(false)}
        onConfirm={handleConfirmCheckout}
        title="Confirm Checkout"
        message={`Are you sure you want to checkout? Total amount: $${total.toFixed(2)}`}
        confirmText="Confirm Checkout"
        cancelText="Cancel"
        confirmVariant="success"
        showCancel={true}
      />
    </Container>
    </>
  );
};

export default Cart;
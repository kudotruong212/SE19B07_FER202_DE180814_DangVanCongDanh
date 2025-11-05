import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import * as motorbikeAPI from '../api/motorbikeAPI';

const Cart = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const { updateMotorbikeStock } = useMotorbikes();
  const navigate = useNavigate();

  // Xử lý cập nhật quantity
  const handleQuantityChange = async (id, newQuantity) => {
    // Kiểm tra quantity hợp lệ
    if (newQuantity < 1) {
      return; // Không cho phép quantity < 1
    }

    const item = items.find(i => String(i.id) === String(id));
    if (!item) return;

    // Tính sự khác biệt về quantity
    const quantityDiff = newQuantity - item.quantity;

    // Cập nhật quantity trong cart
    updateQuantity(id, newQuantity);

    // Cập nhật stock trong JSON Server
    try {
      // Lấy thông tin motorbike hiện tại từ server
      const motorbike = await motorbikeAPI.getMotorbikeById(id);
      
      // Tính stock mới (nếu tăng quantity thì giảm stock, ngược lại tăng stock)
      const newStock = motorbike.stock - quantityDiff;
      
      // Nếu stock không đủ, không cho phép cập nhật
      if (newStock < 0) {
        // Revert quantity về giá trị cũ
        updateQuantity(id, item.quantity);
        alert('Not enough stock available!');
        return;
      }

      // Cập nhật stock trong JSON Server
      await motorbikeAPI.updateMotorbike(id, {
        ...motorbike,
        stock: newStock
      });

      // Cập nhật state trong context
      updateMotorbikeStock(id, newStock);
    } catch (error) {
      console.error('Error updating stock:', error);
      // Revert quantity về giá trị cũ nếu có lỗi
      updateQuantity(id, item.quantity);
      alert('Failed to update quantity');
    }
  };

  // Xử lý xóa item khỏi cart (restore stock)
  const handleRemove = async (id) => {
    const item = items.find(i => String(i.id) === String(id));
    if (!item) return;

    try {
      // Lấy thông tin motorbike hiện tại từ server
      const motorbike = await motorbikeAPI.getMotorbikeById(id);
      
      // Restore stock: thêm lại số lượng đã mua
      const newStock = motorbike.stock + item.quantity;
      
      // Cập nhật stock trong JSON Server
      await motorbikeAPI.updateMotorbike(id, {
        ...motorbike,
        stock: newStock
      });

      // Cập nhật state trong context
      updateMotorbikeStock(id, newStock);

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

  // Xử lý checkout - Update stock trong JSON Server
  const handleCheckout = async () => {
    try {
      // Lặp qua từng item trong cart và update stock trong JSON Server
      for (const item of items) {
        // Lấy thông tin motorbike hiện tại từ server
        const motorbike = await motorbikeAPI.getMotorbikeById(item.id);
        
        // Tính stock mới: trừ đi số lượng đã mua
        const newStock = motorbike.stock - item.quantity;
        
        // Kiểm tra stock có đủ không
        if (newStock < 0) {
          alert(`Not enough stock for ${item.model}. Available: ${motorbike.stock}, Required: ${item.quantity}`);
          return;
        }
        
        // Update stock trong JSON Server
        await motorbikeAPI.updateMotorbike(item.id, {
          ...motorbike,
          stock: newStock
        });
        
        // Update stock trong state
        updateMotorbikeStock(item.id, newStock);
      }
      
      // Clear cart sau khi checkout thành công
      clearCart();
      
      // Hiển thị success message và redirect
      alert('Checkout successful! Your order has been placed.');
      navigate('/motorbikes');
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message}`);
    }
  };

  // Nếu cart trống
  if (items.length === 0) {
    return (
      <Container className="mt-4">
        <h1 className="mb-4">Your Cart</h1>
        <Alert variant="info">Your cart is empty.</Alert>
        <Button variant="primary" onClick={() => navigate('/motorbikes')} className="mt-3">
          Go to Motorbike List
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Your Cart</h1>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Model</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.model}</td>
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
                onClick={() => {
                  alert('Checkout functionality not implemented');
                }}
              >
                Checkout
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>

      <div className="mt-3">
        <Button variant="secondary" onClick={() => navigate('/motorbikes')}>
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
};

// PropTypes validation
Cart.propTypes = {
  // Component này không nhận props từ bên ngoài
};

export default Cart;
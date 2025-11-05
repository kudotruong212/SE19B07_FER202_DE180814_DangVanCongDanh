const API_URL = 'http://localhost:3001';

// 1. Lấy TẤT CẢ motorbikes từ server
export const getMotorbikes = async () => {
  const response = await fetch(`${API_URL}/motorbikes`);
  if (!response.ok) {
    throw new Error('Failed to fetch motorbikes');
  }
  return await response.json();
};

// 2. Lấy motorbike THEO ID
export const getMotorbikeById = async (id) => {
  const response = await fetch(`${API_URL}/motorbikes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch motorbike');
  }
  return await response.json();
};


// 3. Cập nhật motorbike
export const updateMotorbike = async (id, motorbike) => {
    try {
      // Đảm bảo ID là số (convert string thành number nếu cần)
      const idNumber = Number(id);
      if (isNaN(idNumber)) {
        throw new Error(`Invalid motorbike ID: ${id}`);
      }
      
      const url = `${API_URL}/motorbikes/${idNumber}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motorbike),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update motorbike: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message.includes('Failed to update')) {
        throw error;
      }
      throw new Error(`Network error: ${error.message}`);
    }
  };
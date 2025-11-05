const API_URL = 'http://localhost:3001/motorbikes';

export const getMotorbikes = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch motorbikes');
    return await response.json();
};

export const getMotorbikeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch motorbike');
    return await response.json();
};

export const updateMotorbike = async (id, motorbike) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(motorbike)
    });
    if (!response.ok) throw new Error('Failed to update motorbike');
    return await response.json();
};
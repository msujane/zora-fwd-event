const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const apiCall = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 7000);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);

        if (!response.ok) {
            let errorMessage = `API Error: ${response.status}`;
            try {
                const errorData = await response.json();
                if (errorData && errorData.detail) {
                    errorMessage = errorData.detail;
                }
            } catch (jsonErr) { }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Network timeout. Please try again later.');
        }
        console.error('API call failed:', error);
        throw error;
    }
};

export async function registerUser(data) {
    return await apiCall('/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function submitFeedback(data) {
    return await apiCall('/submit-feedback', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function submitScore(data) {
    return await apiCall('/submit-score', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getAllUsers() {
    return await apiCall('/users', {
        method: 'GET',
    });
}

export async function getTopWinners() {
    return await apiCall('/winners', {
        method: 'GET',
    });
}
// Centralized API client for making HTTP requests
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Set authorization token
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authorization token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || `HTTP ${response.status}`,
          response.status,
          data
        );
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0,
        null
      );
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    return this.request<T>(url, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    // Remove Content-Type header to let browser set it with boundary
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type'];

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    });
  }
}

// Response type
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

// Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Default API client instance
export const api = new ApiClient();

// Helper functions for common API operations

// Analytics APIs
export const analyticsApi = {
  getEvents: (params?: { division?: string; startDate?: string; endDate?: string }) =>
    api.get('/analytics/events', params),
  
  trackEvent: (eventData: any) =>
    api.post('/analytics/events', eventData),
  
  getDashboard: (division?: string) =>
    api.get('/analytics/dashboard', division ? { division } : undefined),
};

// Leads APIs
export const leadsApi = {
  getLeads: (params?: { division?: string; status?: string; page?: number; limit?: number }) =>
    api.get('/leads', params),
  
  createLead: (leadData: any) =>
    api.post('/leads', leadData),
  
  updateLead: (id: string, updates: any) =>
    api.patch(`/leads/${id}`, updates),
  
  deleteLead: (id: string) =>
    api.delete(`/leads/${id}`),
  
  scoreLead: (id: string) =>
    api.post(`/leads/${id}/score`),
};

// Email APIs
export const emailApi = {
  sendEmail: (emailData: any) =>
    api.post('/email/send', emailData),
  
  getCampaigns: () =>
    api.get('/email/campaigns'),
  
  createCampaign: (campaignData: any) =>
    api.post('/email/campaigns', campaignData),
  
  updateCampaign: (id: string, updates: any) =>
    api.patch(`/email/campaigns/${id}`, updates),
};

// Booking APIs
export const bookingApi = {
  getAvailability: (params?: { date?: string; duration?: number }) =>
    api.get('/bookings/availability', params),
  
  createBooking: (bookingData: any) =>
    api.post('/bookings', bookingData),
  
  updateBooking: (id: string, updates: any) =>
    api.patch(`/bookings/${id}`, updates),
  
  cancelBooking: (id: string) =>
    api.patch(`/bookings/${id}`, { status: 'cancelled' }),
  
  getBookings: (params?: { date?: string; status?: string }) =>
    api.get('/bookings', params),
};

// File upload APIs
export const uploadApi = {
  uploadImage: (file: File, folder?: string) =>
    api.upload('/upload/image', file, folder ? { folder } : undefined),
  
  uploadDocument: (file: File, folder?: string) =>
    api.upload('/upload/document', file, folder ? { folder } : undefined),
  
  deleteFile: (fileUrl: string) =>
    api.delete(`/upload?file_url=${encodeURIComponent(fileUrl)}`),
};

// Payment APIs
export const paymentApi = {
  createPaymentIntent: (data: { amount: number; currency?: string }) =>
    api.post('/payments/create-intent', data),
  
  confirmPayment: (data: { payment_method_id: string; payment_intent_id: string }) =>
    api.post('/payments/confirm', data),
  
  getPaymentMethods: () =>
    api.get('/payments/methods'),
  
  addPaymentMethod: (data: any) =>
    api.post('/payments/methods', data),
};

// Auth APIs
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  logout: () =>
    api.post('/auth/logout'),
  
  refreshToken: () =>
    api.post('/auth/refresh'),
  
  resetPassword: (email: string) =>
    api.post('/auth/reset-password', { email }),
  
  updateProfile: (updates: any) =>
    api.patch('/auth/profile', updates),
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Request interceptor utility
export const withAuthToken = (token: string) => {
  api.setAuthToken(token);
  return api;
};

// Response transformation utility
export const transformResponse = <T, U>(
  response: ApiResponse<T>,
  transformer: (data: T) => U
): ApiResponse<U> => ({
  ...response,
  data: transformer(response.data),
}); 
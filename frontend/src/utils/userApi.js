import { AxiosInstance } from "../routes/axiosInstance";

// User authentication and profile APIs
export const register = async (payload) => {
  const resp = await AxiosInstance.post("/users/register", payload);
  return resp.data;
};

export const login = async (payload) => {
  const resp = await AxiosInstance.post("/users/login", payload);
  return resp.data;
};

export const refreshToken = async () => {
  const resp = await AxiosInstance.post("/users/refresh-token");
  return resp.data;
};

export const getCurrentUser = async () => {
  const resp = await AxiosInstance.get("/users/me");
  return resp.data;
};

export const logout = async () => {
  const resp = await AxiosInstance.post("/users/logout");
  return resp.data;
};

export const getAllApi = async () => {
  const resp = await AxiosInstance.get("/users/getAllApi");
  // ApiResponse shape: { message, data, statusCode }
  return resp.data?.data;
}
export const getSingleApi = async (apiId) => {
  const resp = await AxiosInstance.get(`/users/get-single-api/${apiId}`);
  // ApiResponse shape: { message, data, statusCode }
  return resp.data?.data;
}

// Contact/Enquiry
export const submitEnquiry = async (payload) => {
  const resp = await AxiosInstance.post("/users/contact", payload);
  return resp.data;
};

export const changeUserPassword = async ({ password, newPassword, confirmNewPassword }) => {
  const resp = await AxiosInstance.patch("/users/change-password", { password, newPassword, confirmNewPassword })
  return resp.data
}

export const updateUserProfileData = async ({ name, email }) => {
  const resp = await AxiosInstance.patch("/users/update-profile", { name, email })
  return resp.data
}


// generate api Key
export const generateApiKey = async(apiId) => {
  const resp = await AxiosInstance.post(`/keys/generate-api-keys/${apiId}`)
  return resp.data.data.apiKey
}

// fetch apiKey

export const fetchApiKey = async(apiId) => {
  const resp = await AxiosInstance.get(`/keys/get-api-key/${apiId}`)
   return resp.data?.data
}

//fetch all services 
export const fetchAllServices = async() => {
  const resp = await AxiosInstance.get("/keys/get-all-services")
  return resp.data
}

//create order id and payment id 
export const createPaymentAuthorised = async() => {
  const resp = await AxiosInstance.post("/users/authorise-payment")

  return resp.data
}

// authorised user by payment on 1 rs
export const handlePaymentAuth = async (userId, response) => {
  await AxiosInstance.post("/users/save-payment-auth", {
    userId,
    paymentId: response.razorpay_payment_id,
    orderId: response.razorpay_order_id,
    signature: response.razorpay_signature,
  });
};

// Usage & Billing
export const getUsageSummary = async () => {
  const resp = await AxiosInstance.get("/users/usage-summary");
  return resp.data?.data;
}

export const getRecentInvoices = async () => {
  const resp = await AxiosInstance.get("/users/recent-invoices");
  return resp.data?.data?.invoices || [];
}

export const getPaymentMethod = async () => {
  const resp = await AxiosInstance.get("/users/payment-method");
  return resp.data?.data;
}

export const getUserAnalytics = async () => {
  const resp = await AxiosInstance.get("/users/analytics");
  return resp.data?.data;
}





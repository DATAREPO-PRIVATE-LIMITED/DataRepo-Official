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
export const getSingleApi = async (id) => {
  const resp = await AxiosInstance.get(`/users/get-single-api/${id}`);
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

export const fetchApiKey = async() => {
  const resp = await AxiosInstance.get("/keys/get-api-key")
   return resp.data?.data
}



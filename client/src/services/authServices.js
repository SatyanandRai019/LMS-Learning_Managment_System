import api from "./api";

export const loginUser = async (data) => {
    const response = await api.post("/user/login", data);
    return response.data;
};

export const registerUser = async (formData) => {
    const response = await api.post("/user/register", formData);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/user/me");
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.get("/user/logout");
    return response.data;
};

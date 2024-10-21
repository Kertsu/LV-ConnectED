import axiosInstance from "./axiosConfig";

//GET one user
export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

//GET all user
export const getAllUsers = async (page: number, take: number) => {
  const response = await axiosInstance.get(`/users`, {
    params: {
      page,
      take,
    },
  });
  return response.data;
};

//ALL STUDENTS
export const getAllStudents = async (page: number, take: number) => {
  const response = await axiosInstance.get("/students", {
    params: {
      page,
      take,
    },
  });
  console.log("User Service", response.data); // Add this line to log the response data
  return response.data;
};

// ALL Providers for public
export const getAllProvidersPublic = async (page: number, take: number, sortOrder:string) => {
  const response = await axiosInstance.get("/providers", {
    params: {
      page,
      take,
      sortOrder,
      verified: "true", 
    },
  });
  return response.data;
};


//ALL PROVIDERS
export const getAllProviders = async (page: number, take: number, sortOrder:string) => {
  const response = await axiosInstance.post("/admin/providers",{}, {
    params: {
      page,
      take,
      sortOrder,
      verified: "true", 
    },
  });
  return response.data;
};

// Service for fetching unverified providers (specify verified = false)
export const getUnVerifiedProviders = async (page: number, take: number, sortOrder: string = "ASC") => {
  const response = await axiosInstance.post("/admin/providers",{}, {
    params: {
      page,
      take,
      sortOrder,
      verified: "false", 
    },
  });
  return response.data;
};

// Get Archives
export const getArchiveUsers = async (page: number, take: number, sortOrder: string = "ASC") => {
  const response = await axiosInstance.post("/admin/users",{}, {
    params: {
      page,
      take,
      sortOrder,
      archived: "true",
    },
  });
  console.log("ln:67 User Service", response.data); // Add this line to log the response data
  return response.data;
};

export const getProviderById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/providers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provider by ID:", error);
    throw error;
  }
};

//Change Password
export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await axiosInstance.post("/@self/change-password", {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return response.data;
};

//Change Avatar
export const changeAvatar = async (avatarUrl: string) => {
  const response = await axiosInstance.post("/@self/upload/avatar", {
    avatarUrl,
  });
  return response.data;
};

//Update Self [name. bio]
export const updateSelf = async (name: string, bio: string) => {
  const response = await axiosInstance.post("/@self/update", {
    name,
    bio,
  });
  return response.data;
};

//Delete Account
export const deleteAccount = async (id: string): Promise<void> => {
  const response = await axiosInstance.post(`/admin/users/${id}/remove`);
  return response.data;
};

//Archive user
export const archiveUserById = async (id: string) => {
  const response = await axiosInstance.post(`/admin/users/${id}/archive`);
  return response.data;
};
//Remove archive status
export const unArchiveUserById = async (id: string) => {
  const response = await axiosInstance.post(`/admin/users/${id}/unarchive`);
  return response.data;
};
// accept provider
export const verifyProviderById = async (id: string) => {
  const response = await axiosInstance.post(`/admin/providers/${id}/verify`);
  return response.data;
};

//Upload Valid ID
export const uploadValidId = async ( validIdUrl: string) => {
  const response = await axiosInstance.post("/@self/upload/valid-id", {
    validIdUrl,
  });
  return response.data;
};
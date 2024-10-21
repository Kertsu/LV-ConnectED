import {
  getUserById,
  getAllUsers,
  deleteAccount,
  changeAvatar,
  updateSelf,
  getAllStudents,
  getAllProviders,
  archiveUserById,
  getProviderById,
  getUnVerifiedProviders,
  verifyProviderById,
  unArchiveUserById,
  getArchiveUsers,
  uploadValidId
} from "@/api/userService";
import { useMutation, useQuery } from "@tanstack/react-query";

// get ONE user
export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    staleTime: 5000,
  });
};

// get ALL users
export const useAllUser = (page: number, take: number) => {
  return useQuery({
    queryKey: ["users", page, take],
    queryFn: () => getAllUsers(page, take),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
  });
};

// get ALL STUDENTS
export const useUserByStudents = (page: number, take: number) => {
  return useQuery({
    queryKey: ["students", page, take],
    queryFn: () => getAllStudents(page, take),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
    select: (data) => ({ students: data.students, count: data.count }), // Return both data and count
  });
};
//Providers
export const useUserByProviders = (page: number, take: number) => {
  return useQuery({
    queryKey: ["providers", page, take],
    queryFn: () => getAllProviders(page, take),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
    select: (data) => ({ providers: data.providers, count: data.count }), // Return both data and count
  });
};

export const useProviderById = (id: string) => {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: () => getProviderById(id),
    staleTime: 5000,
    enabled: !!id, // Only fetch if id is defined
  });
};
// Hook for fetching unverified providers with sorting
export const useUnverifiedProviders = (page: number, take: number, sortOrder: string = "ASC") => {
  return useQuery({
    queryKey: ["unverifiedProviders", page, take, sortOrder],
    queryFn: () => getUnVerifiedProviders(page, take, sortOrder),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
    // Optionally, you can select specific fields to return
    // select: (data) => ({ providers: data.providers, count: data.count }),
  });
};
// DELETE user
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
  });
};

// change Avatar
export const useChangeAvatar = () => {
  return useMutation({
    mutationFn: (id: string) => changeAvatar(id),
  });
};

// Update Bio
export const useUpdateBio = () => {
  return useMutation({
    mutationFn: ({ name, bio }: { name: string; bio: string }) =>
      updateSelf(name, bio),
  });
};

// Archive user
export const useArchiveUser = () => {
  return useMutation({
    mutationFn: (id: string) => archiveUserById(id),
  });
};

// Unarchive user
export const useUnArchiveUser = () => {
  return useMutation({
    mutationFn: (id: string) => unArchiveUserById(id),
  });
};

// Approve Provider
export const useApproveProvider = () => {
  return useMutation({
    mutationFn: (id: string) => verifyProviderById(id),
  });
};

// Remove user
export const useDeleteUserById = () => {
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
  });
}

// getArchived users
export const useArchivedUsers = (page: number, take: number, sortOrder: string = "ASC") => {
  return useQuery({
    queryKey: ["archivedUsers", page, take, sortOrder],
    queryFn: () => getArchiveUsers(page, take, sortOrder),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: page >= 0 && take > 0,
    // select: (data) => ({ archivedUsers: data.archivedUsers, count: data.count }), // Return both data and count
  });
};


// Upload Valid Id
export const useUploadValidId = () => {
  return useMutation({
    mutationFn: (validIdUrl: string) => uploadValidId(validIdUrl),
  });
};
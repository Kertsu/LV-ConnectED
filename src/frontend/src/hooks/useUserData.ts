import {
  getUserById,
  getAllUsers,
  deleteAccount,
  changeAvatar,
  updateSelf,
  getAllStudents,
  getAllProviders,
  archiveUserById,
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

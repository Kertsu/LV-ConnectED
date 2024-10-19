// import { useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { CalendarDays, MapPin, Briefcase, Link as LinkIcon, UserCircle, Settings, Edit, Camera } from "lucide-react";
// import Header from '@/components/header/user-header/Header';
// import { AccountSettingsModal } from '@/components/profile/AccountSettingsModal';
// import { EditProfileModal } from '@/components/profile/EditProfileModal';

// interface User {
//   name: string;
//   avatar: string;
//   banner: string;
//   bio: string;
//   information: {
//     role: string;
//     createdAt: string;
//     location: string;
//     website: string;
//   };
//   skills: string[];
// }

// export default function ProfilePage() {
//   const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
//   const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState(false);

//   const [user, setUser] = useState<User>({
//     name: "Johnmack Faeldonia",
//     avatar: "https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/452912470_2526121527595306_3752199441102383149_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtCgs-XyXL89ENkqy7JG3peWlRnJXahMF5aVGcldqEwU1hJd6qhyhKUGWsK52KiDE16tK8oTnAWiBcfTghtwJt&_nc_ohc=0aFGsrCXi6EQ7kNvgGeDTFV&_nc_zt=23&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=ANu0xv9z85XR0ENGh62yylc&oh=00_AYBGZKYtxIFtM7UfMbbYyIGbDTDRHZIUjJCb0LPeVAY0kg&oe=670F8366",
//     banner: "https://scontent.fcrk4-2.fna.fbcdn.net/v/t39.30808-6/462693785_572297352034208_4072350988270131867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFxBIb5Ks6pVotefQzSmLg2vtFEeWRvEfG-0UR5ZG8R8UKS6JjidRPX9j7J9h9xwYhQdTNurlH26M6MCoMhw-9i&_nc_ohc=PHe0jc1YwpoQ7kNvgFGQUBI&_nc_zt=23&_nc_ht=scontent.fcrk4-2.fna&_nc_gid=AsqXPYjBH7H6yMKrcvnDH9x&oh=00_AYDyB5P75ExnxfKLuvVtJztyx3M2aJTRK343Pl9kJny8Og&oe=670FADBD",
//     bio: "Aspiring software engineer with a passion for AI and machine learning.",
//     information: {
//       role: "Student",
//       createdAt: "May 8, 2024",
//       location: "San Francisco, CA",
//       website: "johnmack.dev"
//     },
//     skills: ["React", "TypeScript", "Node.js", "AI", "Machine Learning"]
//   });

//   const handleEditProfile = (updatedUser: User) => {
//     setUser(updatedUser);
//   };

//   const handleAccountSettings = (email: string, password: string) => {
//     console.log('Update account settings:', { email, password });
//     // Implement account settings update logic here
//   };

//   const handleDeleteAccount = (email: string) => {
//     // Implement your delete logic here
//     console.log(`Deleting account for email: ${email}`);
//     // Optionally, show a success or error message to the user
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header/>
//       <div className="relative">
//         {/* Banner */}
//         <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 relative">
//           <img
//             src={user.banner}
//             alt="Profile Banner"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30" />
//         </div>
        
//         {/* User Info Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <div className="max-w-6xl mx-auto flex items-end">
//             <Avatar className="w-32 h-32 border-4 border-white">
//               <AvatarImage src={user.avatar} alt={user.name} />
//               <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//             </Avatar>
//             <div className="ml-6 mb-2">
//               <h1 className="text-4xl font-bold">{user.name}</h1>
//               <p className="text-xl">{user.information.role}</p>
//             </div>
//           </div>
//         </div>

//         {/* Change Banner Button */}
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
//           onClick={() => console.log('Change banner')}
//         >
//           <Camera className="h-4 w-4" />
//           <span className="sr-only">Change banner</span>
//         </Button>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-16">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main content */}
//           <div className="w-full lg:w-2/3">
//             <Card className="mb-8">
//               <CardContent className="p-6">
//                 <p className="text-muted-foreground mb-4">{user.bio}</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div className="flex items-center">
//                     <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <span>{user.information.role}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <span>{user.information.location}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CalendarDays className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <span>Joined {user.information.createdAt}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <LinkIcon className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <a href={`https://${user.information.website}`} className="text-primary hover:underline">{user.information.website}</a>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Tabs defaultValue="posts" className="w-full">
//               <TabsList className="w-full justify-start mb-6">
//                 <TabsTrigger value="posts">Posts</TabsTrigger>
//                 <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
//               </TabsList>
//               <TabsContent value="posts">
//                 <Card>
//                   <CardContent className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
//                     <p className="text-muted-foreground">No posts yet.</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="bookmarks">
//                 <Card>
//                   <CardContent className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">Bookmarks</h2>
//                     <p className="text-muted-foreground">No bookmarks yet.</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           {/* Sidebar */}
//           <div className="w-full lg:w-1/3 space-y-6">
//             <Card>
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//                 <div className="space-y-2">
//                   <Button 
//                     variant="outline" 
//                     className="w-full justify-start" 
//                     size="sm"
//                     onClick={() => setIsEditProfileModalOpen(true)}
//                   >
//                     <Edit className="mr-2 h-4 w-4" />
//                     Edit Profile
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     className="w-full justify-start" 
//                     size="sm"
//                     onClick={() => setIsAccountSettingsModalOpen(true)}
//                   >
//                     <Settings className="mr-2 h-4 w-4" />
//                     Account Settings
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold mb-2">Skills</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {user.skills.map((skill, index) => (
//                     <Badge key={index} variant="secondary">{skill}</Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//             <div className="text-xs text-muted-foreground space-y-1">
//               <p>Member since {user.information.createdAt}</p>
//               <p>ConnectEd 2024</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <EditProfileModal
//         user={user}
//         isOpen={isEditProfileModalOpen}
//         onClose={() => setIsEditProfileModalOpen(false)}
//         onSave={handleEditProfile}
//       />

//      <AccountSettingsModal
//       isOpen={isAccountSettingsModalOpen}
//       onClose={() => setIsAccountSettingsModalOpen(false)}
//       onSave={handleAccountSettings}
//       onDeleteAccount={handleDeleteAccount} // Pass the new handler
//     />
//     </div>
//   );
// }
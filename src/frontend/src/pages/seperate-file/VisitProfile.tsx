// import { useParams, useNavigate } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { CalendarDays, MapPin, Briefcase, Link as LinkIcon, Star, Mail } from "lucide-react";

// import Header from '@/components/header/user-header/Header';
// import { dummyTopProviders } from '../../../components/data/dummy-data';

// export default function ProviderProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const provider = dummyTopProviders.find((p) => p.id === id);

//   if (!provider) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Provider not found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <div className="relative">
//         {/* Cover Photo */}
//         <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 relative">
//           <img
//             src={provider.avatar}
//             alt={provider.provider}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30" />
//         </div>
        
//         {/* Provider Info Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <div className="max-w-6xl mx-auto flex items-end">
//             <Avatar className="w-32 h-32 border-4 border-white">
//               <AvatarImage src={provider.avatar} alt={provider.provider} />
//               <AvatarFallback>{provider.provider.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div className="ml-6 mb-2">
//               <h1 className="text-4xl font-bold">{provider.provider}</h1>
//               <p className="text-xl">{provider.category}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main content */}
//           <div className="w-full lg:w-2/3">
//             <Card className="mb-8">
//               <CardContent className="p-6">
//                 <p className="text-muted-foreground mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ducimus consectetur pariatur fugit, nobis ipsa nam blanditiis? Libero fuga vitae maiores reprehenderit velit? Saepe amet corrupti perferendis! Corrupti, eos molestias?</p>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
                 
//                   <div className="flex items-center">
//                     <CalendarDays className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <span>Joined June 12, 2024</span>
//                   </div>
//                   <div className="flex items-center">
//                     <LinkIcon className="w-4 h-4 mr-2 text-muted-foreground" />
//                     <a href={`https://connectED.com`} className="text-primary hover:underline">ConnectED</a>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Tabs defaultValue="details" className="w-full">
//               <TabsList className="w-full justify-start mb-6">
//                 <TabsTrigger value="details">Details</TabsTrigger>
//                 <TabsTrigger value="scholarship">Scholarship</TabsTrigger>
//               </TabsList>
//               <TabsContent value="details">
//                 <Card>
//                   <CardContent className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">Details</h2>
//                     <p className="text-muted-foreground">Provider details go here. This section can include more specific information about the provider, their services, or any other relevant details.</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="scholarship">
//                 <Card>
//                   <CardContent className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">Scholarship Information</h2>
//                     <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sapiente similique iusto asperiores expedita molestiae ipsam cumque! Labore earum doloremque rem eligendi libero, ratione, tempora unde excepturi, qui saepe quaerat.</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           {/* Sidebar */}
//           <div className="w-full lg:w-1/3 space-y-6">
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold mb-2">Provider Rating</h3>
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${i < provider.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
//                       fill="currentColor"
//                     />
//                   ))}
//                   <span className="ml-2 text-sm text-muted-foreground">
//                     {provider.rating.toFixed(1)} ({provider.reviews} reviews)
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6 space-y-4">
//                 <Button 
//                   className="w-full" 
//                   onClick={() => navigate('/contact')}
//                 >
//                   <Mail className="mr-2 h-4 w-4" />
//                   Contact Provider
//                 </Button>
//                 <Button 
//                   variant="outline"
//                   className="w-full" 
//                   onClick={() => navigate('/scholarships')}
//                 >
//                   View Scholarships
//                 </Button>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="text-lg font-semibold mb-2">Quick Facts</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-center">
//                     <Badge variant="secondary" className="mr-2">Type</Badge>
//                     <span>{provider.category}</span>
//                   </li>
                
//                   <li className="flex items-center">
//                     <Badge variant="secondary" className="mr-2">Established</Badge>
//                     <span>2024</span>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/model";
import parse from "html-react-parser";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import CustomHtmlParser from "./CustomHTMLParser";
import { Button } from "@/components/ui/button";

export default function PostSection() {
  const post: Post = {
    id: 1,
    thumbnail: "https://picsum.photos/seed/NjVyP1nKs/3137/3871",
    title: "abscido ultio commodo",
    type: "internship",
    content:
      "Conforto absens decipio angulus cilicium peccatus vulgus. Tot ipsa tutis creta. Paulatim ventosus venio cubicularis armarium creber optio iste crudelis centum.\nPatior aer teres supplanto adulatio. Ademptio constans conicio studio alioqui victus defluo combibo. Adimpleo vorago derelinquo calculus corrigo una praesentium cum.\nTurbo callide ventosus amplus canto a. Tam admoveo compono conservo laboriosam compono amita atrox. Hic cunabula censura.",
    createdAt: "2024-02-11T07:24:44.603Z",
    user: {
      id: 17,
      bannerUrl:
        "https://scontent.fcrk4-2.fna.fbcdn.net/v/t39.30808-6/462693785_572297352034208_4072350988270131867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFxBIb5Ks6pVotefQzSmLg2vtFEeWRvEfG-0UR5ZG8R8UKS6JjidRPX9j7J9h9xwYhQdTNurlH26M6MCoMhw-9i&_nc_ohc=PHe0jc1YwpoQ7kNvgFGQUBI&_nc_zt=23&_nc_ht=scontent.fcrk4-2.fna&_nc_gid=AsqXPYjBH7H6yMKrcvnDH9x&oh=00_AYDyB5P75ExnxfKLuvVtJztyx3M2aJTRK343Pl9kJny8Og&oe=670FADBD",
      name: "La Verdad Christian College, Inc. - Apalit, Pampanga",
      organizationName: "La Verdad Christian College, Inc. - Apalit, Pampanga",
      bio: "Wisdom based on the truth is priceless.",
      email: "info@laverdad.edu.ph",
      emailVerifiedAt: "2024-09-20T12:00:00.000Z",
      providerVerifiedAt: null,
      role: "provider",
      createdAt: "2024-03-20T12:00:00.000Z",
      updatedAt: "2024-09-20T12:00:00.000Z",
      archivedAt: null,
    },
    feedbacks: [
      {
        id: 30,
        rate: 3,
        content:
          "Agnosco molestiae adhuc sequi ulterius quia. Provident suscipio aut comis. Delicate thesis tamisium.",
        createdAt: "2024-01-23T21:15:55.128Z",
        updatedAt: "2024-10-16T06:48:58.605Z",
        user: {
          id: 2,
          avatarUrl: "https://avatars.githubusercontent.com/u/53380626",
          bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
          name: "Gene Schmidt",
          organizationName: null,
          bio: "Solitudo in defluo colligo vomica sophismata cura.",
          email: "Henri96@yahoo.com",
          emailVerifiedAt: "2024-10-16T09:26:15.474Z",
          providerVerifiedAt: null,
          role: "student",
          createdAt: "2024-03-05T13:04:38.457Z",
          updatedAt: "2024-10-16T13:16:26.688Z",
          archivedAt: null,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full border px-4 py-4 rounded-lg  md:px-8">
      <PostFrontGroup post={post} />
      <MetaDataGroup post={post} />
      <div className="py-4">
        {<CustomHtmlParser htmlContent={post.content} />}
      </div>
    </div>
  );
}

function PostFrontGroup({ post }: { post: Post }) {
  return (
    <div className="relative w-full h-full   ">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="object-cover w-full h-[200px] md:h-[300px] aspect-video rounded-t-lg"
      />
      <Button
        variant={null}
        size={null}
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hover:backdrop-blur-sm transition-all ease-in-out duration-100"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toast.info("Thumbnail fullscreen view");
        }}
      />
      <h1 className="text-xl md:text-3xl font-extrabold tracking-tight z-20 absolute bottom-4 left-4 ">
        {parse(post.title)}
      </h1>
    </div>
  );
}

function MetaDataGroup({ post }: { post: Post }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 bg-gradient-to-r from-blue-800 to-purple-800 rounded-b-lg">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={post.user.avatarUrl} />
          <div className="h-full w-full absolute inset-0 hover:bg-black/40" />
          <AvatarFallback>ED</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between gap-1">
          <p className="text-base font-medium leading-none cursor-pointer hover:underline text-white">
            {post.user.name}
          </p>
          <p className="text-sm text-muted-foreground cursor-pointer hover:underline">
            {post.user.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end pt-5 md:pt-0 justify-start w-full">
        <Button
          variant={"default"}
          className="flex gap-2 font-normal bg-blue-700 text-white hover:bg-gray-800 "
        >
          <Mail className="h-4 w-4" />
          Contact
        </Button>
      </div>
    </div>
  );
}

import { getTimeAgo } from "@/lib/helpers";
import { Feedback as FeedbackModel, User } from "@/types/model";
import { Star } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface FeedbackProps {
  user: User;
  feedback: FeedbackModel;
}

const Feedback: React.FC<FeedbackProps> = (FeedbackProps) => {
  const { user, feedback } = FeedbackProps;
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <>
      <div
        className="w-full flex flex-col gap-1 border p-3.5 rounded-lg hover:bg-primary-foreground cursor-pointer  "
        onClick={() => alert("open modal for solo feedback")}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-start justify-between w-full ">
            <div className="flex justify-start gap-3 w-full">
              <Avatar
                className="w-12 h-12 cursor-pointer"
                onClick={() => alert("redirect to indiv provider screen")}
              >
                <AvatarImage
                  className="aspect-square object-cover rounded-full"
                  src={user.avatarUrl}
                  alt={user.name ?? user.organizationName}
                />
                <AvatarFallback>
                  {user.name ?? user.organizationName}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-[.0125rem] justify-start w-full">
                <div className="flex justify-between items-center">
                  <p className="z-[1] text-sm text-primary font-bold">
                    {user.name ?? user.organizationName}
                  </p>

                  <small className="text-end font-semibold">
                    {getTimeAgo(currentDate, feedback.createdAt)}
                  </small>
                </div>
                <div className="flex gap-2.5 items-center">
                  <p className="text-xs text-gray-500 flex gap-[.25rem]">
                    {Array.from(Array(feedback.rate)).map((_) => (
                      <Star className="fill-blue-500 text-blue-500 w-4"></Star>
                    ))}
                  </p>
                  <h3 className="font-bold ">{feedback.rate}.0</h3>
                </div>
                <p className="text-sm mt-2 line-clamp-4">{feedback.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;

import Feedback from "@/components/review/Feedback";
import { Feedback as FeedbackModel, User } from "@/types/model";
export default function ReviewSection() {
  const user: User = {
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
  }

  const feedback: FeedbackModel = {
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
  }
  return (
    <div className="min-h-96 h-full w-full md:w-full lg:w-96 flex flex-col gap-2 ">
      <h1 className="text-xl tracking-tight font-semibold">Reviews</h1>
      <div className="flex flex-col justify-start items-center gap-2">
        <Feedback user={user} feedback={feedback} />
        <Feedback user={user} feedback={feedback} />
      </div>
    </div>
  );
}

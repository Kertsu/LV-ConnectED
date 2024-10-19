import React from "react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header/landing-header/Header";
import CreatePost from "@/components/post/post-form/CreatePost";
import Footer from "@/components/footer/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  Smile,
  Zap,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlurFade from "@/components/ui/blur-fade";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { useTheme } from "@/components/theme-provider";
import WordFadeIn from "@/components/ui/word-fade-in";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "DOST",
    username: "@DOST",
    // body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://res.cloudinary.com/djsrqk4fc/image/upload/v1729293524/dost_wqm8fs.png",
  },
  {
    name: "DepEd",
    username: "@DepEd",

    img: "https://res.cloudinary.com/djsrqk4fc/image/upload/v1729293534/GgmPiSLC_400x400_ecauou.jpg",
  },
  {
    name: "SM Foundation",
    username: "@SM Foundation",

    img: "https://res.cloudinary.com/djsrqk4fc/image/upload/v1729293533/sm_sno0b1.png",
  },
  {
    name: "Jane",
    username: "@jane",

    img: "https://res.cloudinary.com/djsrqk4fc/image/upload/v1729293532/LVCC_s8wjgj.jpg",
  },
  {
    name: "Jenny",
    username: "@jenny",

    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",

    img: "https://avatar.vercel.sh/james",
  },
];

const strengths = [
  {
    delay: 0.25,
    title: "Centralized Scholarship and Iternship Hub",
    content:
      "A one-stop platform for students to browse scholarships from multiple verified sources.",
  },
  {
    delay: 0.3,
    title: "Admin-Verified Providers",
    content:
      "Ensure all providers and opportunities listed are vetted for authenticity.",
  },
  {
    delay: 0.45,
    title: "Empowering Organizations to Reach the Right Candidates",
    content:
      "ConnectED makes it easy to reach qualified candidates. With verified student profiles and a targeted user base, your opportunities will get in front of the people who matter.",
  },
  {
    delay: 0.5,
    title: "Rating and Reviews",
    content:
      "Empower students to share their experiences and rate scholarships, fostering transparency and trust.",
  },
  {
    delay: 0.55,
    title: "User-Friendly Interface",
    content:
      "Navigate easily through a clean and intuitive platform, ensuring both students and organizations can interact seamlessly.",
  },
  {
    delay: 0.6,
    title: "Internship/OJT Opportunities",
    content:
      "Explore not just scholarships but also internship opportunities to gain practical experience.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
}: // body,
{
  img: string;
  name: string;
  username: string;
  // body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  );
};

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <div className="scroll-smooth">
      <Header />
      <div
        className="flex flex-col items-center justify-center pt-52 pb-96"
        id="home"
      >
        <BlurFade delay={0.25} inView>
          <NeonGradientCard>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold pb-10">
              Welcome to{" "}
              <span className="text-7xl font-bold dark:text--200 bg-gradient-to-r from-[#0038a9] via-[#ce1127] to-[#f5ce31] bg-clip-text text-transparent">
                ConnectED
              </span>
            </h1>
          </NeonGradientCard>
        </BlurFade>
        <BlurFade delay={0.25 * 2}>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Your Trusted Gateway to Scholarships and Internships.
          </p>
        </BlurFade>
      </div>
      {/* <Separator /> */}

      <BlurFade yOffset={50} delay={0.5} duration={0.5} inView>
        <div className="relative flex justify-center items-center w-full h-auto md:w-3/4 md:h-full mx-auto bottom-32">
          {theme.theme == "dark" ? (
            <img
              src="https://res.cloudinary.com/djsrqk4fc/image/upload/v1729279630/landing_1_epj0sk.png"
              alt="Example Image"
              className="w-full h-full border-8 border-b-0 rounded-lg"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/djsrqk4fc/image/upload/v1729279635/landing_2_fbqyex.png"
              alt="Example Image"
              className="w-full h-full border-8 border-b-0 rounded-lg"
            />
          )}
          {theme.theme == "dark" ? (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>
      </BlurFade>
      <div className="flex flex-col gap-4 items-center container mx-auto">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center py-20">
            <WordFadeIn words="What's different about ConnectEd?" />
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {strengths.map((s) => {
              return (
                <BlurFade delay={s.delay} inView>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{s.content}</p>
                    </CardContent>
                  </Card>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>

      {/* test only for top providers */}

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg pt-36 bg-background ">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center py-20">
          Partnerships
        </h1>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
      <Separator />
      <CreatePost />

      {/* TEST FEEDBACKS */}
      <div className="flex flex-col gap-4 items-center container mx-auto mt-6 pb-10">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center py-20">
            Still have questions?
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            {[
              {
                question: "What is ConnectEd?",
                answer:
                  "ConnectEd is a workspace management system designed to facilitate flexible and efficient use of office spaces.",
              },
              {
                question: "How does ConnectEd work?",
                answer:
                  "ConnectEd allows employees to book desks, meeting rooms, and other resources through an intuitive interface, while providing administrators with tools to manage and optimize workspace utilization.",
              },
              {
                question: "Can I customize my workspace?",
                answer:
                  "Yes, ConnectEd offers customization options to tailor the system to your organization's specific needs and branding.",
              },
              {
                question: "Is ConnectEd free?",
                answer:
                  "ConnectEd offers various pricing tiers, including a free trial. Please contact our sales team for detailed pricing information.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Separator />

      {/*test footer */}

      <Footer />
    </div>
  );
};

export default Home;

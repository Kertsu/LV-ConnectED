import React from "react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header/landing-header/Header";
import CreatePost from "@/components/post/post-form/CreatePost";
import Footer from "@/components/footer/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Smile, Zap, TrendingUp, UserPlus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BlurFade from "@/components/ui/blur-fade";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { useTheme } from "@/components/theme-provider";


const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <div className="scroll-smooth">
      <Header />
      <div
        className="flex flex-col items-center justify-center pt-52 pb-96"
        id="home"
      >
        <BlurFade delay={0.25} inView >
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

      <BlurFade yOffset={50} delay={0.50} duration={0.50} inView>
        <div className="relative flex justify-center items-center w-full h-auto md:w-3/4 md:h-full mx-auto bottom-32">
          { theme.theme == 'dark' && (
            <img
            src="https://res.cloudinary.com/djsrqk4fc/image/upload/v1729225848/landing_page_1st_w9ky9l.png"
            alt="Example Image"
            className="w-full h-full border-8 rounded-lg"
          />)
          }
          {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent w-full h-full"></div> */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"/>
        </div>
      </BlurFade>
      <div className="flex flex-col gap-4 items-center container mx-auto">
      <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center py-20">
              What&apos;s different about ConnectEd?
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Centralized Platform for Scholarships and Internships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>ConnectED brings together a wide range of scholarships and internships 
                    in one place, making it easier than ever to explore, compare, and discover 
                    the opportunities that are right for you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Verified Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                  Focus on applying with confidence, knowing that every opportunity 
                  on our platform is authentic.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Empowering Organizations to Reach the Right Candidates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p> ConnectED makes it easy to reach qualified candidates. 
                    With verified student profiles and a targeted user base, 
                    your opportunities will get in front of the people who matter.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Supports remote work policies while improving team collaboration.</p>
                </CardContent>
              </Card>
            </div>
          </div>
      </div>

      {/* test only for top providers */}

      <div className="flex flex-col gap-4 items-center container mx-auto mt-6">
      <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center py-20">
              What We Have to Offer?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Briefcase, title: "Flexibility at Your Fingertips" },
                { icon: Users, title: "Boosted Collaboration" },
                { icon: Smile, title: "Employee Satisfaction" },
                { icon: Zap, title: "Technology-Driven Process" },
                { icon: TrendingUp, title: "Improved Productivity" },
                { icon: UserPlus, title: "Efficient Onboarding Process" },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <item.icon className="h-6 w-6 mb-2" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
      </div>

      <CreatePost />

      {/* TEST FEEDBACKS */}
      <div className="flex flex-col gap-4 items-center container mx-auto mt-6 pb-10">
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center py-20">
              Still have questions?
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {[
                { question: "What is ConnectEd?", answer: "ConnectEd is a workspace management system designed to facilitate flexible and efficient use of office spaces." },
                { question: "How does ConnectEd work?", answer: "ConnectEd allows employees to book desks, meeting rooms, and other resources through an intuitive interface, while providing administrators with tools to manage and optimize workspace utilization." },
                { question: "Can I customize my workspace?", answer: "Yes, ConnectEd offers customization options to tailor the system to your organization's specific needs and branding." },
                { question: "Is ConnectEd free?", answer: "ConnectEd offers various pricing tiers, including a free trial. Please contact our sales team for detailed pricing information." },
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

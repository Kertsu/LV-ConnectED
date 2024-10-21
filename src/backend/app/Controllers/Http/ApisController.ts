import { Request, Response } from "express";
import { Configuration } from "../../../database/entities/configuration";
import { Post } from "Database/entities/post";
import { User } from "Database/entities/user";
import { httpResponseError, httpResponseSuccess } from "Helpers/response";
import { Feedback } from "Database/entities/feedback";

export default class ApisController {
  static async greet(request: Request, response: Response) {
    response.json({ greeting: `Hello, ${request.query.name}` });
  }

  static async configurations(request: Request, response: Response) {
    const configuration = await Configuration.find();

    response.json({
      status: 1,
      data: configuration,
    });
  }

  static async insert_configuration(request: Request, response: Response) {
    const { key, value } = request.body;
    await Configuration.insert({ key, value });

    const checkIfExist = await Configuration.findBy({ key });

    if (!checkIfExist) {
      response.json({
        status: 0,
        message: "Configuration already exists!",
      });
    }

    response.json({
      status: 1,
      message: "Configuration has been inserted!",
    });
  }

  static async update_configuration(request: Request, response: Response) {
    const { key, value } = request.body;
    const getConfiguration = await Configuration.findBy({ key });

    if (!getConfiguration) {
      response.json({
        status: 0,
        message: "Configuration not found!",
      });
    }

    await Configuration.update({ key }, { value });
    response.json({
      status: 1,
      message: "Configuration has been updated!",
    });
  }

  static async delete_configuration(request: Request, response: Response) {
    const { key } = request.body;
    const getConfiguration = await Configuration.findBy({ key });

    if (!getConfiguration) {
      response.json({
        status: 0,
        message: "Configuration not found!",
      });
    }

    await Configuration.delete({ key });

    response.json({
      status: 1,
      message: "Configuration has been deleted!",
    });
  }

  static async landing(request: Request, response: Response) {
    response.send(`<h1>You landed to ConnectED's backend service.</h1>`);
  }

  static async seed(request: Request, response: Response) {
    const realisticScholarhipPrograms = [
      {
        title: "STUDY NOW, PAY <strike>LATER</strike> NEVER",
        thumbnail:
          "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/320882903_1147742609279206_8842410715101474045_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=yO1Eo4dqeZwQ7kNvgEFM5fi&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=A6t2DWprWgUW58BTs_yZEHc&oh=00_AYByx9U1uMB7g9_6yAaY28-Kacz4BOsW1RwzfrSN6IRqFA&oe=671C3A64",
        type: "scholarship",
        content:
          "<h1>STUDY NOW, PAY NEVER!</h1><p>Quality Education for FREE!</p><p>La Verdad Christian College - Caloocan is NOW OPEN for Application for the FULL SCHOLARSHIP GRANT in College for Academic Year 2022-2023.</p><p>Please click the link for the admission details:</p><p><a href='https://tinyurl.com/OnlineApplicationAY2223?fbclid=IwZXh0bgNhZW0CMTAAAR08KuSH7XAX9r9sqnY4Un5CBIGMqKLCtA8roxtMGO1Kxo13_iQcI4eH90c_aem_53aenhiou2dhfT07tU4q1A' target='_blank'>https://tinyurl.com/OnlineApplicationAY2223</a></p>",
        id: 106,
      },
      {
        title: "STUDY NOW, PAY <strike>LATER</strike> NEVER",
        thumbnail:
          "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/315653410_121291210779674_6481334855064582971_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHdb854TfIcBF-VrIit1IU8ago1OA9s1YNqCjU4D2zVg_rWwD4DYCN3YxLVJKrod9QZHI_DgK7Lg0ZHpb6L4YVN&_nc_ohc=ADMDgq8XsisQ7kNvgGUzBr3&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=AWBTsDUi6Ay9_RPWMFnniiW&oh=00_AYDkx4nynfFT8mx7Qmy_F8VnVIEQIpoGHi57mujgoLij2w&oe=671C3485",
        type: "scholarship",
        content:
          "<p>Application for <strong>LVCC FULL SCHOLARSHIP GRANT</strong> for Academic Year 2023-2024 will officially start on <strong>NOVEMBER 18, 2022</strong>.</p> <p>Please follow, like, and share the Official Facebook Page of <strong>La Verdad Christian College, Inc. - Apalit, Pampanga</strong> for further announcements.</p> <p>The online Application form will be available on Friday (<strong>November 18, 2022</strong>).</p>",
        id: 107,
      },
      {
        title: "CHED Scholarship for College Students",
        thumbnail:
          "https://www.lumina.com.ph/assets/news-and-blogs-photos/How-to-Apply-for-CHED-Scholarship-Program/How-to-Apply-for-CHED-Scholarship-Program.webp",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >The Commission on Higher Education (CHED) offers financial assistance through the CHED Scholarship Program to help Filipino students pursue their higher education. This scholarship covers tuition fees and provides a stipend to support living expenses throughout the school year.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a Filipino citizen</span></li><li><span >Must be enrolled in a recognized college or university</span></li><li><span >Must have a minimum GPA of 85%</span></li><li><span >Must demonstrate financial need</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Submit the online application form on the CHED website</span></li><li><span >Provide a copy of your academic transcript</span></li><li><span >Submit proof of income (e.g., BIR or income tax return)</span></li><li><span >Attach a 2-page essay about your educational goals</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> July 15, 2024</p><p><strong>Contact:</strong> scholarship@ched.gov.ph</p>",
        id: 108,
      },
      {
        title: "SM Foundation College Scholarship Program",
        thumbnail:
          "https://i0.wp.com/governmentph.com/wp-content/uploads/2020/11/SM-Scholarship-2021-Application.png?fit=1200%2C630&ssl=1",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >The SM Foundation College Scholarship Program aims to provide deserving Filipino students with financial assistance to pursue their college education. The scholarship covers tuition fees, monthly allowance, and other school-related expenses. SM Foundation seeks to empower students to achieve their dreams through education and build a better future for themselves and their communities.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a Filipino citizen</span></li><li><span >Must be a high school graduate or graduating student</span></li><li><span >Must have a general weighted average (GWA) of at least 85%</span></li><li><span >Must be from a low-income family (preferably with an annual household income of P250,000 or below)</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Complete the online scholarship application form on the SM Foundation website</span></li><li><span >Submit a copy of your high school transcript of records</span></li><li><span >Provide proof of income (e.g., family income certificate or tax return)</span></li><li><span >Submit two letters of recommendation from teachers or community leaders</span></li><li><span >Attach a 500-word essay on your aspirations and how the scholarship will help you achieve your goals</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> August 31, 2024</p><p><strong>Contact:</strong> scholarships@sm-foundation.org</p>",
        id: 109,
      },
      {
        title: "Megaworld Foundation Scholarship Program",
        thumbnail:
          "https://philscholar.com/wp-content/uploads/2024/03/PhilScholar-FI-New-6-1.png",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >The Megaworld Foundation Scholarship Program is designed to support bright and deserving Filipino students pursuing college education in fields that contribute to nation-building. The scholarship covers tuition, allowance, and access to internship opportunities within the Megaworld group.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a Filipino citizen</span></li><li><span >Must be an incoming college student or a sophomore</span></li><li><span >Must have a minimum GPA of 85%</span></li><li><span >Must demonstrate financial need</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Complete the online application form at Megaworld Foundation’s official website</span></li><li><span >Submit your academic transcript and proof of income</span></li><li><span >Provide two letters of recommendation from teachers or community leaders</span></li><li><span >Submit a 500-word essay on your career aspirations</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> September 15, 2024</p><p><strong>Contact:</strong> scholarship@megaworldfoundation.org</p>",
        id: 110,
      },
      {
        title: "DOST-SEI Science and Technology Scholarship Program",
        thumbnail:
          "https://the-post-assets.sgp1.digitaloceanspaces.com/2022/10/DOST-SEI-SCHOLAR_thumbnail.png",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >The DOST-SEI Science and Technology Scholarship Program aims to develop highly competitive scientists and engineers by providing financial assistance to deserving students pursuing S&T courses. The scholarship covers tuition, living allowance, and other academic-related expenses.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a Filipino citizen</span></li><li><span >Must have completed senior high school or be enrolled in a recognized university</span></li><li><span >Must be pursuing a course related to science, technology, engineering, or mathematics (STEM)</span></li><li><span >Must have a general weighted average (GWA) of at least 85%</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Submit the online application form through the DOST-SEI website</span></li><li><span >Provide high school and college transcripts (if applicable)</span></li><li><span >Submit a certificate of good moral character</span></li><li><span >Attach proof of income for family assessment</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> June 30, 2024</p><p><strong>Contact:</strong> scholarship@dost.gov.ph</p>",
        id: 111,
      },
      {
        title: "Ayala Foundation College Scholarship Program",
        thumbnail:
          "https://philscholar.com/wp-content/uploads/2024/03/PhilScholar-FI-New-3-1.png",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >Ayala Foundation offers scholarships to deserving students who are committed to community service and social development. The scholarship program covers tuition fees, allowances, and other related academic expenses. Ayala Foundation aims to cultivate the next generation of leaders who will contribute to nation-building.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a Filipino citizen</span></li><li><span >Must be an incoming or current college student</span></li><li><span >Must have a general weighted average (GWA) of 85% or higher</span></li><li><span >Must have a family income below P500,000 annually</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Fill out the scholarship application form on the Ayala Foundation website</span></li><li><span >Submit a copy of your high school records and family income certificate</span></li><li><span >Provide two letters of recommendation from school or community leaders</span></li><li><span >Attach an essay explaining your goals and aspirations in life</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> August 15, 2024</p><p><strong>Contact:</strong> scholarships@ayalafoundation.org</p>",
        id: 112,
      },
      {
        title: "GSIS Scholarship for Government Employees’ Dependents",
        thumbnail:
          "https://philscholar.com/wp-content/uploads/2024/02/Security-Bank-External-Scholarship-37-1.png",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >The GSIS Scholarship Program provides financial assistance to dependents of active GSIS members who wish to pursue a college education. The scholarship covers tuition fees, allowances, and other academic expenses. This program aims to support the educational goals of dependents of government employees.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a dependent of a GSIS member</span></li><li><span >Must be a high school graduate or an incoming college student</span></li><li><span >Must have a GWA of at least 80%</span></li><li><span >Must be enrolled in a recognized college or university</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Submit the online application form via GSIS website</span></li><li><span >Provide proof of GSIS membership of the parent</span></li><li><span >Submit a high school transcript and certificate of good moral character</span></li><li><span >Attach a recommendation letter from a teacher or community leader</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> September 30, 2024</p><p><strong>Contact:</strong> gsis.scholarships@gsis.gov.ph</p>",
        id: 113,
      },
      {
        title: "Jollibee Foundation Scholarship Program",
        thumbnail:
          "https://i.prcdn.co/img?regionKey=sk1sKiIIVEHDN3a92ShnZQ%3D%3D",
        type: "scholarship",
        content:
          "<h2>Description</h2><p><span >The Jollibee Foundation Scholarship Program provides financial assistance to outstanding Filipino students with a passion for business and entrepreneurship. The scholarship supports undergraduate studies in hospitality management, business administration, and other related fields. In addition to tuition coverage, the program offers mentorship opportunities through Jollibee’s network.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span >Must be a Filipino citizen</span></li><li><span >Must be an incoming or current college student</span></li><li><span >Must have a minimum GPA of 85%</span></li><li><span >Must demonstrate financial need</span></li></ol><p><br></p><h2>Application Process</h2><ul><li><span >Fill out the scholarship application form on the Jollibee Foundation website</span></li><li><span >Submit academic transcripts and proof of financial need</span></li><li><span >Provide two letters of recommendation from school officials or community leaders</span></li><li><span >Attach a 300-word essay explaining your vision in business and community development</span></li></ul><p><br></p><p><strong>Application Deadline:</strong> October 31, 2024</p><p><strong>Contact:</strong> scholarships@jollibee.com</p>",
        id: 114,
      },
    ];

    const realisticFeedbacks: any = [
      {
        user: 1,
        post: 22,
        rate: 5,
        content: "I love La Verdad! Pag-ibig! 🫶🏻",
      },
      {
        user: 2,
        post: 22,
        rate: 5,
        content:
          "Thanks be to God for giving us the opportunity to study here at La Verdad.",
      },
      {
        user: 3,
        post: 22,
        rate: 5,
        content: "Study now, pay never. Thanks be to God!",
      },
      {
        user: 4,
        post: 22,
        rate: 5,
        content: "I am proud to be a La Verdarian!",
      },
      {
        user: 5,
        post: 22,
        rate: 5,
        content:
          "Salamat sa Dios, La Verdad! Salamat sa Dios, Kuya Daniel at MCGI.",
      },
      {
        user: 6,
        post: 22,
        rate: 5,
        content: "Apply na kayo rito! See you arouuund.",
      },
      { user: 7, post: 22, rate: 5, content: "Thanks be to God." },
      { user: 8, post: 22, rate: 5, content: "5 out of 5. The best." },
    ];
    try {
      for (const sp of realisticScholarhipPrograms) {
        const { title, thumbnail, type, content, id } = sp;
        const user = await User.findOneBy({ id: id.toString() });

        if (!user) {
          return httpResponseError(response, null, "UNF", 404);
        }

        const post = Post.create({
          title,
          content,
          thumbnail,
          type,
          user,
        });

        await Post.save(post);
      }

      for (const rf of realisticFeedbacks) {
        const post = Feedback.create({
          user: {
            id: rf.user,
          },
          post: {
            id: rf.post,
          },
          rate: rf.rate,
          content: rf.content || null,
        });

        await Feedback.save(post);
      }
      httpResponseSuccess(response, null, "New posts created");
    } catch (error) {
      console.error(error);
      httpResponseError(response, null, "Internal Server Error", 500);
    }
  }
}

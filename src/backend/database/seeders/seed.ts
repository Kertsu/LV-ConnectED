import { faker } from "@faker-js/faker";
import { PostCategoryType, UserTypes } from "../../constants";
import { Post } from "../entities/post";
import { User } from "../entities/user";
export const legitCreds: UserInterface[] = [
  {
    avatarUrl:
      "https://res.cloudinary.com/drlztlr1m/image/upload/v1729331139/Hackathon/xb9t23uznqfop14olmvl.jpg",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    validIdUrl: null,
    name: "Johnmack Faeldonia",
    organizationName: null,
    bio: "A passionate entrepreneur.",
    email: "johnmarkfaeldonia@student.laverdad.edu.ph",
    emailVerifiedAt: "2024-09-01T12:00:00Z",
    providerVerifiedAt: null,
    role: "student",
    type: null,
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-09-01T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://res.cloudinary.com/drlztlr1m/image/upload/v1729331139/Hackathon/zqlgcdd6ppoddyjvybm9.jpg",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    validIdUrl: null,
    name: "Kurtd Daniel Bigtas",
    organizationName: null,
    bio: "Tech enthusiast and problem solver.",
    email: "kurtddbigtas@gmail.com",
    emailVerifiedAt: "2024-09-15T12:00:00Z",
    providerVerifiedAt: null,
    role: "admin",
    type: null,
    createdAt: "2024-02-15T12:00:00Z",
    updatedAt: "2024-09-15T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://res.cloudinary.com/drlztlr1m/image/upload/v1729331139/Hackathon/olsermjsgxepfzalyzur.jpg",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    validIdUrl: null,
    name: "Raven Dela Rama",
    organizationName: null,
    bio: "Engineer with a love for innovation.",
    email: "johnraybendelarama@student.laverdad.edu.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: null,
    role: "student",
    type: null,
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://res.cloudinary.com/drlztlr1m/image/upload/v1729331139/Hackathon/csg4cq5i8ejviqpbmuxl.jpg",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    validIdUrl: null,
    name: "Allen Magadia",
    organizationName: null,
    bio: "Engineer with a love for innovation.",
    email: "allenmagadia@student.laverdad.edu.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: null,
    role: "student",
    type: null,
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://res.cloudinary.com/drlztlr1m/image/upload/v1729331140/Hackathon/wpxmy7np9h5dfryp0not.jpg",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Jethro Cadang",
    organizationName: null,
    bio: "Engineer with a love for innovation.",
    email: "jethrocadang@student.laverdad.edu.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: null,
    role: "admin",
    type: "other",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
];

const legitProviders: UserInterface[] = [
  {
    avatarUrl:
      "https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/461924271_566194232644520_3597166314315883364_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEQpmYeMvXyPt4ejVgl-0tA6NUyqkLlyuTo1TKqQuXK5CYPQXOXvcT_6ooQuEMnLHOrI-DF6tfyyeAr37Iyf7zT&_nc_ohc=Fbo2i0QCSnMQ7kNvgGh67Bm&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=AQIxOjVs2nLloJAWYY83P7x&oh=00_AYCHmnARhruBUM6qi7l8x8E-7mLA_ZYQVFzVXD58s-icEA&oe=671AA439",
    bannerUrl:
      "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/462693785_572297352034208_4072350988270131867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFxBIb5Ks6pVotefQzSmLg2vtFEeWRvEfG-0UR5ZG8R8UKS6JjidRPX9j7J9h9xwYhQdTNurlH26M6MCoMhw-9i&_nc_ohc=2G1SHqYETpgQ7kNvgG3C3DR&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=AmwBANvCIlpUVUapEakdYKr&oh=00_AYDhyMKVGCoKKx-9sk-Kw5vZtidySKm79N6TgTOYSZeI6g&oe=671AAA3D",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "La Verdad Christian College, Inc. - Caloocan",
    organizationName: "La Verdad Christian College, Inc. - Caloocan",
    bio: "Wisdom based on the truth is priceless.",
    email: "admission.caloocan@laverdad.edu.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "school",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/461624352_509560758619382_8813051501729332811_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGWq-cz_bLE0izRSpJd198AeVoW8zz7ZXt5WhbzPPtle2C6prcSTLd3ND27KFsKVjjUqffhuNqZ4xIpEXrBJn_7&_nc_ohc=rtSNceS5kT4Q7kNvgET17h3&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=AOenHZFdecdhRUSI_2YHLUy&oh=00_AYCwwTG9NilvuJ_O1wY2MIx232-lzCRHOprLRYvPaZsv9g&oe=671AA07C",
    bannerUrl:
      "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/449449169_447660674809391_692585298774003021_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFJuJzTCK2Z3odEydsAr1rJYsTexpZPKg1ixN7Glk8qDUu7Q_JCZVw9d4nKgEdy7qKBB_sO2fVWhHEqMiOUNG6T&_nc_ohc=91KyknYT-SgQ7kNvgFGG-Qg&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=AVFfJHiG3p40XW7Naio3mjq&oh=00_AYD9mpN4wDoaxqu-Q-wIw8E9sSLcGQPqZdPFGevAvpD7BQ&oe=671ABBCB",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "La Verdad Christian College, Inc. - Apalit, Pampanga",
    organizationName: "La Verdad Christian College, Inc. - Apalit, Pampanga",
    bio: "Wisdom based on the truth is priceless.",
    email: "info@laverdad.edu.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "school",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://www.britishcouncil.ph/sites/default/files/solas_ched.png",
    bannerUrl:
      "https://mimaropa.ched.gov.ph/wp-content/uploads/2022/05/CHED-Building-e1651394610719.jpg",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Commission on Higher Education (CHED)",
    organizationName: "Commission on Higher Education (CHED)",
    bio: "CHED is the governing body responsible for overseeing tertiary and graduate education in the Philippines. It formulates policies, plans, and programs that promote quality education and makes higher education accessible through various scholarship programs.",
    email: "scholarships@ched.gov.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "government",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://www.mfi.org.ph/wp-content/uploads/2024/02/SM-FOUNDATION-SCHOLARSHIP.jpg",
    bannerUrl:
      "https://www.sm-foundation.org/wp-content/uploads/2024/02/Educ-banner_0208.png",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "SM Foundation, Inc.",
    organizationName: "SM Foundation, Inc.",
    bio: "SM Foundation is the corporate social responsibility (CSR) arm of SM Group, a leading retail, real estate, and financial services conglomerate in the Philippines. The foundation focuses on education, health, disaster response, and the environment, offering various scholarships to underprivileged students.",
    email: "scholarships@sm.co.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "corporate",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://www.megaworldfoundation.com/mfs/assets/images/mf-logo.png",
    bannerUrl:
      "https://connect-assets.prosple.com/cdn/ff/Ku5cniYCbNZW3yUnh4bvKXPsV2iDproOgcw50PiJ8bA/1571621125/public/2019-10/banner-megaworld-corporation-890x320-2019.jpg",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Megaworld Foundation, Inc.",
    organizationName: "Megaworld Foundation, Inc.",
    bio: "Megaworld Foundation is the CSR arm of Megaworld Corporation, one of the Philippines’ largest developers of residential condominiums and integrated urban townships. The foundation provides scholarships to academically excellent but financially challenged students.",
    email: "scholarships@mw.co.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "corporate",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://the-post-assets.sgp1.digitaloceanspaces.com/2023/03/DOST-SCHOLARSHIP_thumbnail.png",
    bannerUrl:
      "https://the-post-assets.sgp1.digitaloceanspaces.com/2023/06/DOST-SEI-SCHOLARSHIP_banner-1896x800.jpg",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Department of Science and Technology - Science Education Institute (DOST-SEI)",
    organizationName:
      "Department of Science and Technology - Science Education Institute (DOST-SEI)",
    bio: "DOST-SEI is a government agency under the Department of Science and Technology. Its mission is to accelerate the development of the Philippines’ science and technology sector through scholarships, research funding, and capacity-building initiatives.",
    email: "scholarships@dost.gov.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "government",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://ayala.com/app/themes/custom-theme/dist/images/others/others-placeholder.png",
    bannerUrl:
      "https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/442479493_842547407913748_439927497003671249_n.png?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGHhOUP8YXukR2rMeV8JFQsf-xhgRx8taZ_7GGBHHy1piLXLU4qftjpqRAZtRwCDsOmUWyqI6sxD-iVp2dHO4Xq&_nc_ohc=hKcO4wH-om8Q7kNvgGOr53y&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=AD3rFLkBMXFnzp46XuKExpH&oh=00_AYCkcOGOWlQCXmLBOsXfXjwRNloJEd16ti-OPsWAoaCzTQ&oe=671AA96F",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Ayala Foundation, Inc.",
    organizationName: "Ayala Foundation, Inc.",
    bio: "Ayala Foundation is the social development arm of Ayala Corporation, one of the oldest and largest conglomerates in the Philippines. It supports education, arts, and community development, providing scholarships to talented students from disadvantaged backgrounds.",
    email: "scholarships@ayala.co.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "corporate",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl: "https://newsinfo.inquirer.net/files/2024/07/GSIS-LOGO.png",
    bannerUrl:
      "https://ptvnews.ph/wp-content/uploads/2023/04/viber_image_2023-04-24_16-43-20-530.jpg",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Government Service Insurance System (GSIS)",
    organizationName: "Government Service Insurance System (GSIS)",
    bio: "GSIS is a government financial institution that provides life insurance, retirement, and pension benefits to Filipino government employees. It offers a scholarship program for the children of its members to ensure their access to quality education.",
    email: "scholarships@gsis.gov.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "government",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://i.pinimg.com/736x/4a/c9/6c/4ac96cf93e07bb096431538005c1b077.jpg",
    bannerUrl:
      "https://angelescity.ph/wp-content/uploads/cache/images/jollibee-logo/jollibee-logo-3567621404.jpg",
    validIdUrl: "https://placehold.co/600x400?text=Valid+ID",
    name: "Jollibee Group Foundation",
    organizationName: "Jollibee Group Foundation",
    bio: "Jollibee Group Foundation is the philanthropic arm of Jollibee Foods Corporation, the largest fast-food chain in the Philippines. The foundation’s focus is on addressing hunger and education challenges through sustainable initiatives, including scholarships for students in hospitality and business programs.",
    email: "scholarships@jollibee.co.ph",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    providerVerifiedAt: "2024-09-20T12:00:00Z",
    role: "provider",
    type: "government",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
];

interface UserInterface {
  avatarUrl: string | null;
  bannerUrl: string | null;
  validIdUrl: string | null;
  name: string;
  organizationName: string | null;
  bio: string | null;
  email: string;
  emailVerifiedAt: string | null;
  providerVerifiedAt: string | null;
  role: string;
  type: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
}

interface PostInterface {
  thumbnail: string | null;
  title: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  user: User;
}

interface FeedbackInterface {
  rate: number;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
  post: Post;
}

interface BookmarkInterface {
  user: User;
  post: Post;
  createdAt: string;
  updatedAt: string;
}

faker.setDefaultRefDate("2024-10-17T00:00:00.000Z");

export const studentSeeds = async (count: number) => {
  const seeds = await Promise.all(
    Array.from({ length: count }, async (): Promise<UserInterface> => {
      let email;
      do {
        email = faker.internet.email();
      } while (await User.findOne({ where: { email: email } }));

      return {
        avatarUrl: faker.image.avatar(),
        bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
        name: faker.person.fullName(),
        organizationName: null,
        bio: faker.lorem.sentence(),
        email: email,
        role: "student",
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        emailVerifiedAt: faker.date.recent().toISOString(),
        archivedAt: null,
        type: null,
        validIdUrl: null,
        providerVerifiedAt: null,
      };
    })
  );

  return [...legitCreds, ...seeds];
};

export const providerSeeds = async (
  count: number
): Promise<UserInterface[]> => {
  const seeds = await Promise.all(
    Array.from({ length: count }, async (): Promise<UserInterface> => {
      let email;
      do {
        email = faker.internet.email();
      } while (await User.findOne({ where: { email: email } }));

      return {
        avatarUrl: faker.image.avatar(),
        bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
        name: faker.person.fullName(),
        organizationName: faker.company.name(),
        bio: faker.lorem.sentence(),
        email: email,
        role: "provider",
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        emailVerifiedAt: faker.date.recent().toISOString(),
        archivedAt: null,
        type: faker.helpers.arrayElement(UserTypes),
        validIdUrl: faker.image.url(),
        providerVerifiedAt:
          faker.helpers.arrayElement([0, 1, 2]) === 2
            ? null
            : faker.date.recent().toISOString(),
      };
    })
  );

  return [...legitProviders, ...seeds];
};

export const postSeeds = async (count: number) => {
  const providers = await User.find({
    where: {
      role: "provider",
    },
  });

  const seeds = Array.from({ length: count }, (): PostInterface => {
    const randomProvider = faker.helpers.arrayElement(providers);

    const content = `
      <h2>${faker.company.name()} Scholarship</h2>
      <p><strong>Description:</strong> ${faker.lorem.paragraphs(2)}</p>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
      </ul>
      <p><strong>Application Deadline:</strong> ${faker.date
        .future()
        .toLocaleDateString()}</p>
      <p><strong>Contact:</strong> ${faker.internet.email()}</p>
    `;

    return {
      thumbnail: faker.image.url(),
      title: faker.lorem.words(),
      type: faker.helpers.arrayElement(PostCategoryType),
      content: content,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      user: randomProvider,
      archivedAt: count % 6 == 0 ? faker.date.recent().toISOString() : null,
    };
  });

  return seeds;
};

export const feedbackSeeds = async (count: number) => {
  const posts = await Post.find();
  const users = await User.find();

  const seeds = Array.from({ length: count }, (): FeedbackInterface => {
    const randomPost = faker.helpers.arrayElement(posts);
    const randomUser = faker.helpers.arrayElement(users);

    return {
      rate: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      post: randomPost,
      user: randomUser,
    };
  });

  return seeds;
};

export const bookmarkSeeds = async (count: number) => {
  const generatedBookmarks = new Set();
  const posts = await Post.find();
  const users = await User.find({ where: { role: "student" } });

  const seeds = Array.from({ length: count }, (): BookmarkInterface => {
    let randomPost, randomUser, bookmarkId;

    // Keep generating until we get a unique bookmarkId
    do {
      randomPost = faker.helpers.arrayElement(posts);
      randomUser = faker.helpers.arrayElement(users);
      bookmarkId = `${randomUser.id}_${randomPost.id}`;
    } while (generatedBookmarks.has(bookmarkId));

    // Add the new bookmarkId to the set once it's unique
    generatedBookmarks.add(bookmarkId);

    return {
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      post: randomPost,
      user: randomUser,
    };
  });

  return seeds;
};

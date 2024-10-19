import { faker } from "@faker-js/faker";
import { User } from "Database/entities/user";
import { PostCategoryType, UserTypes } from "../../constants";
import { Post } from "Database/entities/post";
export const legitCreds = [
  {
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/452912470_2526121527595306_3752199441102383149_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtCgs-XyXL89ENkqy7JG3peWlRnJXahMF5aVGcldqEwU1hJd6qhyhKUGWsK52KiDE16tK8oTnAWiBcfTghtwJt&_nc_ohc=nyj-K21CRl8Q7kNvgGHFtoL&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AxNTWZFhCZdA3OBSWam6QD_&oh=00_AYAWq-elKA1RxTQIYt2OvUbsNU1BC78UgYAoOUl34JTN_w&oe=67110D26",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    name: "Johnmack Faeldonia",
    bio: "A passionate entrepreneur.",
    email: "johnmarkfaeldonia@student.laverdad.edu.ph",
    role: "student",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-09-01T12:00:00Z",
    emailVerifiedAt: "2024-09-01T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/440166746_25371551272492353_7022797428020999409_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE6YN-LerRQeT9r5QJmhKUTkjRxWwzQgW6SNHFbDNCBbs5Je_9d1VcuTlg6UQQz3Y7v3pPfWBH0ypDLTs6CYgp8&_nc_ohc=r6D8cy67UfcQ7kNvgHXnr5G&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AB8ID44fIEKmsB3Fz3ePKgZ&oh=00_AYCaMhckXWRn1M8-5O8w3C2a2YHpIS6RPT9NDX-Vioj2BQ&oe=67112F0E",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    name: "Kurtd Daniel Bigtas",
    bio: "Tech enthusiast and problem solver.",
    email: "kurtddbigtas@gmail.com",
    role: "admin",
    createdAt: "2024-02-15T12:00:00Z",
    updatedAt: "2024-09-15T12:00:00Z",
    emailVerifiedAt: "2024-09-15T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/426374110_1461399794737580_3493421727438730561_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG9CBl1CqqaysKmfa6Q1t41kvXsYt-w-BGS9exi37D4EQcfhgWDIP0v6PcSANmUDTBvyfEdpSRVUEwyDiPGs8lH&_nc_ohc=8GRGIgrNZvsQ7kNvgG76yxA&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AKkQ6BfwYojQzKQoBuvWwyn&oh=00_AYAZoEiv9RwDLuhvN9czH1vBhQA6PuZ-kSwV0YpqjIL0-A&oe=67111CC2",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    name: "Raven Dela Rama",
    bio: "Engineer with a love for innovation.",
    email: "johnraybendelarama@student.laverdad.edu.ph",
    role: "student",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/426374110_1461399794737580_3493421727438730561_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG9CBl1CqqaysKmfa6Q1t41kvXsYt-w-BGS9exi37D4EQcfhgWDIP0v6PcSANmUDTBvyfEdpSRVUEwyDiPGs8lH&_nc_ohc=8GRGIgrNZvsQ7kNvgG76yxA&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AKkQ6BfwYojQzKQoBuvWwyn&oh=00_AYAZoEiv9RwDLuhvN9czH1vBhQA6PuZ-kSwV0YpqjIL0-A&oe=67111CC2",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    name: "Allen Magadia",
    bio: "Engineer with a love for innovation.",
    email: "allenmagadia@student.laverdad.edu.ph",
    role: "student",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/426374110_1461399794737580_3493421727438730561_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG9CBl1CqqaysKmfa6Q1t41kvXsYt-w-BGS9exi37D4EQcfhgWDIP0v6PcSANmUDTBvyfEdpSRVUEwyDiPGs8lH&_nc_ohc=8GRGIgrNZvsQ7kNvgG76yxA&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AKkQ6BfwYojQzKQoBuvWwyn&oh=00_AYAZoEiv9RwDLuhvN9czH1vBhQA6PuZ-kSwV0YpqjIL0-A&oe=67111CC2",
    bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
    name: "Jethro Cadang",
    bio: "Engineer with a love for innovation.",
    email: "jethrocadang@student.laverdad.edu.ph",
    role: "student",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatar:
      "https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/461624352_509560758619382_8813051501729332811_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGWq-cz_bLE0izRSpJd198AeVoW8zz7ZXt5WhbzPPtle2C6prcSTLd3ND27KFsKVjjUqffhuNqZ4xIpEXrBJn_7&_nc_ohc=6AWu5jpNDGYQ7kNvgFJ9ZQi&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=AxCU6R5kOk8aCfekgDjq66z&oh=00_AYAbZur3KVqE_10b4xHP4XgB-DoEQXWWzmPK5Qmy93z69g&oe=670FA3FC",
    bannerUrl:
      "https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/449449169_447660674809391_692585298774003021_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFJuJzTCK2Z3odEydsAr1rJYsTexpZPKg1ixN7Glk8qDUu7Q_JCZVw9d4nKgEdy7qKBB_sO2fVWhHEqMiOUNG6T&_nc_ohc=6XaoIN0GI9QQ7kNvgFOZeVG&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=ADYuKfczXQ9LMZkCMLdcZYi&oh=00_AYCeJ0aQh1azc6a-sLBpIsX9rmd4RsjmKNYQ5H9-BVKnww&oe=670F870B",
    name: "La Verdad Christian College, Inc. - Caloocan",
    bio: "Wisdom based on the truth is priceless.",
    email: "admission.caloocan@laverdad.edu.ph",
    role: "provider",
    organizationName: "La Verdad Christian College, Inc. - Caloocan",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
    archivedAt: null,
  },
  {
    avatar:
      "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/461924271_566194232644520_3597166314315883364_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEQpmYeMvXyPt4ejVgl-0tA6NUyqkLlyuTo1TKqQuXK5CYPQXOXvcT_6ooQuEMnLHOrI-DF6tfyyeAr37Iyf7zT&_nc_ohc=qw6fFIIpGLYQ7kNvgG_3aAY&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=A_kTzIQNVqBsU_0LBQgmWaz&oh=00_AYAbZur3KVqE_10b4xHP4XgB-DoEQXWWzmPK5Qmy93z69g&oe=670FA7B9",
    bannerUrl:
      "https://scontent.fcrk4-2.fna.fbcdn.net/v/t39.30808-6/462693785_572297352034208_4072350988270131867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFxBIb5Ks6pVotefQzSmLg2vtFEeWRvEfG-0UR5ZG8R8UKS6JjidRPX9j7J9h9xwYhQdTNurlH26M6MCoMhw-9i&_nc_ohc=PHe0jc1YwpoQ7kNvgFGQUBI&_nc_zt=23&_nc_ht=scontent.fcrk4-2.fna&_nc_gid=AsqXPYjBH7H6yMKrcvnDH9x&oh=00_AYDyB5P75ExnxfKLuvVtJztyx3M2aJTRK343Pl9kJny8Og&oe=670FADBD",
    name: "La Verdad Christian College, Inc. - Apalit, Pampanga",
    bio: "Wisdom based on the truth is priceless.",
    email: "info@laverdad.edu.ph",
    role: "provider",
    organizationName: "La Verdad Christian College, Inc. - Apalit, Pampanga",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    emailVerifiedAt: "2024-09-20T12:00:00Z",
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

export const userSeeds = (count: number, role: "student" | "provider") => {
  const generatedEmails = new Set();
  const seeds = Array.from(
    { length: count },
    (index: number): UserInterface => {
      let email;
      do {
        email = faker.internet.email();
      } while (generatedEmails.has(email));

      generatedEmails.add(email);

      return {
        avatarUrl: faker.image.avatar(),
        bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
        name: faker.person.fullName(),
        organizationName: role === "student" ? null : faker.company.name(),
        bio: faker.lorem.sentence(),
        email: email,
        role,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        emailVerifiedAt: faker.date.recent().toISOString(),
        archivedAt: null,
        type: role === "student" ? null : faker.helpers.arrayElement(UserTypes),
        validIdUrl: role === "student" ? null : faker.image.url(),
        providerVerifiedAt:
          role === "provider"
            ? index % 3 === 0
              ? faker.date.past().toISOString()
              : null
            : null,
      };
    }
  );

  return [...seeds, ...legitCreds];
};

export const postSeeds = async (count: number) => {
  const providers = await User.find({
    where: {
      role: "provider",
    },
  });

  const seeds = Array.from({ length: count }, (): PostInterface => {
    const randomProvider = faker.helpers.arrayElement(providers);

    return {
      thumbnail: faker.image.url(),
      title: faker.lorem.words(),
      type: faker.helpers.arrayElement(PostCategoryType),
      content: faker.lorem.paragraphs(),
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

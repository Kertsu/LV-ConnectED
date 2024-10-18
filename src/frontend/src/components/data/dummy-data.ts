import { Feedback, Post, User } from "@/types/model";

export const dummyPosts: Post[] = [
  {
    id: "1",
    email: "admission.caloocan@laverdad.edu.ph",
    name: "La Verdad Christian College, Inc. - Caloocan",
    avatarUrl:
      "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/461924271_566194232644520_3597166314315883364_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEQpmYeMvXyPt4ejVgl-0tA6NUyqkLlyuTo1TKqQuXK5CYPQXOXvcT_6ooQuEMnLHOrI-DF6tfyyeAr37Iyf7zT&_nc_ohc=qw6fFIIpGLYQ7kNvgG_3aAY&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=A_kTzIQNVqBsU_0LBQgmWaz&oh=00_AYAbZur3KVqE_10b4xHP4XgB-DoEQXWWzmPK5Qmy93z69g&oe=670FA7B9",
    postTitle: "STUDY NOW, PAY <strike>LATER</strike> NEVER",
    postThumbnailSource:
      "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/273036020_4892115524188494_2590197564223176883_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGrfJduGwytLu1qYLtPMUdvtKOtC7kfAJa0o60LuR8AlmpJ0hg5C808OpWbgYYHUEI00ZL-wJDpXoUr8P4w3Lce&_nc_ohc=NYwQUQVImbUQ7kNvgGplNr4&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=AvW0_V-F1K-DNP2nkseKsJD&oh=00_AYCs9vyTnP8L8Sz0G5m93emdH8YiwtLEYZhC6BZFm4dJSw&oe=670F8870",
    postDescription: `<h1>STUDY NOW, PAY NEVER!</h1><p>Quality Education for FREE!</p><p>La Verdad Christian College - Caloocan is NOW OPEN for Application for the FULL SCHOLARSHIP GRANT in College for Academic Year 2022-2023.</p><p>Please click the link for the admission details:</p><p><a href="https://tinyurl.com/OnlineApplicationAY2223?fbclid=IwZXh0bgNhZW0CMTAAAR08KuSH7XAX9r9sqnY4Un5CBIGMqKLCtA8roxtMGO1Kxo13_iQcI4eH90c_aem_53aenhiou2dhfT07tU4q1A" target="_blank" style="color: var(--blue-link);">https://tinyurl.com/OnlineApplicationAY2223</a></p>`,
    postRatingCount: 150,
    postBookmarkCount: 95,
    postCommentCount: 40,
    postType: "scholarship",
    postDate: "June 1, 2023",
  },
  {
    id: "2",
    email: "admission.caloocan@laverdad.edu.ph",
    name: "La Verdad Christian College, Inc. - Caloocan",
    avatarUrl:
      "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/461924271_566194232644520_3597166314315883364_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEQpmYeMvXyPt4ejVgl-0tA6NUyqkLlyuTo1TKqQuXK5CYPQXOXvcT_6ooQuEMnLHOrI-DF6tfyyeAr37Iyf7zT&_nc_ohc=qw6fFIIpGLYQ7kNvgG_3aAY&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=A_kTzIQNVqBsU_0LBQgmWaz&oh=00_AYAbZur3KVqE_10b4xHP4XgB-DoEQXWWzmPK5Qmy93z69g&oe=670FA7B9",
    postTitle: "STUDY NOW, PAY <strike>LATER</strike> NEVER",
    postThumbnailSource:
      "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/273036020_4892115524188494_2590197564223176883_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGrfJduGwytLu1qYLtPMUdvtKOtC7kfAJa0o60LuR8AlmpJ0hg5C808OpWbgYYHUEI00ZL-wJDpXoUr8P4w3Lce&_nc_ohc=NYwQUQVImbUQ7kNvgGplNr4&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=AvW0_V-F1K-DNP2nkseKsJD&oh=00_AYCs9vyTnP8L8Sz0G5m93emdH8YiwtLEYZhC6BZFm4dJSw&oe=670F8870",
    postDescription: `<h2>Description</h2><p><span style="color: rgb(187, 187, 187);">The Future Leaders Scholarship is designed to support exceptional students who demonstrate outstanding leadership potential and a commitment to community service. This prestigious award covers full tuition and provides mentorship opportunities to help shape the next generation of visionary leaders.</span></p><p><br></p><h2>Eligibility</h2><ol><li><span style="color: rgb(187, 187, 187);">Minimum GPA of 3.5</span></li><li><span style="color: rgb(187, 187, 187);">Demonstrated leadership experience</span></li><li><span style="color: rgb(187, 187, 187);">Active community involvement</span></li><li><span style="color: rgb(187, 187, 187);">Incoming freshman or transfer student</span></li></ol><p><br></p><h2><span style="color: rgb(255, 255, 255);">Application Process</span></h2><ul><li><span style="color: rgb(187, 187, 187);">Complete online application form</span></li><li><span style="color: rgb(187, 187, 187);">Submit academic transcripts</span></li><li><span style="color: rgb(187, 187, 187);">Provide two letters of recommendations</span></li><li><span style="color: rgb(187, 187, 187);">Write a 500-word personal statement</span></li></ul>`,
    postRatingCount: 150,
    postBookmarkCount: 95,
    postCommentCount: 40,
    postType: "scholarship",
    postDate: "June 1, 2023",
  },
  {
    id: "3",
    email: "info@laverdad.edu.ph",
    name: "La Verdad Christian College, Inc. - Apalit, Pampanga",
    avatarUrl:
      "https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/461624352_509560758619382_8813051501729332811_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGWq-cz_bLE0izRSpJd198AeVoW8zz7ZXt5WhbzPPtle2C6prcSTLd3ND27KFsKVjjUqffhuNqZ4xIpEXrBJn_7&_nc_ohc=6AWu5jpNDGYQ7kNvgFJ9ZQi&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=AxCU6R5kOk8aCfekgDjq66z&oh=00_AYDWiDYri00R4VHU6sWSxhUWZlsmHHjUZRrOSmHJvA3Zpg&oe=670FA3FC",
    postTitle: "STUDY NOW, PAY <s>LATER</s> NEVER",
    postThumbnailSource:
      "https://scontent.fcrk4-2.fna.fbcdn.net/v/t39.30808-6/422929243_350086681233458_392159417334999887_n.jpg?stp=dst-jpg_s600x600&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG8LzcjVq-Vv9HMFROB1tvK9LuyAICIh8P0u7IAgIiHwwhbcqKHtqKNVTJxWbhZCyGje0avaYuR5zcZiTLEDYfO&_nc_ohc=t1Gk4iq8pH8Q7kNvgH4mIpi&_nc_zt=23&_nc_ht=scontent.fcrk4-2.fna&_nc_gid=AHcH0u32gJMifhgfjUEnU0c&oh=00_AYAn4AesAQ5tAsmlHrcY3eun4vHAqC6Qk044nzSof-AnMw&oe=670FB558",
    postDescription: `<p>𝗔𝗡𝗡𝗢𝗨𝗡𝗖𝗘𝗠𝗘𝗡𝗧</p><p>Application for the LVCC FULL SCHOLARSHIP GRANT for Academic Year 2024-2025 is NOW OFFICIALLY OPEN from 𝗝𝗮𝗻𝘂𝗮𝗿𝘆 𝟮𝟱 𝘁𝗼 𝗙𝗲𝗯𝗿𝘂𝗮𝗿𝘆 𝟮𝟯, 𝟮𝟬𝟮𝟰.</p><p>Click the link below to access the 𝗢𝗡𝗟𝗜𝗡𝗘 𝗔𝗣𝗣𝗟𝗜𝗖𝗔𝗧𝗜𝗢𝗡 𝗣𝗢𝗥𝗧𝗔𝗟</p><p><a href="https://app.laverdad.edu.ph/?fbclid=IwZXh0bgNhZW0CMTAAAR08KuSH7XAX9r9sqnY4Un5CBIGMqKLCtA8roxtMGO1Kxo13_iQcI4eH90c_aem_53aenhiou2dhfT07tU4q1A" target="_blank" style="color: var(--blue-link);">https://app.laverdad.edu.ph/</a></p><p>To view a detailed step-by-step guide on how to use the ONLINE APPLICATION PORTAL, click here: <a href="https://drive.google.com/file/d/1519OQqfgFsMnup7Gol2bV97MntNPnfeB/view?usp=sharing&amp;fbclid=IwZXh0bgNhZW0CMTAAAR2jSii-UXyg0SpLs1lRhBIaby9EVBVvO1BRRGMp2MVS02jhCqQe7_7RKzw_aem_8jbssBcT3djgAlCjjOEU9A" target="_blank" style="color: var(--blue-link);">https://drive.google.com/.../1519OQqfgFsMnup7Gol2.../view...</a></p><p>𝑵𝑶𝑻𝑬: 𝑻𝒉𝒊𝒔 𝑺𝒄𝒉𝒐𝒍𝒂𝒓𝒔𝒉𝒊𝒑 𝒂𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏 𝒑𝒓𝒐𝒄𝒆𝒔𝒔 𝒊𝒔 𝒊𝒏𝒕𝒆𝒏𝒅𝒆𝒅 𝒇𝒐𝒓 𝑭𝒂𝒄𝒆-𝒕𝒐-𝒇𝒂𝒄𝒆 𝒔𝒄𝒉𝒐𝒐𝒍𝒊𝒏𝒈 𝒐𝒏𝒍𝒚.</p>`,
    postRatingCount: 200,
    postBookmarkCount: 120,
    postCommentCount: 55,
    postType: "scholarship",
    postDate: "2023-06-01",
  },
  {
    id: "4",
    email: "internships@creativeworks.com",
    name: "Internships Reactive",
    avatarUrl: "https://via.placeholder.com/150",
    postTitle: "Creative Works Design Internship Blabla",
    postThumbnailSource: "https://via.placeholder.com/400x200",
    postDescription:
      "<p>Are you passionate about <strong>graphic design</strong> and <code>UX/UI</code>? Join <em>Creative Works</em> for a <a href='www.facebook.com' target='_blank'>6-month internship</a> where you'll work with top designers on real-world projects.</p> <p><strong>Perks:</strong> Remote work, mentorship, and a performance bonus!</p> <a href='https://creativeworks.com/internships' target='_blank'>Apply today</a>",
    postRatingCount: 180,
    postBookmarkCount: 105,
    postCommentCount: 38,
    postType: "internship",
    postDate: "2023-06-01",
  },
  {
    id: "5",
    email: "internships@creativeworks.com",
    name: "IT Internships",
    avatarUrl: "https://via.placeholder.com/150",
    postTitle: "Quick Strike Internship Now Open",
    postThumbnailSource: "https://via.placeholder.com/400x200",
    postDescription: `<p>Are you passionate about <strong>graphic design</strong> and <pre class="ql-syntax" spellcheck="false">UX/UI
</pre> Join <em>Creative Works</em> for a <a href='www.facebook.com' target='_blank'>6-month internship</a> where you'll work with top designers on real-world projects.</p> <p><strong>Perks:</strong> Remote work, mentorship, and a performance bonus!</p> <a href='https://creativeworks.com/internships' target='_blank'>Apply today</a>`,
    postRatingCount: 180,
    postBookmarkCount: 105,
    postCommentCount: 38,
    postType: "internship",
    postDate: "2023-06-01",
  },
];

export const dummyTopProviders = [
  {
    id: "1",
    thumbnail:
      "https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/449449169_447660674809391_692585298774003021_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFJuJzTCK2Z3odEydsAr1rJYsTexpZPKg1ixN7Glk8qDUu7Q_JCZVw9d4nKgEdy7qKBB_sO2fVWhHEqMiOUNG6T&_nc_ohc=6XaoIN0GI9QQ7kNvgFOZeVG&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=ADYuKfczXQ9LMZkCMLdcZYi&oh=00_AYCeJ0aQh1azc6a-sLBpIsX9rmd4RsjmKNYQ5H9-BVKnww&oe=670F870B",
    avatar:
      "https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/461624352_509560758619382_8813051501729332811_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGWq-cz_bLE0izRSpJd198AeVoW8zz7ZXt5WhbzPPtle2C6prcSTLd3ND27KFsKVjjUqffhuNqZ4xIpEXrBJn_7&_nc_ohc=6AWu5jpNDGYQ7kNvgFJ9ZQi&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=AxCU6R5kOk8aCfekgDjq66z&oh=00_AYAbZur3KVqE_10b4xHP4XgB-DoEQXWWzmPK5Qmy93z69g&oe=670FA3FC",
    provider: "La Verdad Christian College",
    description: "Wisdom based on the truth is priceless.",
    scholarship: "Future Tech Leaders Scholarship 2024",
    type: "School",
    category: "Education",
    location: "Apalit, Pampanga",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "2",
    thumbnail:
      "https://scontent.fcrk4-2.fna.fbcdn.net/v/t39.30808-6/462693785_572297352034208_4072350988270131867_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFxBIb5Ks6pVotefQzSmLg2vtFEeWRvEfG-0UR5ZG8R8UKS6JjidRPX9j7J9h9xwYhQdTNurlH26M6MCoMhw-9i&_nc_ohc=PHe0jc1YwpoQ7kNvgFGQUBI&_nc_zt=23&_nc_ht=scontent.fcrk4-2.fna&_nc_gid=AsqXPYjBH7H6yMKrcvnDH9x&oh=00_AYDyB5P75ExnxfKLuvVtJztyx3M2aJTRK343Pl9kJny8Og&oe=670FADBD",
    avatar:
      "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/461924271_566194232644520_3597166314315883364_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEQpmYeMvXyPt4ejVgl-0tA6NUyqkLlyuTo1TKqQuXK5CYPQXOXvcT_6ooQuEMnLHOrI-DF6tfyyeAr37Iyf7zT&_nc_ohc=qw6fFIIpGLYQ7kNvgG_3aAY&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=A_kTzIQNVqBsU_0LBQgmWaz&oh=00_AYAbZur3KVqE_10b4xHP4XgB-DoEQXWWzmPK5Qmy93z69g&oe=670FA7B9",
    provider: "La Verdad Christian College, Inc. - Caloocan",
    description: "Wisdom based on the truth is priceless.",
    scholarship: "Future Tech Leaders Scholarship 2024",
    type: "School",
    category: "Education",
    location: "Caloocan",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "3",
    thumbnail:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_d0f973ce376ca5b6c08e081cb035e86ced105fa9.1920x1080.jpg?t=1727827653",
    avatar:
      "https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/452912470_2526121527595306_3752199441102383149_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtCgs-XyXL89ENkqy7JG3peWlRnJXahMF5aVGcldqEwU1hJd6qhyhKUGWsK52KiDE16tK8oTnAWiBcfTghtwJt&_nc_ohc=0aFGsrCXi6EQ7kNvgGeDTFV&_nc_zt=23&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=ANu0xv9z85XR0ENGh62yylc&oh=00_AYBGZKYtxIFtM7UfMbbYyIGbDTDRHZIUjJCb0LPeVAY0kg&oe=670F8366",
    provider: "Johnmack Faeldonia",
    description: "Promoting scientific advancement in the Philippines.",
    scholarship: "STEM Leaders Scholarship 2024",
    type: "School",
    category: "Education",
    location: "Not Specified",
    rating: 4.0,
    reviews: 55,
  },
  // Government Entities
  {
    id: "4",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRECWnkNxlwCYZXtoIUOHMA6PJnow3qBZefag&s",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ5Je-os95EpHZhV2Cx9edtuNybVvP94Wemg&s",
    provider: "Department of Science and Technology (DOST)",
    description: "Promoting scientific advancement in the Philippines.",
    scholarship: "DOST-SEI Scholarship 2024",
    type: "Government",
    category: "Government",
    location: "Philippines",
    rating: 4.6,
    reviews: 30,
  },
  {
    id: "5",
    thumbnail:
      "https://baguioheraldexpressonline.com/wp-content/uploads/2021/02/ched.jpg",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGF2A38Aolu2u1ML7L1vf9xenlBswT07OhjA&s",
    provider: "Commission on Higher Education (CHED)",
    description: "Supporting access to quality education.",
    scholarship: "CHED Merit Scholarship Program 2024",
    type: "Government",
    category: "Government",
    location: "Philippines",
    rating: 4.8,
    reviews: 45,
  },
  {
    id: "6",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcxPpKUymqQvvT1Ci64D4hcnR6GD72K7Vkg&s",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CPHJwf1tq4sT19BTZMljpFDFDAI_HsoE9Q&s",
    provider: "Local Government Unit (LGU)",
    description: "Empowering local students through financial aid.",
    scholarship: "LGU Educational Assistance Program 2024",
    type: "Government",
    category: "Government",
    location: "San Fernando",
    rating: 4.3,
    reviews: 25,
  },

  // Companies Offering Scholarships
  {
    id: "7",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnMyLvEuZJ5vmx-uMaZLmHunXb8rC8NQhcZg&s",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_HxsW-XPFDH9ZA0c_nYb5UOfTvNYDWpM6A&s",
    provider: "Sun Life Financial",
    description: "Providing financial support to future leaders.",
    scholarship: "Sun Life Scholarship Program 2024",
    type: "Corporate",
    category: "Corporate",
    location: "Philippines",
    rating: 4.5,
    reviews: 60,
  },
  {
    id: "8",
    thumbnail:
      "https://www.consultancy.asia/illustrations/news/detail/2023-11-08-084519689-Accenture_sustains_hybrid_working_setup_in_the_Philippines.jpg",
    avatar:
      "https://yt3.googleusercontent.com/pFaWa7xoV41k485EZBb7nohqSzJwumUKPrZr1fFwYVHrQSXEnHPsEZ9wcbCNqfJhn-UNdd1D7Q=s900-c-k-c0x00ffffff-no-rj",
    provider: "Accenture",
    description: "Empowering students through scholarship programs.",
    scholarship: "Accenture Scholarship Program 2024",
    type: "Corporate",
    category: "Corporate",
    location: "Philippines",
    rating: 4.6,
    reviews: 40,
  },
  {
    id: "9",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D4D1BAQGAZINjqVQGiQ/company-background_10000/company-background_10000/0/1655160170969/synergy_companies_cover?e=2147483647&v=beta&t=s_bpyeouDDOFtvMRgU9mM_ylSIuzXot2jvc_3vbAthw",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-QvXao7tz6N8DltjvbmnYFWh2jnvuKZIOg&s",
    provider: "Synergy",
    description: "Offering educational grants to deserving students.",
    scholarship: "Synergy Scholarship Program 2024",
    type: "Corporate",
    category: "Corporate",
    location: "Philippines",
    rating: 4.4,
    reviews: 50,
  },
  // Additional Entries
  {
    id: "10",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/0148jfAmang_Rodriguez_Avenue_Manila_Water_Rosario_Ortigas_Avenue_Junction_Pasig_Cityfvf_17.jpg",
    avatar:
      "https://media.licdn.com/dms/image/v2/D560BAQGiUsbosN9IHg/company-logo_200_200/company-logo_200_200/0/1689039421706/manilawater_logo?e=2147483647&v=beta&t=bDaeAUbTWvZ9TYv5zTeS-Q5DxQ7wFa4kOYdon3nlQQ0",
    provider: "Manila Water Company, Inc.",
    description:
      "Contributing to education through various scholarship programs.",
    scholarship: "Manila Water Scholarship Program 2024",
    type: "Corporate",
    category: "Corporate",
    location: "Philippines",
    rating: 4.7,
    reviews: 30,
  },
  {
    id: "11",
    thumbnail:
      "https://i0.wp.com/governmentph.com/wp-content/uploads/2020/11/SM-Scholarship-2021-Application.png?fit=1200%2C630&ssl=1",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/SM_Supermalls_logo_2022.svg/1024px-SM_Supermalls_logo_2022.svg.png",
    provider: "SM Foundation",
    description: "Creating opportunities for youth through education.",
    scholarship: "SM Foundation Scholarship Program 2024",
    type: "Corporate",
    category: "Corporate",
    location: "Philippines",
    rating: 4.9,
    reviews: 50,
  },
  {
    id: "12",
    thumbnail:
      "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/279812741_5239365119458931_4183819853255650548_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEZIkypmQrIuleqtaU1_IiBR7G8uo2xTMhHsby6jbFMyHD3LQ_J6jAfZXP9ZXQuUDXj_u0rH1A1kW5vf6u1gBw9&_nc_ohc=83edwSW7qeYQ7kNvgGVYxoU&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=A04YDeS7tF5HDDhZgq9N-3o&oh=00_AYAN-ocTwB_ScW8ytm9K3gv7X586XTxElfCZH6LyDMPhQA&oe=67129476",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVy-CN1OQVMDHdhAVLTEaf06yLdAizfB55-w&s",
    provider: "Aboitiz Foundation, Inc.",
    description: "Supporting educational initiatives for the community.",
    scholarship: "Aboitiz Foundation Scholarship Program 2024",
    type: "Corporate",
    category: "Corporate",
    location: "Philippines",
    rating: 4.8,
    reviews: 45,
  },
];

export const dummyUsers: User[] = [
  {
    id: "1",
    email: "johndoe@example.com",
    name: "Johnmack Faeldonia",
    bio: "A passionate entrepreneur.",
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/452912470_2526121527595306_3752199441102383149_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtCgs-XyXL89ENkqy7JG3peWlRnJXahMF5aVGcldqEwU1hJd6qhyhKUGWsK52KiDE16tK8oTnAWiBcfTghtwJt&_nc_ohc=nyj-K21CRl8Q7kNvgGHFtoL&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AxNTWZFhCZdA3OBSWam6QD_&oh=00_AYAWq-elKA1RxTQIYt2OvUbsNU1BC78UgYAoOUl34JTN_w&oe=67110D26",
    bannerUrl: "https://placehold.co/600x400",
    role: "student",
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-09-01T12:00:00Z",
    archivedAt: "2024-09-01T12:00:00Z",
    providerVerfiedAt: "2024-09-01T12:00:00Z",
  },
  {
    id: "2",
    email: "janesmith@example.com",
    name: "Kurtd Daniel Bigtas",
    bio: "Tech enthusiast and problem solver.",
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/440166746_25371551272492353_7022797428020999409_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE6YN-LerRQeT9r5QJmhKUTkjRxWwzQgW6SNHFbDNCBbs5Je_9d1VcuTlg6UQQz3Y7v3pPfWBH0ypDLTs6CYgp8&_nc_ohc=r6D8cy67UfcQ7kNvgHXnr5G&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AB8ID44fIEKmsB3Fz3ePKgZ&oh=00_AYCaMhckXWRn1M8-5O8w3C2a2YHpIS6RPT9NDX-Vioj2BQ&oe=67112F0E",
    bannerUrl: "https://placehold.co/600x400",
    role: "student",
    createdAt: "2024-02-15T12:00:00Z",
    updatedAt: "2024-09-15T12:00:00Z",
    providerVerfiedAt: "2024-09-01T12:00:00Z",

  },
  {
    id: "3",
    email: "markjohnson@example.com",
    name: "Raven Dela Rama",
    bio: "Engineer with a love for innovation.",
    avatarUrl:
      "https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/426374110_1461399794737580_3493421727438730561_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG9CBl1CqqaysKmfa6Q1t41kvXsYt-w-BGS9exi37D4EQcfhgWDIP0v6PcSANmUDTBvyfEdpSRVUEwyDiPGs8lH&_nc_ohc=8GRGIgrNZvsQ7kNvgG76yxA&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AKkQ6BfwYojQzKQoBuvWwyn&oh=00_AYAZoEiv9RwDLuhvN9czH1vBhQA6PuZ-kSwV0YpqjIL0-A&oe=67111CC2",
    bannerUrl: "https://placehold.co/600x400",
    role: "student",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-09-20T12:00:00Z",
    providerVerfiedAt: "",

  },
];

export const dummyFeedbacks: Feedback[] = [
  {
    id: "101",
    userId: dummyUsers[0].id,
    rating: 5,
    comment: "Excellent experience! Everything was smooth and professional.",
    createdAt: "2024-10-10T15:30:00Z",
    updatedAt: "2024-10-10T15:30:00Z",
  },
  {
    id: "102",
    userId: dummyUsers[1].id,
    rating: 4,
    comment: "Good service overall, but there is room for improvement.",
    createdAt: "2024-10-11T14:20:00Z",
    updatedAt: "2024-10-11T14:20:00Z",
  },
  {
    id: "103",
    userId: dummyUsers[2].id,
    rating: 3,
    comment: "Average experience. Some aspects could have been better.",
    createdAt: "2024-10-13T05:13:00Z",
    updatedAt: "2024-10-13T05:13:00Z",
  },
];

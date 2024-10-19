<div align="center">

![ConnectED Icon](https://raw.githubusercontent.com/Kertsu/LV-ConnectED/refs/heads/main/src/frontend/public/favicon.ico)

</div>

# ConnectED - Centralized Scholarship and Internship Repository

**ConnectED** is a web application contributing to the **Quality Education SDG**. It serves as a centralized repository of internships and scholarships in the Philippines. Our goal is to solve the problem of discovering local scholarships and internships by consolidating them in one place, making it easier for students and professionals to find opportunities. Users can browse scholarships, internships, and providers, and sign in via passwordless authentication using an OTP sent to their email. Authenticated users have extended access, while unauthenticated users have limited actions but can still view posts.

---

## 🚧 Problem We're Solving

In the Philippines, finding scholarships and internships can be challenging, especially at the local level. Many opportunities from **LGUs** and private organizations are not centralized, leaving students and applicants to struggle with fragmented sources. By creating a platform that aggregates these opportunities in one place, we make it easier for students and professionals to access the educational support they need. **ConnectED** aims to break down these barriers and promote quality education through ease of access.

---

## 🛠️ Technologies Used

**Operating System:** Windows OS

![Operating System](https://skillicons.dev/icons?i=windows&perline=3)

**IDE/Code Editor:** VS Code (with Gitpod)

![IDE](https://skillicons.dev/icons?i=vscode&perline=3)

**Platform:** Gitpod for cloud-based development

![Gitpod](https://avatars.githubusercontent.com/u/37021919?s=48&v=4)

**API Testing:** Postman

![API Testing](https://skillicons.dev/icons?i=postman&perline=4)

**Deployment:** Gitpod (local ICP node), Smart contract deployment on the Internet Computer

![IC](https://avatars.githubusercontent.com/u/59101585?s=48&v=4) ![Gitpod](https://avatars.githubusercontent.com/u/37021919?s=48&v=4)

**Server Side:** Node.js, Express.js, TypeORM, Azle (Internet Computer)

![Server](https://skillicons.dev/icons?i=nodejs,expressjs&perline=4) ![TypeORM](https://avatars.githubusercontent.com/u/20165699?s=48&v=4) ![Azle](https://avatars.githubusercontent.com/u/95396363?s=48&v=4)

**Client Side:** React, Vite, Typescript, Tailwind, Radix UI, Shadcn UI

![Client](https://skillicons.dev/icons?i=react,vite,typescript,tailwind&perline=4) ![Radix](https://avatars.githubusercontent.com/u/75042455?s=48&v=4) ![Shadcn](https://avatars.githubusercontent.com/u/139895814?s=48&v=4)

---

## 🚀 Project Setup Instructions

### In Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Kertsu/LV-ConnectED)

Clicking this will redirect you to **Gitpod**, where you will be prompted to authenticate your account. Gitpod will create a new workspace for you. Make sure to choose **VS Code (Desktop)** for port forwarding.

<div align="center">

![Gitpod UI](https://raw.githubusercontent.com/Kertsu/LV-ConnectED/refs/heads/main/src/frontend/public/gitpod_ui_for_readme.png)

</div>

Once the editor opens, follow these commands to start a local ICP node and deploy the canister smart contract:

### Start a local ICP node

```sh
dfx start --clean --background
```

### In a new terminal window:

```sh
dfx deploy # Deploy the smart contract locally
```

The smart contract will be accessible at: `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943`.
Our backend API endpoints are prefixed with `/icp`, so backend endpoints start with: `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/icp`. You should note that the command will print a different canister URL for mainnet, ending in `.raw.icp0.io`.

When you hit this URL, you should see a message saying:

> You landed on ConnectED's backend service.

You can use any API testing tool (like Postman) as long as the app is deployed.

## 📌 Additional Reminders

- When developing the API, you may need to frequently run commands like dfx stop && dfx start --clean --background && dfx deploy due to the lack of hot reload for backend changes.
- For the frontend, simply run npm run start from the root directory if you're using Gitpod. On your local machine, navigate to src/frontend before running the command. The frontend has hot reload enabled.
- Gitpod provides 50 hours of free service when you link your LinkedIn account, and 10 hours otherwise. Keep this in mind to avoid service interruptions during development.

## 🛠️ Project Team

<div align="center">

<table style="border: none">
  <tr style="border: none" align="center">
    <td style="border: none">🤝🏻<br><strong>Christian Visaya</strong><br>Coach
    </td>
    
  </tr>
</table>

<table style="border: none">
  <tr style="border: none" align="center">
    <td style="border: none"><image src="https://github.com/ravendelarama.png
" width=40 height=40 style="border-radius: 9999px" alt="Raven"/><br><strong>John Raven Dela Rama</strong><br>Full Stack Developer <br><br>
      <a href="https://www.facebook.com/rxybxn"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
      <a href="https://github.com/ravendelarama"><img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    </td>
    <td style="border: none"><image src="https://github.com/Kertsu.png
" width=40 height=40 style="border-radius: 9999px" alt="Kurtd"/><br><strong>Kurtd Daniel Bigtas</strong><br>Lead  & Full Stack Developer <br><br>
      <a href="https://www.facebook.com/Kertsuuu/"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
      <a href="https://github.com/Kertsu"><img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    </td>
  </tr>
</table>

<table style="border: none">
  <tr style="border: none" align="center" >
    <td style="border: none"><image src="https://github.com/jeyemPF.png
" width=40 height=40 style="border-radius: 9999px" alt="JM"/><br><strong>John Mark Faeldonia</strong><br>Project Manager & Frontend Developer <br><br>
      <a href="https://www.facebook.com/johnmac.pareja"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
      <a href="https://github.com/jeyemPF"><img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    </td>
    <td style="border: none"><image src="https://github.com/Sora1173.png
" width=40 height=40 style="border-radius: 9999px" alt="Allen"/><br><strong>Allen Magadia</strong><br>UI/UX Designer & Frontend Developer <br><br>
      <a href="https://www.facebook.com/allenmagadia11"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
      <a href="https://github.com/Sora1173"><img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    </td>
    <td style="border: none"><image src="https://github.com/jethrocadang.png
" width=40 height=40 style="border-radius: 9999px" alt="Jethro"/><br><strong>Jethro Cadang</strong><br>Frontend Developer <br><br>
      <a href="https://www.facebook.com/jethro.cadang"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"></a>
      <a href="https://github.com/jethrocadang"><img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
    </td>
  </tr>
</table>

</div>

#### Love ConnectED? Give our repo a star ⭐ ⬆️.
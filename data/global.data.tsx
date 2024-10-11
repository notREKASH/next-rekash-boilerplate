import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FaXTwitter } from "react-icons/fa6";

const globalData = {
  name: "notRekash",
  description: "Best project starter for Nextjs",
  author: "Benmehal Joris",
  personalSite: "https://joris-benmehal-portfolio.vercel.app/",
  navLinks: [
    { href: "/", name: "Home" },
    { href: "#", name: "About" },
    { href: "#", name: "Blog" },
    { href: "#", name: "Contact" },
  ],
  socialLinks: [
    {
      name: "Github",
      href: "https://github.com/notREKASH",
      icon: GitHubLogoIcon,
    },
    {
      name: "Twitter",
      href: "https://x.com/notRekash",
      icon: FaXTwitter,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/benmehal-joris/",
      icon: LinkedInLogoIcon,
    },
  ],
};

export { globalData };

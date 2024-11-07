import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { SocialButton } from "@components/social-button/social-button";

type OAuth = {
  name: string;
  Icon: React.ElementType;
  bgColor: string;
};

const oauths: OAuth[] = [
  { name: "Google", Icon: FaGoogle, bgColor: "bg-red-500" },
];

export const OAuth = () => {
  return (
    <div className="flex justify-center space-x-4">
      {oauths.map((oauth) => (
        <SocialButton
          key={oauth.name}
          Icon={oauth.Icon}
          bgColor={oauth.bgColor}
          onClick={() => signIn(oauth.name.toLowerCase(), { redirectTo: "/" })}
        />
      ))}
    </div>
  );
};

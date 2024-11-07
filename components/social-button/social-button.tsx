interface SocialButtonProps {
  Icon: React.ElementType;
  bgColor: string;
  [key: string]: unknown;
}

export const SocialButton = ({
  Icon,
  bgColor,
  ...props
}: SocialButtonProps) => {
  return (
    <button
      className={`${bgColor} rounded-full p-3 text-white shadow-lg`}
      {...props}>
      <Icon className="size-4" />
    </button>
  );
};

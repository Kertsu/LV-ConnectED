import { Link } from 'react-router-dom';
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className="w-full px-5">
      <nav className="text-sm py-5 flex-wrap w-full flex gap-1 justify-center text-gray-700 dark:text-gray-300 lg:p-3">
        {/* Link to Terms and Conditions */}
        <Link className="pr-3 break-words mx-1" to="/terms-and-conditions">
          Terms of Use
        </Link>

        {/* Link to Privacy Policy */}
        <Link className="pr-3 break-words mx-1" to="/privacy-policy">
          Privacy Policy
        </Link>

        <a href="" className="pr-3 break-words mx-1">
          Developers
        </a>
        <div className="flex justify-center items-center">
          <span>© 2024 ConnectED</span>
        </div>
      </nav>
    </div>
  );
};

export default Footer;

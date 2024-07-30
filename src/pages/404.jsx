import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center h-full row items-center bg-white flex justify-center ms-4 shadow-md rounded-sm">
      <div>
        <div className="text-[100px] font-bold items-center ">404</div>
        <p>Page Not Found / Not Available</p>
        <p className="text-gray-600 mt-4">Sorry, the page you are looking for can&apos;t be found.</p>
        <Button className="bg-primary my-6">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

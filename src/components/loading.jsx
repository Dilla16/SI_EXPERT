import { Loader } from "lucide-react"; // Ensure you have lucide-react installed

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader className="animate-spin text-success w-10 h-10" />
    </div>
  );
};

export default Loading;

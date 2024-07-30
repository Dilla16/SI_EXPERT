import PropTypes from "prop-types";
import { Search } from "lucide-react";

const SearchData = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search data..."
        className="border-none outline-none rounded-md p-2 text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className=" text-black rounded-r-md">
        <Search className="w-5" />
      </button>
    </div>
  );
};

SearchData.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchData;

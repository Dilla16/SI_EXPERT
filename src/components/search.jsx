import PropTypes from "prop-types";
import { Search } from "lucide-react";

const SearchData = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search data..."
        className="border-none rounded-md p-2 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className=" text-black p-2 rounded-r-md">
        <Search />
      </button>
    </div>
  );
};

SearchData.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchData;

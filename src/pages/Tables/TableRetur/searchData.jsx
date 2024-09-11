import PropTypes from "prop-types";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="flex items-center py-4 w-56">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md h-9 text-xs"
      />
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;

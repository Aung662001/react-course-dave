import React from "react";
interface SearchItemProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
function SearchItems({ search, setSearch }: SearchItemProps) {
  return (
    <form className="searchItem">
      <label htmlFor="searchItem">Search Item</label>
      <input
        type="text"
        id="searchItem"
        placeholder="SearchItems"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchItems;

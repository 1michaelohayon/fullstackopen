import React from "react";

const SearchForm = ({ val, onChng }) =>
    <form>
        <div>
            find countries <input value={val} onChange={onChng} />
        </div>
    </form>

export default SearchForm;
import React from 'react'
import { useTranslation } from 'react-i18next';

function SearchForm({ placeholder, btnTitle = '', btnIcon = <i className="icon-magnifier"></i> }) {
    return (
        <>
            <form
                className="ps-form--search-mobile"
            >
                <div className="form-group--nest">
                    <input
                        className="form-control"
                        type="text"
                        placeholder={placeholder}
                    />
                    <button>
                        {btnIcon}
                    </button>
                </div>
            </form>
        </>
    )
}

export default SearchForm;

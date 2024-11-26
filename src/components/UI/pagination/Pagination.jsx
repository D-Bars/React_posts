import React from 'react';
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className="pagination__block">
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'pagination__page pagination__page__active' : 'pagination__page'}
                >
                    {p}
                </span>
            )}
        </div>
    );
};
export default Pagination;
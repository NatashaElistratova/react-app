import React from 'react'

export function Pagination(props) {
  let pages = Math.ceil(props.totalCount / props.pagination.limit);

  let items = [];

  function handleClick(current, e, index) {
    e.preventDefault();
    if(current){
      props.onClickPagination(current);
    }
    if(!current &&  props.pagination.page>=2 && props.pagination.page< pages){
      props.onClickPagination(props.pagination.page+index);
    }
    if(!current &&  props.pagination.page === 1 && index === 1){
      props.onClickPagination(props.pagination.page+index);
    }
    if(!current &&  props.pagination.page === items.length && index === -1){
      props.onClickPagination(props.pagination.page+index);
    }
  }

  for (let i = 0; i < pages; i++) {
    items.push(<li key={i} className={i === props.pagination.page - 1 ? 'uk-active': ''}><a href={`/posts/page/${i}`} onClick={(e) => handleClick(i + 1, e)}>{i + 1}</a></li>)
  }

  return <ul className="uk-pagination uk-flex-center" data-uk-margin>
            <li>
                <a href="#" onClick={(e) => handleClick(false, e, -1)}>
                <span data-uk-pagination-previous>
                    <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                    ratio={1}
                    >
                    <polyline
                        fill="none"
                        stroke="#000"
                        strokeWidth="1.2"
                        points="6 1 1 6 6 11"
                    />
                    </svg>
                </span>
                </a>
            </li>
            {items}
            <li>
                <a href="#" onClick={(e) => handleClick(false, e, 1)}>
                <span data-uk-pagination-next>
                    <svg
                    width={7}
                    height={12}
                    viewBox="0 0 7 12"
                    xmlns="http://www.w3.org/2000/svg"
                    ratio={1}
                    >
                    <polyline
                        fill="none"
                        stroke="#000"
                        strokeWidth="1.2"
                        points="1 1 6 6 1 11"
                    />
                    </svg>
                </span>
                </a>
            </li>
        </ul>
}

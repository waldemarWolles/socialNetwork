import React from 'react';
import classes from './Paginator.module.css';
import cn from 'classnames';
import { useState } from 'react';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }


  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;


  return <div className={classes.paginator}>
    {portionNumber > 1 
    ?<button onClick={ () => {portionNumber >= 2 && setPortionNumber(portionNumber - 1) }}>PREV</button>
    :<button className={classes.disabledButton} disabled={true}>PREV</button>
    
    }

    {pages
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p) => {
        return <span className={cn({ [classes.selectedPage]: currentPage === p }, classes.pageNumber)}
          key={p}
          onClick={(e) => { onPageChanged(p); }}
        >{p}</span>
      })}

    {portionCount > portionNumber 
    ?<button onClick={() => {portionNumber < portionCount && setPortionNumber(portionNumber + 1)}}>NEXT</button>
    :<button className={classes.disabledButton} disabled={true}>NEXT</button>
    }

  </div>


}

export default Paginator;


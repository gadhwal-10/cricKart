import React from 'react';
import '../componentStyles/Pagination.css'
import {useSelector} from 'react-redux';
function Pagination({
    currentPage,
    onPageChange,
    activeClass='active',
    nextPageText="Next",
    prevPageText="Prev",
    firstPageText='1st',
    lastPageText='Last'
}) {
    const {totalPages,products}=useSelector((state)=>state.product);
    if(products.length===0 || totalPages<=1) return null;

    //Generate Page numbers
    const getPageNumbers=()=>{
        const pageNumbers=[];
        const pageWindow=2;
        for(let i=Math.max(1,currentPage-pageWindow);
    i<=Math.min(totalPages,currentPage+pageWindow);i++
    ){
        pageNumbers.push(i)
    }
    return pageNumbers;
    }
  return (
    <div className='pagination'>
       { /* Previous and First Buttons*/}
      {
        currentPage>1 &&(
            <>
            <button className="pagination-btn" onClick={()=>onPageChange(1)}>{firstPageText}</button>
            <button className="pagination-btn" onClick={()=>onPageChange(currentPage-1)}>{prevPageText}</button>
            </>
        )
      }

{/*Display Numbers*/}
{
    getPageNumbers().map((number)=>(
        <button className={`pagination-btn ${currentPage===number?activeClass:''}`} key={number}
        onClick={()=>onPageChange(number)}
        >{number}</button>
    ))
}

{ /* Last and Next Buttons*/}
      {
        currentPage<totalPages &&(
            <>
            <button className="pagination-btn" onClick={()=>onPageChange(currentPage+1)}>{nextPageText}</button>
            <button className="pagination-btn" onClick={()=>onPageChange(totalPages)}>{lastPageText}</button>
            </>
        )
      }
    </div>
  )
}

export default Pagination

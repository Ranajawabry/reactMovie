import _ from 'lodash';
import React from 'react'

export default function Pagination({Array,ChangePage , pageNumber,pageSize}) {
    
    let pageCount = Math.ceil(Array.length/pageSize) ;
    let pages = _.range(0,pageCount);
    console.log(pages);
    
    if(pageCount==1){
      return  <></>
   }

  return (
    <div className='my-5 d-flex justify-content-center'>
 <nav aria-label="Page navigation example  ">
  <ul className="pagination ">
   {
    pages.map((page,index)=>(
        <li className={page==pageNumber?"page-item active": "page-item"} key={index} onClick={()=>{ChangePage(page)}}><a className="page-link" href="#">{page+1}</a></li>
    ))
   
    }
  </ul>
</nav>

    </div>
  )
}

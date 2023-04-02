import _ from "lodash";

let pagination =(populars,pageNumber,pageSize)=>{

    let startIndex=pageNumber*pageSize;
    return _(populars).slice(startIndex).take(pageSize).value();

}
export default pagination;
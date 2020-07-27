import React from 'react';

function ListItems(props){
    const items=props.items;
    const comps=props.comps;
 const listItems= items.map(item =>
        {
            return (<div className="task " key={item._id}>

                <p >{item.Item}<i onClick={() =>props.updateItem(item._id)} className="fas fa-check"></i><i className="fas fa-trash-alt" onClick={ () =>props.deleteItem(item._id)}></i></p>
                
                </div>)
                
        }
        )
        const upItems= comps.map(comp =>
            {
                return (<div className="task fadeIn">
    
                    <p >{comp.Item}<i className="fas fa-trash-alt" onClick={ () =>props.deleteItem(comp._id)}></i></p>
                    
                    </div>)
                    
            }
            )
    return(
        <div>
        <div className="notcomp">
        <h3>Not Completed</h3>
        <div >{listItems}</div>


      </div>

      <div className="comp">
        <h3>Completed</h3>
        <div >{upItems}</div> 
      </div>

      </div>
    )
}
export default ListItems;
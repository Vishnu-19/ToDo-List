import React from 'react';
import ListItems from './ListItems';
import './App.css';
import axios from 'axios';
class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      items:[],
      comp:[],
      currentItem:{
        text:'',
        date:'',
        status: 0
      }
      
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    
    this.updateItem = this.updateItem.bind(this);
  }

componentDidMount =()=>{
  this.gettodo();
  console.log(this.state.items)
}


 gettodo = ()=>{
   axios.get('/api')
    .then((response) =>{
      const data =response.data;
      console.log(data)
      const filtered =data.filter(item=>item.status!= 1 );
      console.log(filtered)
      const fil=data.filter(item=> item.status!=0);
      this.setState({
        items:filtered,
        comp:fil
      })
    })
    .catch(()=>{
      alert('Server Error');
    })
 }




  handleInput(e){
    this.setState({
      currentItem:{
        Item: e.target.value,
        status:0,
        date:Date.now()
      }
    })
  }
  addItem(e){
    e.preventDefault();
/*     const newItem=this.state.currentItem;
    
   if(newItem.text!==""){
      const newItems=[...this.state.items, newItem];
      this.setState({
        items:newItems,
        currentItem:{
            text:'',
            key:''
        }
      }) */
      if(this.state.currentItem.text!==""){
     const  payload= this.state.currentItem;
     this.setState({
      currentItem:{
        text:'',
        key:''
    }
  })
     axios({
       url:'/api/save',
       method:'POST',
       data:payload
     })
       .then(() => {
         console.log('Data has been sent')
       })
       .catch(() =>
       {
         console.log("Error sending data")
       });
    }
    else{window.alert('Empty')}
  this.gettodo();  
  }
  updateItem(key,e)
  {
    const dat={
      id:key
      
    }
    axios({
      url:'/api/update',
      method:'POST',
      data:dat
    })
      .then(() => {
        console.log('Data has been sent')
      })
      .catch(() =>
      {
        console.log("Error sending data")
      });
   this.gettodo();
    }

   
     /*  const newr=this.state.items.map(item=>{if(item.key===key){
      return item.text}
     return 'hi';
    })
  
    const filtered =newr.filter(item=>item!=='hi' );
    console.log(filtered)
     const newItems=[...this.state.comp,filtered];
    this.setState({
      comp: newItems 
    })
    const filtered1 = this.state.items.filter(item=>item.key!==key);
    this.setState({
      items:filtered1  
    })}*/
    
  
  deleteItem(key){

    const dat={
      id:key
      
    }
    axios({
      url:'/api/delete',
      method:'POST',
      data:dat
    })
      .then(() => {
        console.log('Data has been sent')
      })
      .catch(() =>
      {
        console.log("Error sending data")
      });
   this.gettodo();
   /*  const filtered = this.state.items.filter(item=>item.key!==key);
    this.setState({
      items:filtered  
    }) }
    
    deleteupItem(key){
      const filtered = this.state.comp.filter(comps=>comps!==key);
      this.setState({
        comp:filtered  
      }) */}
  render(){
  return (
    <div className="container">
    <h1>To-Do</h1>
   <form id="to-do" className="form" onSubmit={this.addItem}>
   <input className="txtb" name='text' value={this.state.currentItem.text} onChange={this.handleInput} placeholder="Add a Task"></input>
   
    
    </form>
    <ListItems items={this.state.items} comps={this.state.comp} deleteItem={this.deleteItem}  deleteItem={this.deleteItem} updateItem={this.updateItem}/>
   
   </div>
 
   );
   
}
}

export default App;
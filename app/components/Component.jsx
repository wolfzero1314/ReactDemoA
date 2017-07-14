
//ES6
import React from "react";
import Remarkable from "remarkable";
import {Button,ButtonToolbar,ButtonGroup} from "react-bootstrap";

 class Myreact extends React.Component{

     constructor(props){
         super(props);
         this.handleChange=this.handleChange.bind(this);
         this.state={
             value:"Type some *markdown* here!",
             cols:"20",
             rows:"10",
             resize:"none",
             width:"300px",
         };
     }

     handleChange(e){
         this.setState({value:e.target.value});
     }

     handleClick(e){
         e.target.style.background="#aaaaaa";
     }

     getRawMarkup(){
         var md=new Remarkable();
         return {
             __html:md.render(this.state.value)
         }
     }

     render(){
         return(
             <div className="MarkdownEditor" style={{marginLeft:"calc(50% - 150px)"}}>
                 <Timer/>

                 <ToDoApp/>

                 <div style={{width:this.state.width}}>
                     <h3>Input</h3>
                     <textarea onChange={this.handleChange} defaultValue={this.state.value} cols={this.state.cols*2} rows={this.state.rows} style={{resize:this.state.resize}}/>
                     <br/>
                     <h3>Output</h3>
                     <div className="content" dangerouslySetInnerHTML={this.getRawMarkup()}/>

                     <Toggle/>
                 </div>
             </div>
         )
     }
 }
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={isToggleOn:true,bsStyle:"warning"};
    }
    handleClick(e){
        this.setState((prevState)=>({
            isToggleOn:!prevState.isToggleOn,
        }))
    }
    render(){
        return(
            <Button onClick={this.handleClick} bsStyle={this.state.bsStyle}>
                {this.state.isToggleOn?"ON":"OFF"}
            </Button>
        )
    }
}


class ToDoApp extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={items:[],text:""};
    }

    handleChange(e){

        this.setState({text:e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        var newItem={
            id:Date.now(),
            text:this.state.text
        };
        if(this.state.text==""){
            alert("不能为空");
            return;
        }
        this.setState((prevState)=>({
            items:prevState.items.concat(newItem),
            text:""
        }))
    }


    render(){
        return(
            <div style={{width:this.state.width}}>
                <h3>TODO</h3>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.text}/>
                    <button>{'Add #'+(this.state.items.length+1)}</button>
                </form>
                <TodoList items={this.state.items}/>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
        this.state={text:""}
    }

    handleEdit(e){
        var text=e.target.parentNode.parentNode.textContent;
            text=text.slice(0,text.length-7);
        var id=e.target.parentNode.parentNode.getAttribute("id");
        alert(id);
        var textChange=prompt("",text);
        if(textChange!=null&&textChange!=""){
            document.getElementById(id).childNodes[0].innerHTML=textChange;
        }
    }
    handleDelete(e){
        var tag=e.target.parentNode.parentNode;
        alert(tag.parentNode)
        tag.parentNode.removeChild(tag);
    }
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id} id={item.id} style={{marginTop:"5px"}}>
                        <span>{item.text}</span>
                        <ButtonToolbar style={{display:"inline-block",verticalAlign:"middle",marginLeft:"5px"}}>
                            <Button onClick={this.handleEdit} bsStyle="info">EDIT</Button>
                            <Button onClick={this.handleDelete} bsStyle="danger">Del</Button>
                        </ButtonToolbar>
                    </li>

                ))}
            </ul>
        );
    }
}

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state={secondsElapsed:0}
    }
    tick(){
        this.setState((prevState)=>({
            secondsElapsed:prevState.secondsElapsed+1
        }));
    }
    componentDidMount(){
        this.interval=setInterval(()=>this.tick(),1000)
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        return(
            <h3>Seconds Elapsed:{this.state.secondsElapsed}</h3>
        )
    }
}
export default Myreact;
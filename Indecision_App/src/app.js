
class IndecisionApp extends React.Component {
    constructor (props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options:[]
        };
    }
    handleDeleteOptions(){ //function that gets passed down as props. this function handles the events
        this.setState(()=>{
            return {
                options:[]
            };
        });
        
    }
    handlePick(){
        const randomNum = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option){
         if (!option){ //run only if options array is empty
             return 'Enter valid value to add item';
         } else if (this.state.options.indexOf(option) > -1){ //indexof returns index 0 for 1st ele, 1 for 2nd, and -1 if no elements exists. means a match is found.
             return 'This option already exists';
            }
        this.setState((prevState)=>{
            return {
               options: prevState.options.concat([option]) // tp add new option in the options array above
            }; 
        });
    }
    render () {
    const title ='Indecision App';
    const subtitle = '@@Put your life in the hands of the computer@@';
    
    return (
        <div>
            <Header title = {title} subtitle = {subtitle}/> 
            <Action hasOptions={this.state.options.length > 0} /*if option is greater then has options is true else false*/
                    handlePick = {this.handlePick}           
            />
            <Options 
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}//with this we have access to handledeleteoptions function which can be accessed and gets passed down below
            />
            <AddOptions handleAddOption={this.handleAddOption}/>
        </div>
        );
    }
}
class Header extends React.Component {
    render (){    //with react component  you must call render 
        return (
            <div>
            <h1>{this.props.title} </h1> 
            <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

const Action = (props) => {
    return (
        <div>
             <button onClick={props.handlePick}
              disabled = {!props.hasOptions}>
              What Should I Do?</button>
        </div>
    );
};
// class Action extends React.Component {
    
//     render () {
//         return (
//             <div>
//                  <button onClick={this.props.handlePick}
//                   disabled = {!this.props.hasOptions}>
//                   What Should I Do?</button>
//             </div>
//         );
//     }
// }


class Options extends React.Component {
    // constructor (props){
    //      super(props); //access to this.props to ensure we get access to all properties of React 
    //      this.handleRemoveAll = this.handleRemoveAll.bind(this); //we set the handleRmoveall when component gets called. so whenever we call removall, it binds the 'this' with removall forever 
    // }
    
    render () {
        return (
            <div>
                <div>
                   <button onClick={this.props.handleDeleteOptions}>Remove All</button>    
                </div>
                {    
                    this.props.options.map((option) => <Option key={option} optionText={option}/>) //Option is instance of Option component down. render new p tag for each option <p key={option}>{option}</p>
                }
                 <Option />
            </div>
        );
    }
}
class Option extends React.Component{
   render(){
       /* access and print individual option in optionText down below*/
       return (
            <div>
                {this.props.optionText} 
            </div>
       );
   }

}


class AddOptions extends React.Component {
    constructor(props){ //constructor is defined as we have to handle 'this'
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = { //add a component state as error is specific to this form.
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();//prevents full page refresh
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        e.target.elements.option.value='';
        this.setState(() => {
            return{
                error: error //set error value up above to error in component state. you can also use just error instead of error: error as both are same name.
            }
             
        });
        //e.target.elements.option.value='';
        // if(option){ // check if option is entered by user
            
        //     this.props.handleAddOption(option);
            
        //     // this.props.options.push(option); //then push in options array
        //     // e.target.elements.option.value=''; //blank the options input text box.
        //     // render();
        // }
    }
    render () {
        return (
            <div>
                  {this.state.error && <p>{this.state.error}</p>}
                 <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option'></input>
                    <button>Add Option</button>                 
                 </form>                 
            </div>
        );
    }
}
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
/* const jsx = (

    <div>
       <h1> Title </h1>
       <Header /> 
       <Action />
       <Options />
       <AddOptions />
    </div>


); */

//stateless functional component example
// const User = (props) => { 
//     return (
//         <div>
//           <p>Name: {props.name}</p>
//           <p>Age: {props.age}</p>
//         </div>
//     );
// };
//ReactDOM.render(<User name="Nikhil" age={39}/>, document.getElementById('app'));

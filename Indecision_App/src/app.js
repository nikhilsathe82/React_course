
class IndecisionApp extends React.Component {
    constructor (props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            options:[]
        };
    }
    componentDidMount(){ // lifecycle method when component loads on DOM
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options){
                this.setState (() => ({ options })); //implicit return an object that update options to options array {options:options} but since property whose value coming from same name we use single {options}
            }
        } catch(e){
            //do nothing at all
        }
    }
    componentDidUpdate(prevProps,prevState){ //fires when component updates
        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
        
    }
    componentWillUnmount(){ //fires when your component goes away
        console.log('CCC');
    }
    handleDeleteOptions(){ //function that gets passed down as props. this function handles the events
       
     this.setState(() => ({options:[]})); //syntax to implicitly return options object;() is used for implicit return; implicit means automatically ruturn while explicit means we have to use return keyword
    //  this.setState(()=>{
    //     return {
    //         options:[]
    //     };
    // });
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option; // if === is used means the option that we want to delete actually ends up remaining in array. so !== is used.
                //filter() prop = return true to keep the option in array and return false if we do not want to keep option in array
            })
        }));
    };
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
        this.setState((prevState) => ({options: prevState.options.concat([option])}));// tp add new option in the options array above. implicitly 
            // this.setState((prevState)=>{
            // return {
            //    options: prevState.options.concat([option]) // tp add new option in the options array above
            // }; 
        
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
            handleDeleteOption={this.handleDeleteOption}
            />
            <AddOptions handleAddOption={this.handleAddOption}/>
        </div>
        );
    }
}
// IndecisionApp.defaultProps = {
//    options:[]
// };
const Header = (props) => {
    return (
        <div>
            <h1>{props.title} </h1> 
            <h2>{props.subtitle}</h2>
        </div>
    );
};
//some default props to be displayed if nothing is passed or set
Header.defaultProps = {
    title:'some default!'
};

// class Header extends React.Component {
//     render (){    //with react component  you must call render 
//         return (
//             <div>
//             <h1>{this.props.title} </h1> 
//             <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

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

const Options = (props) => {
    return (
        <div>
                <button onClick={props.handleDeleteOptions}>Remove All</button>    
                {props.options.length === 0 && <p>Please add an option to get started!</p>}
                {    
                    props.options.map((option) => ( //to map and traverse the option array
                        <Option
                        key={option}
                        optionText={option}
                        handleDeleteOption = {props.handleDeleteOption}
                        />)) //Option is instance of Option component down. render new p tag for each option <p key={option}>{option}</p>
                }
                
        </div>
    );
};
// class Options extends React.Component {
//     // constructor (props){
//     //      super(props); //access to this.props to ensure we get access to all properties of React 
//     //      this.handleRemoveAll = this.handleRemoveAll.bind(this); //we set the handleRmoveall when component gets called. so whenever we call removall, it binds the 'this' with removall forever 
//     // }
    
//     render () {
//         return (
//             <div>
//                 <div>
//                    <button onClick={this.props.handleDeleteOptions}>Remove All</button>    
//                 </div>
//                 {    
//                     this.props.options.map((option) => <Option key={option} optionText={option}/>) //Option is instance of Option component down. render new p tag for each option <p key={option}>{option}</p>
//                 }
//                  <Option />
//             </div>
//         );
//     }
// }
const Option = (props) => {
       /* access and print individual option in optionText down below*/
       return (
            <div>
                {props.optionText}
                <button 
                  onClick={(e) => { // this arrow func is going to call with e argument when button gets clicked
                        props.handleDeleteOption(props.optionText);//explicitly passed to handledeleteoption method above
                  }}>
                  Remove</button> 
            </div>
       );
   };


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
        if(!error){
            e.target.elements.option.value = '';
        }
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

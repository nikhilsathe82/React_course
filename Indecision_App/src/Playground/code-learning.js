class Counter extends React.Component
{
    constructor (props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.state = { //set state of count
            count:0,
            
        };
    }
    handleAddOne(){
        this.setState((prevState) =>{ //prevState is object. to take the previous value of count and increment it
            return {
                count: prevState.count + 1
            };
        }); //sets the state and refreshs the component    
    }
    handleMinusOne(){
        this.setState((prevState) =>{ //prevState is object. to take the previous value of count and decrement it
            return {
                count: prevState.count - 1
            };
        }); //sets the state and refreshs the component      
    }
    handleReset(){
        this.setState(() =>{ //prevState is object. to take the previous value of count and reset it
            return {
                count: 0
            };
        }); //sets the state and refreshs the component        
    }
    render(){
        return (
            <div>
                <h1>Count:{this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />,document.getElementById('app'));
// // JSX Javascript XML
// // var template = /*#__PURE__*/React.createElement("h1", {
// //     id: "someid"
// //   }, "This is JSX from app.js SomeThing New");
// // var app = {
// //     Title:'Indecision App',
// //     SubTitle: 'This is a React app',
// //     options: ['One','Two']
// //     };
// // var template =(
// //     <div>
// //         <h1>{app.Title}</h1>
// //         {app.SubTitle && <p>{app.SubTitle}</p>}
// //         {option(app.options)}
// //         <p>{app.options.length>0 ? 'here are your options' : 'No options'}</p>
// //     </div>); //this div is called wrapper div and contains all elements in app

// // function option(options){
// //     if (options.length>0){
// //         return <p>Here are you options</p>
// //     } else {
// //         return <p>No options</p>
// //     }
// // };
// // var user = {
// // name:'Nikhil',
// // age: 38,
// // location:'Gandhinagar1'
// // };

// // function getLocation(location){
// //     if (location){
// //         return <p>Location: {location}</p>;    
// //     } //no need for else as 'undefined' is implicitly return if not defined explicitly    
// // };
// // //ternary operator true ? perform this : else this
// // // true && exp = if true value is truthy then it displays exp. if false then nothing displays
// // var template2 =(
// //     <div>
// //         <h1>{user.name ? user.name.toUpperCase() : 'Anonymous'}</h1>
// //         {(user.age && user.age>=18) && <p>Age: {user.age}</p>} 
// //         {getLocation(user.location)}
// //     </div>);

// let count =0;
// const addOne = () =>{
//     count++
//     renderCounterApp();
// };
// const minusOne = () =>{
//     count--;
//     renderCounterApp();
// };
// const reset = () =>{
//     count=0;
//     renderCounterApp();
// };
// var appRoot = document.getElementById("app");

// const renderCounterApp = () => {
//     const template = (
//         <div>
//             <h1>Indecision App</h1>
//             <h2>Count: {count} </h2>
//             <button onClick={addOne} className="button">+1</button>
//             <button onClick={minusOne} className="button">-1</button>
//             <button onClick={reset} className="button">Reset</button>
//         </div>
//     );
// ReactDOM.render(template, appRoot);
// };
// renderCounterApp();
console.log("App.js is running@@@!");

var app = {
        Title:'Indecision App',
        SubTitle: 'This is a React app',
        options: []
        };
// e is event object that we get back that contains info about the events
const onFormSubmit = (e) => {
    e.preventDefault(); //stops full page refresh when you click on add option button below

    //get the value the user typed. option holds that value
    const option = e.target.elements.option.value; //target the event, element is the elements in template, option is input name and value is the one entered.

    //code for empty text box
    if (option){ 
        app.options.push(option);
        e.target.elements.option.value='';// to set the value in text box to empty string or clear out the value
        render();
    }    
};
const removeAll = () =>{
    app.options = [];
    render();
}
var appRoot = document.getElementById("app");
const render= () => {
    var template =(
        <div>
            <h1>{app.Title}</h1>
            {app.SubTitle && <p>{app.SubTitle}</p>}
            <p>{app.options.length > 0 ? 'here are your options' : 'No options'}</p>
            <p>{app.options.length}</p>
            <button onClick={removeAll}>Remove All</button>
            <ol>
            {
                app.options.map((option)=>{
                    return <li key={option}>{option}</li>;
                })
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"></input>
                <button>Add Option</button>
                
            </form>
        </div>
        ); //this div is called wrapper div and contains all elements in app
ReactDOM.render(template, appRoot);
};
    
render();





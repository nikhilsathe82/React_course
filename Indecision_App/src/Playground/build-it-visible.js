class VisibilityToggle extends React.Component {
    constructor (props){
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this); //preserve the binding with the function
        this.state = {
            visibility: false
        }
    };
    handleToggleVisibility (){
        this.setState((prevState)=>{
            return {
                visibility: !prevState.visibility //convert false to true and vice versa
            }
        });
    };
    render () {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>
                {this.state.visibility ? 'Hide details' : 'Show Details'}</button>
                {this.state.visibility && (
                    <div>
                       <p> Hey, there are some details you can see now</p>
                    </div>
      
                )}
            </div>
        )
    }


}
ReactDOM.render(<VisibilityToggle />,document.getElementById('app'));

// let visibility = false;

// const toggleVisibility = () => {
//     visibility = !visibility;
//     render();
// };

// const render = () => {
//     const jsx = (
//         <div>
//           <h1>Visibility Toggle</h1>
//           <button onClick={toggleVisibility}>
//             {visibility ? 'Hide details' : 'Show Details'}
//           </button>
//           {visibility && (
//               <div>
//                  <p> Hey, there are some details you can see now</p>
//               </div>

//           )}
//         </div>
//     );
//     ReactDOM.render(jsx,document.getElementById('app'));
// };
// render();
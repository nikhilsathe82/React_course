'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);

        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // lifecycle method when component loads on DOM
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    }); //implicit return an object that update options to options array {options:options} but since property whose value coming from same name we use single {options}
                }
            } catch (e) {
                //do nothing at all
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            //fires when component updates
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            //fires when your component goes away
            console.log('CCC');
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            //function that gets passed down as props. this function handles the events

            this.setState(function () {
                return { options: [] };
            }); //syntax to implicitly return options object;() is used for implicit return; implicit means automatically ruturn while explicit means we have to use return keyword
            //  this.setState(()=>{
            //     return {
            //         options:[]
            //     };
            // });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option; // if === is used means the option that we want to delete actually ends up remaining in array. so !== is used.
                        //filter() prop = return true to keep the option in array and return false if we do not want to keep option in array
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                //run only if options array is empty
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                //indexof returns index 0 for 1st ele, 1 for 2nd, and -1 if no elements exists. means a match is found.
                return 'This option already exists';
            }
            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            }); // tp add new option in the options array above. implicitly 
            // this.setState((prevState)=>{
            // return {
            //    options: prevState.options.concat([option]) // tp add new option in the options array above
            // }; 
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Indecision App';
            var subtitle = '@@Put your life in the hands of the computer@@';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: title, subtitle: subtitle }),
                React.createElement(Action, { hasOptions: this.state.options.length > 0 /*if option is greater then has options is true else false*/
                    , handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions //with this we have access to handledeleteoptions function which can be accessed and gets passed down below
                    , handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOptions, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);
// IndecisionApp.defaultProps = {
//    options:[]
// };


var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title,
            ' '
        ),
        React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};
//some default props to be displayed if nothing is passed or set
Header.defaultProps = {
    title: 'some default!'
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

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handlePick,
                disabled: !props.hasOptions },
            'What Should I Do?'
        )
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

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add an option to get started!'
        ),
        props.options.map(function (option) {
            return (//to map and traverse the option array
                React.createElement(Option, {
                    key: option,
                    optionText: option,
                    handleDeleteOption: props.handleDeleteOption
                })
            );
        }) //Option is instance of Option component down. render new p tag for each option <p key={option}>{option}</p>

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
var Option = function Option(props) {
    /* access and print individual option in optionText down below*/
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    // this arrow func is going to call with e argument when button gets clicked
                    props.handleDeleteOption(props.optionText); //explicitly passed to handledeleteoption method above
                } },
            'Remove'
        )
    );
};

var AddOptions = function (_React$Component2) {
    _inherits(AddOptions, _React$Component2);

    function AddOptions(props) {
        _classCallCheck(this, AddOptions);

        var _this2 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props)); //constructor is defined as we have to handle 'this'


        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = { //add a component state as error is specific to this form.
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOptions, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault(); //prevents full page refresh
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);
            e.target.elements.option.value = '';
            this.setState(function () {
                return {
                    error: error //set error value up above to error in component state. you can also use just error instead of error: error as both are same name.
                };
            });
            if (!error) {
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
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
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

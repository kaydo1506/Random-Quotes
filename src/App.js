import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      buttonClicked: false,
      backgroundColor: 'beige',
    };
    this.randomQuote = this.randomQuote.bind(this);
  }

  // randomColor() {
  //   // Generate a random color in hexadecimal format
  //   const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //   this.setState({ backgroundColor: randomColor });
  // }


  randomColor() {
    const red = Math.floor(Math.random() * 50 + 180); // Adjust the range for the red component
    const green = Math.floor(Math.random() * 50 + 130); // Adjust the range for the green component
    const blue = Math.floor(Math.random() * 50 + 90); // Adjust the range for the blue component

    const calmColor = `rgb(${red}, ${green}, ${blue})`;
    this.setState({ backgroundColor: calmColor });
  }


  randomQuote() {
    this.setState({ buttonClicked: true });
    this.randomColor();

    setTimeout(() => {
      fetch('https://type.fit/api/quotes')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const randomNumber = Math.floor(Math.random() * 16);
          this.setState({
            quote: data[randomNumber].text,
            author: data[randomNumber].author,
          });

          // Reset buttonClicked after the transition completes
          setTimeout(() => {
            this.setState({ buttonClicked: false });
          }, 300); // Adjust the time to match transition duration
        });
    }, 200); // Delay before fetching a new quote
  }

  componentDidMount() {
    this.randomQuote();
  }

  render() {
    const bg = this.state.backgroundColor; 
    return (
      <div className='container' style={{ backgroundColor: bg }}>
        <div className='wrapper'>
          <h1
            style={{ color: bg }}
            className={
              this.state.buttonClicked ? 'animateTextOut' : 'animateTextIn'
            }
          >
            ❝ {this.state.quote}
            <span>- {this.state.author.split(', type.fit')}</span>
          </h1>

          <button onClick={this.randomQuote} style={{ backgroundColor: bg }}>
            New Quote
          </button>
        </div>

        <a
          href={'https://ifyokedo.com/'}
          target='_blank'
          rel='noreferrer'
        >
          <em>by Rachael</em>
        </a>
      </div>
    );
  }
}

export default App;

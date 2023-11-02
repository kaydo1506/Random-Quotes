import '../App.css';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { CodeOutlined, FormatQuoteOutlined, SkipNextOutlined } from '@mui/icons-material';

class RandomQuotes extends Component {
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
    const red = Math.floor(Math.random() * 50 + 150); 
    const green = Math.floor(Math.random() * 50 + 100);
    const blue = Math.floor(Math.random() * 50 + 50); 

    const boldColor = `rgb(${red}, ${green}, ${blue})`;
    this.setState({ backgroundColor: boldColor });
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
      <div
        className='flex flex-col h-screen justify-center items-center transition ease-in-out delay-500 px-2'
        style={{ backgroundColor: bg }}
      >
        <div
          className='grid mx-auto bg-white items-center rounded-md px-4 h-52 lg:h-72 lg:px-10 w-80 lg:w-1/2 xl:w-1/3'
          style={{ color: bg }}
        >
          <h1
            className={
              this.state.buttonClicked
                ? 'animateTextOut text-base lg:text-2xl text-center font-bold pt-4 lg:pt-10'
                : 'animateTextIn text-base lg:text-2xl text-center font-bold pt-4 lg:pt-10'
            }
          >
            <FormatQuoteOutlined style={{fontSize: '40px'}}/> {this.state.quote}
          </h1>
          <span
            className={
              this.state.buttonClicked
                ? 'animateTextOut justify-self-end text-xs lg:text-sm lg:pr-10'
                : 'animateTextIn justify-self-end text-xs lg:text-sm lg:pr-10'
            }
          >
            - {this.state.author.split(', type.fit')}
          </span>
          <button
            onClick={this.randomQuote}
            style={{ backgroundColor: bg }}
            className='rounded-lg p-2 text-white justify-self-center transition ease delay-300 text-xs lg:text-sm'
          >
            New Quote
          </button>
        </div>

        <a
          href={'https://ifyokedo.com/'}
          target='_blank'
          rel='noreferrer'
          className='mt-8 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-white text-xs lg:text-sm'
        >
          <em>by Rachael <CodeOutlined/> </em>
        </a>
        <Link
          to='markdown'
          className='transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-white text-xs lg:text-sm'
        >
          View the next cool stuff <SkipNextOutlined />
        </Link>
      </div>
    );
  }
}

export default RandomQuotes;

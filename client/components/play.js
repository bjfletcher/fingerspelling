import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

import word from '../../lib/word';

import './play.scss';

const speeds = [
	{ text: "Very slow", value: 2500 },
	{ text: "Slow", value: 1500 },
	{ text: "Medium", value: 900 },
	{ text: "Fast", value: 600 },
	{ text: "Very fast", value: 250 },
	{ text: "Very, very fast", value: 150 }
];

const speedOptions = speeds.map(speed =>
		<MenuItem key={speed.value} value={speed.value} primaryText={speed.text}/>
);

const wordLengths = [
	{ text: "2", value: 2 },
	{ text: "3", value: 3 },
	{ text: "4", value: 4 },
	{ text: "6", value: 6 },
	{ text: "8", value: 8 },
	{ text: "Any", value: 0 },

];

const wordLengthOptions = wordLengths.map(wordLength =>
		<MenuItem key={wordLength.value} value={wordLength.value} primaryText={wordLength.text}/>
);

export default class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: speeds[2].value,
      wordLength: wordLengths[2].value,
	    score: 0
    };
		this.state.word = word(this.state.wordLength);

	  this.onGuessChange = this.onGuessChange.bind(this);
    this.onWordLengthChange = this.onWordLengthChange.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
	  this.again = this.again.bind(this);
	  this.check = this.check.bind(this);
  }

	componentWillMount() {
		this.spell(this.state.word);
	}

	spell(word) {
		if (word.length === 0) {
			this.setState({ finished: true }, () => this.refs.input.focus());
		} else {
			this.setState({ finished: false });
			const letter = word[0].toLowerCase();
			this.setState({ image: `images/${letter}.jpg`})
			this.timeout = setTimeout(() => this.spell(word.slice(1)), this.state.speed);
		}
	}

	stop() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}

	again() {
		this.stop();
		this.spell(this.state.word);
	}

	check() {
		this.stop();
		if (this.state.guess.toLowerCase() !== this.state.word.toLowerCase()) {
			this.setState({errorText: "I didn't spell that"}, () => this.again());
		} else {
			this.setState({guess: "", score: this.state.score + 1}, () => this.nextWord());
		}
	}

	nextWord() {
		const newWord = word(this.state.wordLength);
		if (newWord === this.state.word) this.nextWord(); // don't want the same word again
		else this.setState({ word: newWord }, () => this.spell(newWord));
	}

	onGuessChange(event) {
		this.setState({ errorText: null, guess: event.target.value });
	}

  onSpeedChange(event, index, speed) {
	  if (speed !== this.state.speed) {
		  this.setState({speed: speed, score: 0}, () => this.again());
	  }
  }

  onWordLengthChange(event, index, wordLength) {
	  if (wordLength !== this.state.wordLength) {
		  this.setState({wordLength: wordLength, score: 0}, () => this.nextWord());
	  }
  }

  render() {
	  const speed = speeds.find(s => s.value === this.state.speed).text.toLowerCase();
	  const wordLength = wordLengths.find(wl => wl.value === this.state.wordLength).text.toLowerCase();
    return (
      <div className={`play ${this.state.finished ? "play--finished" : ""}`}>
	      <img className="play__image" src={this.state.image} />
	      <img className="play__overlay" src="images/overlay.jpg" />
	      <div className="play__question">
		      <div className="play__question-text">What have I just fingerspelt?</div>
		      <RaisedButton
				      label="¯\_(ツ)_/¯ Repeat"
				      secondary={true}
				      onClick={this.again}
		      />
	      </div>
	      <div className="play__score">
		      Your score for {speed} {wordLength}-letter fingerspelling is <strong>{this.state.score}</strong>
	      </div>
	      <div>
					<TextField
							floatingLabelText="Your guess"
							value={this.state.guess}
							ref="input"
							onChange={this.onGuessChange}
							onEnterKeyDown={this.check}
							errorText={this.state.errorText}
					/>
					<RaisedButton
							label="Check"
							primary={true}
							onClick={this.check}
					/>
				</div>
	      <div>
					<SelectField
						value={this.state.speed}
						onChange={this.onSpeedChange}
						floatingLabelText="Speed"
					>
						 {speedOptions}
					</SelectField>
					<SelectField
						 value={this.state.wordLength}
						 onChange={this.onWordLengthChange}
						 floatingLabelText="Word length"
					>
						{wordLengthOptions}
					</SelectField>
        </div>
      </div>
    );
  }

}

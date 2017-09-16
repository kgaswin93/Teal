import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';
import { Feedbacks } from '../api/feedbacks.js';
import { Personal_details } from '../api/personal_details.js';

import Feedback from './.jsx';
import Question from './.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Questions.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderQuestions() {
    return;
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Questions</h1>
        </header>

        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new Question"
            />
        </form>
        <ul>
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Questions.find({},{sort:{createdAt: -1}}).fetch(),
  };
}, App);

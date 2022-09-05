import React, { Component } from 'react'
import { PRIORITIES, STATUSES } from '../../constants/itemConstants';
import { generateOptions } from '../../helpers/itemGenerators';

export default class ItemAddForm extends Component {
  state = {
    title: '',
    description: '',
    priority: PRIORITIES.LOW,
    status: STATUSES.TODO,
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  saveItem = () => {
    const {title, description, status, priority} = this.state;
    if (title.trim() === ''){
      this.setState({error: 'error', placeholder: 'Must be filled!'});
    } else {
      this.props.onAdd({ title, description, status, priority });
      
      this.setState({
        title: '',
        description: '',
        priority: PRIORITIES.LOW,
        status: STATUSES.TODO,
        error: '',
        placeholder: ''});
    }    
  }

  render() {
    const {
      title,
      description,
      status,
      priority,
      error,
      placeholder
    } = this.state;

    return (
      <div className="ItemAddForm">
        <form>
          <p>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              className={error}
              placeholder= {placeholder}
            />
          </p>
          <p>
            Description
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </p>
          <p>
            Priority
            {generateOptions('priority',  priority, PRIORITIES, this.handleChange)}
          </p>
          <p>
            Status
            {generateOptions('status', status, STATUSES, this.handleChange)}
          </p>
          <p>
            <button type="button" onClick={this.saveItem}>Save</button>
          </p>
        </form>
      </div>
    )
  }
}

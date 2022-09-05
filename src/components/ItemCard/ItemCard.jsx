import { Component } from 'react'
import { func, string } from 'prop-types';
import { generateOptions } from '../../helpers/itemGenerators';
import { PRIORITIES, STATUSES } from '../../constants/itemConstants';

export default class ItemCard extends Component {

  state = {
    titleEditMode: false,
    descriptionEditMode: false,
    priorityEditMode: false,
    statusEditMode: false,
  };

  handleDeleteClick = () => {
    this.props.delete(this.props.id);
  }

  handleEditModeOn = (event) => {
    this.setState({
      [`${event.target.getAttribute('name')}EditMode`]: true,
    });
  }

  handleBlur = (event) => {
    this.setState({
      [`${event.target.getAttribute('name')}EditMode`]: false,
    });
  }

  handleChange = (event) => {
    this.props.onUpdate(this.props.id, { [event.target.name]: event.target.value });
  }

  render() {
    const {
      titleEditMode,
      descriptionEditMode,
      priorityEditMode,
      statusEditMode,
    } = this.state;

    const {
      title,
      description,
      status,
      priority,
    } = this.props;

    return (
      <div className="ItemCard">
        {!this.state.titleEditMode && <p onClick={this.handleEditModeOn} name="title">{title}</p>}
        {titleEditMode && (
          <p>
            <input
              type="text"
              value={title}
              name="title"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </p>
        )}

        {!descriptionEditMode && <p onClick={this.handleEditModeOn} name="description">{description === ''? 'Change description': description}</p>}
        {descriptionEditMode && (
          <p>
            <textarea
              onBlur={this.handleBlur}
              value={description}
              name="description"
              onChange={this.handleChange}
            />
          </p>
        )}

        {!priorityEditMode && <p onClick={this.handleEditModeOn} name="priority">{priority}</p>}
        {priorityEditMode && (
          <p>
            {generateOptions('priority', priority, PRIORITIES, this.handleChange, this.handleBlur)}
          </p>
        )}

        {!statusEditMode && <p onClick={this.handleEditModeOn} name="status">{status}</p>}
        {statusEditMode && (
          <p>
            {generateOptions('status', status, STATUSES, this.handleChange, this.handleBlur)}
          </p>
        )}
        <button onClick={this.handleDeleteClick}>Delete</button>
      </div>
    );
  }
}

ItemCard.propTypes = {
  id: string,
  title: string,
  description: string,
  priority: string,
  status: string,
  onUpdate: func,
};

ItemCard.defaultProps = {
  title: 'Hello world',
  description: 'Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla',
  status: 'TODO',
  priority: 'HIGH',
};
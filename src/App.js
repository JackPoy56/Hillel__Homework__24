import { Component } from 'react';
import ItemAddForm from './components/ItemAddForm/ItemAddForm';
import ItemCard from './components/ItemCard/ItemCard';

export default class App extends Component {
  state = {
    items: {
      1: {
        "id": "1",
        "title": "title",
        "description": "description",
        "status": "TODO",
        "priority": "HIGH"
      },
      2: {
        "id": "2",
        "title": "title1",
        "description": "description1",
        "status": "TODO",
        "priority": "HIGH"
      },
      3: {
        "id": "3",
        "title": "title2",
        "description": "description2",
        "status": "TODO",
        "priority": "LOW"
      }
    },
  };

  handleItemsUpdate = (id, { title, description, status, priority }) => {
    const searchItem = {
      ...this.state.items[id],
    };
    if (title) {
      searchItem.title = title;
    }

    if (description) {
      searchItem.description = description;
    }

    if (status) {
      searchItem.status = status;
    }

    if(priority) {
      searchItem.priority = priority;
    }

    this.setState({
      items: {
        ...this.state.items,
        [id]: searchItem,
      }
    });
  };

  handleAddItem = item => {
    const id = `${Date.now()}`;
    const newItem = {
      id,
      ...item,
    };
    this.setState({ items: {
      ...this.state.items,
      [id]: newItem,
    } })
  };

  handleDeleteItem = item => {
    let newState = this.state.items;
    delete newState[item];
    
    this.setState({ items: newState });
  }

  render() {
    return (
      <div>
        <ItemAddForm
            onAdd={this.handleAddItem}
          />

        <div className="cards-block">
          {Object.values(this.state.items).map(item => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              status={item.status}
              priority={item.priority}
              onUpdate={this.handleItemsUpdate}
              delete={this.handleDeleteItem}
            />
          ))}
        </div>
      </div>
    )
  }
}
import { Component } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      monsters : [],
      filtered_monsters : []
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users)=> this.setState(() => {
        return {monsters: users, filtered_monsters: users}
      }));
  }

  OnSearchChange = (event) => {
    
      console.log(event.target.value)

      const filteredMonsters = this.state.monsters.filter((monster) => {
        return monster.name.includes(event.target.value)
      })

      this.setState(() => {
        return {filtered_monsters : filteredMonsters}
      })

    }

  render(){
    return (
      <div className="App">

        <SearchBox onChangeHandler={this.OnSearchChange}/>

        <CardList monsters={this.state.monsters}/>

      </div> 
    );
  }
}

export default App;


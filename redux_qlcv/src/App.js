import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      taskEditting: {},
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1,
    }
  }

  sml() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.sml() + '-' + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml() + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + this.sml()
      + '-' + this.sml() + this.sml() + '-' + this.sml()
  }

  onSubmit = (data) => {
    const { tasks } = this.state;
    if (data.id) {
      let index = this.findIndex(data.id);
      tasks[index] = data;
      this.onCloseForm();
    } else {
      data.id = this.generateID();
      tasks.push(data);
    }
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onResetForm();
  }

  onOpenForm = () => {
    this.setState({
      isDisplayForm: true
    });
    this.onResetForm();
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
    this.onResetForm();
  }

  findIndex = (id) => {
    const { tasks } = this.state;
    let result = -1
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index
      }
    });
    return result;
  }

  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDelete = (id) => {
    const { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onUpdate = (id) => {
    const { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting
    });
    this.onShowForm()
  }

  onResetForm = () => {
    this.setState({
      taskEditting: {}
    });
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }

  render() {
    let {isDisplayForm, taskEditting, /*filter, keyword,*/ sortBy, sortValue } = this.state;
    // if (filter) {
    //   if (filter.name) {
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }
    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task;
    //     } else {
    //       return task.status === (filter.status === 1 ? true : false)
    //     }
    //   });
    // }
    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }
    // if (sortBy === 'name'){
    //   tasks.sort((a,b) => {
    //     if (a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return -sortValue;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a,b) => {
    //     if (a.status > b.status) return -sortValue;
    //     else if (a.status < b.status) return sortValue;
    //     else return 0;
    //   });
    // };
    let elmTaskForm = isDisplayForm
      ? <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        taskEditting={taskEditting}
      /> : ''
    return (
      <div className='container'>
        <div className='text-center'>
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className='row'>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type='button' className='btn btn-primary' onClick={this.onOpenForm}>
              <span className='fa fa-plus mr-5'></span>Thêm Công Việc
            </button>
            <Control
              onSearch={this.onSearch}
              onSort = {this.onSort}
              sortBy = {sortBy}
              sortValue = {sortValue}
            />
            <div className='row mt-15'>
              <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <TaskList
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
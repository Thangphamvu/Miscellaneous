import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    const { taskEditting: { id, name, status } } = this.props
    this.state = {
      id : id || null,
      name : name || "",
      status : status || false
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    const { taskEditting: { id, name, status } } = props
    return {
      id : id || null,
      name : name || "",
      status : status || false
    };
  }

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === 'status') { value = target.value === 'true' ? true : false }
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  onClear = () => {
    this.setState({
      id: null,
      name: '',
      status: false
    });
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  render() {
    const {id} = this.state;
    return (
      <div className='panel panel-warning'>
        <div className='panel-heading'>
          <h3 className='panel-title'>
            {id ? 'Cập nhật công việc' : 'Thêm Công Việc'}
            <span className='fa fa-times-circle text-right pointer' onClick={this.onCloseForm}></span>
          </h3>
        </div>
        <div className='panel-body'>
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label>Tên :</label>
              <input
                type='text' className='form-control'
                name='name' value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className='form-control' required='required'
              name='status' value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className='text-center'>
              <button type='submit' className='btn btn-warning'>Lưu</button>&nbsp;
              <button type='button' className='btn btn-danger' onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;

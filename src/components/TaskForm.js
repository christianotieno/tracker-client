/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTask } from '../actions/task';
import '../styles/task.css';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-08-01',
      done: false,
      notes: '',
      name: '',
    };
  }

  componentDidMount = () => {
    const {
      tasks,
      buttonId,
      actionToPerform,
    } = this.props;

    if (
      actionToPerform === 'Save Changes'
    ) {
      const task = tasks.filter(
        x => x.id.toString() === buttonId,
      );

      this.setState({
        date: task[0].date,
        done: task[0].done,
        name: task[0].name,
        notes: task[0].notes,
      });
    }
  }

  handleChangeDate = e => {
    this.setState({
      date: e.target.value,
    });
  }

  handleChangeDone = () => {
    const { done } = this.state;
    this.setState({
      done: !done,
    });
  }

  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeNotes = e => {
    this.setState({
      notes: e.target.value,
    });
  }

  handleEdit = async (
    id, schedule_id,
  ) => {
    const {
      date,
      done,
      name,
      notes,
    } = this.state;

    const {
      user,
      updateTask,
      changeEditForm,
    } = this.props;

    const data = {
      id,
      date,
      done,
      name,
      notes,
      schedule_id,
      user_id: user.user.id,
    };

    await updateTask(data);
    changeEditForm();
  }

  handleSubmit(
    date,
    done,
    name,
    notes,
  ) {
    const {
      user,
      addTask,
      changeAddForm,
    } = this.props;

    const user_id = user.user.id;

    addTask(date, name, done, notes, user_id);
    changeAddForm();
  }

  render() {
    const {
      date, done, name, notes,
    } = this.state;

    const {
      tasks,
      buttonId,
      changeAddForm,
      changeEditForm,
      actionToPerform,
    } = this.props;

    const task = tasks.filter(
      x => x.id.toString() === buttonId,
    );

    return (
      <div className="task-div">
        <h3>
          {actionToPerform}
          {' '}
          Scheduled Tasks
        </h3>
        <form className="task">

          <div className="form-div">
            <div className="date-temp">

              <div className="name-div">
                <label htmlFor="name">
                  Name:
                  <input
                    id="task-name"
                    type="text"
                    name="name"
                    placeholder="Task Name:"
                    onChange={e => this.handleChangeName(e)}
                  />
                </label>
              </div>

              <div className="date-div">
                <label htmlFor="date">
                  Date:
                  <input
                    id="date"
                    type="date"
                    name="date"
                    onChange={this.handleChangeDate}
                  />
                </label>
              </div>

              <div className="done-div">
                <label htmlFor="done">
                  Done?:
                  <input
                    id="done"
                    type="checkbox"
                    name="done"
                    checked={done}
                    onChange={this.handleChangeDone}
                  />
                </label>
              </div>
              <div className="notes-div">
                <label htmlFor="notes">
                  Notes:
                  <input
                    id="notes"
                    type="text"
                    name="notes"
                    placeholder="Add notes here"
                    onChange={e => this.handleChangeNotes(e)}
                  />
                </label>
              </div>
            </div>
            <div className="buttons-form task-buttons">
              {actionToPerform === 'Add'
              && (
              <button
                type="button"
                onClick={() => this.handleSubmit(
                  date, done, notes, name,
                )}
              >
                {actionToPerform}
              </button>
              )}

              {actionToPerform === 'Save Changes'
              && (
              <button
                type="button"
                onClick={() => this.handleEdit(
                  task[0].id, task[0].schedule_id,
                )}
              >
                Save Changes
              </button>
              )}

              {actionToPerform === 'Add'
              && (
              <button
                type="button"
                onClick={changeAddForm}
              >
                Cancel
              </button>
              )}

              {actionToPerform === 'Save Changes'
              && (
              <button
                type="button"
                onClick={changeEditForm}
              >
                Cancel
              </button>
              )}

            </div>
          </div>
        </form>
      </div>
    );
  }
}

TaskForm.propTypes = {
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
  buttonId: PropTypes.string,
  changeAddForm: PropTypes.func,
  changeEditForm: PropTypes.func,
  actionToPerform: PropTypes.string,
  tasks: PropTypes.instanceOf(Array),
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

TaskForm.defaultProps = {
  user: {},
  tasks: [],
  buttonId: '0',
  actionToPerform: '',
  addTask: () => {},
  updateTask: () => {},
  changeAddForm: () => {},
  changeEditForm: () => {},

};

const mapStateToProps = state => ({
  user: state.user,
  tasks: state.task,
});

const mapDispatchToProps = dispatch => ({
  updateTask: data => dispatch(updateTask(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);

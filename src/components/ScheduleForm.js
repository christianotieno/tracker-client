import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSchedule } from '../actions/schedule';

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount = () => {
    const {
      schedule,
      buttonId,
      actionToPerform,
    } = this.props;

    if (
      actionToPerform === 'Save Changes'
    ) {
      const sched = schedule.filter(
        x => x.id.toString() === buttonId,
      );
      this.setState({
        title: sched[0].title,
      });
    }
  }

  handleChange = e => {
    this.setState({
      title: e.target.value,
    });
  }

  handleSubmit = title => {
    const { addSchedule } = this.props;
    addSchedule(title);
  }

  handleUpdate = async id => {
    const { title } = this.state;
    const {
      user,
      updateSchedule,
      changeEditForm,
    } = this.props;

    const data = {
      id,
      user_id: user.user.id,
      title,
    };

    await updateSchedule(data);
    changeEditForm();
  }

  render() {
    const { title } = this.state;

    const {
      schedule,
      buttonId,
      changeAddForm,
      changeEditForm,
      actionToPerform,
    } = this.props;

    const sched = schedule.filter(
      x => x.id.toString() === buttonId,
    );

    return (
      <div>
        <h3>
          {actionToPerform}
          Schedule
        </h3>
        <form
          className="one-form"
          onSubmit={
           actionToPerform === 'Add'
             ? () => this.handleSubmit(title)
             : () => this.handleUpdate(sched[0].id)
}
        >
          <div className="one-parameter">
            <label htmlFor="title">
              Title:
              <input
                required
                id="title"
                type="text"
                name="title"
                defaultValue={
                  buttonId === '0'
                    ? title
                    : sched[0].title
}
                onChange={this.handleChangeTitle}
              />
            </label>
          </div>
          <div className="buttons-form">
            {actionToPerform === 'Add'
            && (
            <button type="submit">
              {actionToPerform}
            </button>
            )}

            {actionToPerform === 'Save Changes'
            && (
            <button type="submit">
              Save
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
        </form>
      </div>
    );
  }
}

ScheduleForm.propTypes = {
  buttonId: PropTypes.string,
  addSchedule: PropTypes.func,
  changeAddForm: PropTypes.func,
  updateSchedule: PropTypes.func,
  changeEditForm: PropTypes.func,
  actionToPerform: PropTypes.string,
  schedule: PropTypes.instanceOf(Array),
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),

};

ScheduleForm.defaultProps = {
  user: {},
  buttonId: '0',
  schedule: [],
  actionToPerform: '',
  addSchedule: () => {},
  changeAddForm: () => {},
  updateSchedule: () => {},
  changeEditForm: () => {},
};

const mapStateToProps = state => ({
  user: state.user,
  schedule: state.schedule,
});

const mapDispatchToProps = dispatch => ({
  updateSchedule: data => dispatch(updateSchedule(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleForm);

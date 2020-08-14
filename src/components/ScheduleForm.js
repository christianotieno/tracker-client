import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ScheduleForm = () => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          // value={title}
          className="form-input"
          // onChange={handleChange}
          placeholder="Schedule title"
          required
        />
        <input
          type="submit"
          value="Add schedule"
        />
      </form>
    </div>
  );
};

export default ScheduleForm;

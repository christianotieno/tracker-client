import React from 'react';

function TaskForm() {
  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="task name"
          required
        />
        <input
          type="submit"
          value="Add task to schedule"
        />
      </form>
    </div>
  );
}

export default TaskForm;

import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./TaskItem.module.scss";
import { FaTrash } from "react-icons/fa";

function TaskItem({ task, deleteTask, onTaskUpdate }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task.title);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/tasks/${task.id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      onTaskUpdate(response.data); // Aquí llamas a onTaskUpdate con la tarea actualizada
      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleUpdateTitle = async () => {
    if (editableTitle !== task.title) {
      try {
        setIsLoading(true);
        const response = await axios.patch(`/api/tasks/${task.id}`, {
          title: editableTitle,
          // Mantén el estado completado sincronizado
          completed: isCompleted,
        });
        onTaskUpdate(response.data); // Actualiza la tarea en la lista
        toast.success("Task title updated successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update task title");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div
          className={classes.checkbox}
          onClick={handleCheckboxClick}
          role="checkbox"
          aria-checked={isCompleted}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            disabled={isLoading}
            readOnly
          />
        </div>

        <input
          type="text"
          className={classes.editableTitle}
          value={editableTitle}
          onChange={handleTitleChange}
          onBlur={handleUpdateTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUpdateTitle();
            }
          }}
          disabled={isLoading}
        />
      </td>
      <td>{isCompleted ? "Complete" : "Incomplete"}</td>
      <td>{moment(task.createdAt).format("MMM Do YY")}</td>
      <td>
        <div className="deleteBtnContainer">
          <button
            type="button"
            className={classes.deleteBtn}
            onClick={() => deleteTask(task.id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TaskItem;

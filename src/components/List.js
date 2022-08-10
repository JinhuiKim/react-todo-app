import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function List({ todoData, setTodoData }) {
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) data.completed = !data.completed;
      return data;
    });

    setTodoData(newTodoData);
  };

  return (
    <DragDropContext>
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data, index) => (
              <Draggable
                key={data.id}
                draggableId={data.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex items-center justify-between w-full px-4 py-1 my-1 text-gray-600 bg-gray-100 border rounded">
                      <div className="items-center">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={() => handleCompleteChange(data.id)}
                        />{" "}
                        <span
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
                          {data.title}
                        </span>
                      </div>
                      <div className="items-center">
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

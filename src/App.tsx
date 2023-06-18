import React, { useState, useEffect } from 'react';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { Button, Input, Row } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './components/Card';
import styled from 'styled-components';
import database from './config/firebase';
import { Task } from './types';


const App: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [editingTask, setEditingTask] = useState('');

	useEffect(() => {
		const tasksRef = ref(database, 'tasks');
		onValue(tasksRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const taskList = Object.keys(data).map((taskId) => ({
					id: taskId,
					...data[taskId],
				}));
				setTasks(taskList);
			}
		});
	}, []);

	const handleAddTask = () => {
		const newTaskRef = push(ref(database, 'tasks'));
		update(newTaskRef, {
			description: '',
			status: 'Pending',
		});
		// @ts-ignore
		setEditingTask(newTaskRef?.key);
	};

	const handleRemoveTask = (taskId: string) => {
		remove(ref(database, `tasks/${taskId}`));
	};

	const handleUpdateTask = (taskId: string, newDescription: string) => {
		update(ref(database, `tasks/${taskId}`), {
			description: newDescription,
		});
		setEditingTask('');
	};

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;

		if (sourceIndex === destinationIndex) return;

		const updatedTasks = Array.from(tasks);
		const [draggedTask] = updatedTasks.splice(sourceIndex, 1);
		updatedTasks.splice(destinationIndex, 0, draggedTask);

		setTasks(updatedTasks);
		const updatedTasksObject = updatedTasks.reduce((acc, task) => {
			// @ts-ignore
			acc[task.id] = task;
			return acc;
		}, {});

		update(ref(database, '/tasks'), updatedTasksObject);
	};

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    update(ref(database, `/tasks/${taskId}`), {
      status: newStatus,
    });
  };

	return (
		<div className="App" style={{padding:'2rem'}}>
			<AddNew type="dashed" onClick={handleAddTask}>
				Add Task
			</AddNew>
			<Row gutter={[8, 16]}>
				<DragDropContext onDragEnd={handleDragEnd}>
					{tasks.map((task, index) => (
						<Droppable key={task.id} droppableId={task.id}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="task-list"
								>
									<Draggable
										draggableId={task.id}
										index={index}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<Card
													task={task}
													editingTask={editingTask}
													handleUpdateTask={
														handleUpdateTask
													}
													setEditingTask={
														setEditingTask
													}
													handleRemoveTask={
														handleRemoveTask
													}
                          updateTaskStatus={
                            updateTaskStatus
                          }
												/>
											</div>
										)}
									</Draggable>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
				</DragDropContext>
			</Row>
		</div>
	);
};

const AddNew = styled(Button)`
	height: 8rem;
	width: 16rem;
	margin: 1rem 0;
`;
export default App;

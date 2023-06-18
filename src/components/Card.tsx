import { Card as AntCard, Space, Button, Input, Col, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import styled from 'styled-components';

type Props = {
	task: any;
	editingTask: string;
	handleUpdateTask: (id: string, value: string) => void;
	setEditingTask: (item: string) => void;
	handleRemoveTask: (item: string) => void;
    updateTaskStatus: (id: string, value: string) => void;
};
const Card = (props: Props) => {
	const {
		task,
		editingTask,
		handleUpdateTask,
		setEditingTask,
		handleRemoveTask,
        updateTaskStatus
	} = props;

	return (
		<Col span={8}>
			<TaskCard className="task-card">
				{editingTask === task.id ? (
					<Input
						defaultValue={task.description}
						onBlur={(e) =>
							handleUpdateTask(task.id, e.target.value)
						}
						placeholder={'Enter task description here'}
						autoFocus
					/>
				) : (
					<>
						<p
							onClick={() => setEditingTask(task.id)}
							style={{ height: '22px' }}
						>
							{task.description || ''}
						</p>
						{/* Additional task details here */}
					</>
				)}
				<Select
					defaultValue={task.status}
					onChange={(value) => updateTaskStatus(task.id, value)}
					options={[
						{ value: 'inprogress', label: 'In Progress' },
						{ value: 'completed', label: 'Completed' },
					]}
				/>
				<Space>
					<Button
						size="small"
						onClick={() => setEditingTask(task.id)}
					>
						Edit
					</Button>
					<Button
						size="small"
						danger
						onClick={() => handleRemoveTask(task.id)}
					>
						Remove
					</Button>
				</Space>
			</TaskCard>
		</Col>
	);
};

const TaskCard = styled(AntCard)`
	width: 16rem;
	height: 10rem;
	overflow: hidden;
	.ant-space {
        margin-top: 1rem ;
		visibility: hidden;
	}
	&:hover {
		.ant-space {
			visibility: visible;
		}
	}
`;
export default Card;

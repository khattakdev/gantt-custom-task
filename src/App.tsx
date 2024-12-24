import { FunctionComponent, useRef, useState, useEffect } from 'react';
import { BryntumDemoHeader, BryntumGantt } from '@bryntum/gantt-react';
import { useGanttConfig } from './AppConfig.tsx';
import './App.scss';
import { DependencyModel, Gantt, Model, TaskModel, TaskStore } from '@bryntum/gantt';

class CustomModel extends TaskModel {
    static $name = 'Task';

    static get fields() {
        return [
            // enable project border constraint check
            { name : 'name', defaultValue : 'new Task' },
            'status', // For status column
            { name : 'id', type : 'number' }, // For complexity column
            { name : 'expanded' , type : 'boolean', defaultVaue : true}
        ];
    }
}

const App: FunctionComponent = () => {
    const handleEditClick = (record : TaskModel, grid : Gantt) => {
        grid.editTask(record);
    };

    const handleCreateRecordFn = () => {
        const gantt = ganttRef?.current?.instance;

        // Call for all dependencies
        if (gantt?.project?.dependencyStore) {
            // Add createRecord function to the dependency store
            gantt.project.dependencyStore.createRecord = (data: any) : DependencyModel => {
                console.log("NEW RECORD CREATED!");
                console.log(gantt.project.dependencyStore.records)
                return new DependencyModel(data);
            };
        }
    }
    const ganttRef = useRef<BryntumGantt>(null);

    useEffect(() => {
        // Bryntum Gantt instance
        const gantt = ganttRef?.current?.instance;
      }, []);

      const addTaskHandler = () => {
        const gantt = ganttRef?.current?.instance;
        const newTask = new CustomModel({
            id: 1231462,
            name: 'New Task via CustomModel',
            startDate: '2024-12-20',
            duration: 3
        });

        gantt?.project.appendChild(newTask.toJSON());

        const newTasks = new TaskStore({
            modelClass: CustomModel,
            createRecord: (data: any) : Model  => {
                console.log("A new record has been created - ", data)
                return new CustomModel(data);
            }
        })

        newTasks.add([
            {
                id: 123142,
                name: 'New Task',
                startDate: '2024-12-20',
                duration: 3
            },
            {
                id: 12314222,
                name: 'New Task 02',
                startDate: '2024-12-20',
                duration: 3
            }
        ]);

        gantt?.project.appendChild(newTasks.records);

      }

    const [ganttConfig] = useState(useGanttConfig(handleEditClick, handleCreateRecordFn));
    return (
        <>
            {/* BryntumDemoHeader component is used for Bryntum example styling only and can be removed */}
            <BryntumDemoHeader />
            <button onClick={addTaskHandler}>Add Task</button>
            <BryntumGantt ref={ganttRef} {...ganttConfig} />
        </>
    );
};

export default App;

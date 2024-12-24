import { BryntumGanttProps } from "@bryntum/gantt-react";
import DemoButton from "./components/DemoButton";
import DemoEditor from "./components/DemoEditor";

const useGanttConfig = (
  handleEditClick: Function,
  handleCreateRecordFn: Function
): BryntumGanttProps => {
  return {
    project: {
      autoSetConstraints: true,
      autoLoad: true,
      loadUrl: "data/launch-saas.json",
      /* Call for all dependencies
            dependencyStore : {
                createRecord: (data: any) : Model => {
                    console.log('A new dependency added!')
                    return new DependencyModel(data);
                }
            },
            */
      // This config enables response validation and dumping of found errors to the browser console.
      // It's meant to be used as a development stage helper only so please set it to false for production systems.
      validateResponse: true,
      listeners: {
        load() {
          handleCreateRecordFn();
        },
      },
    },
    columns: [
      {
        type: "name",
        field: "name",
        width: 250,
      },
      {
        text: 'Edit<div class="small-text">(React component)</div>',
        htmlEncodeHeaderText: false,
        width: 120,
        editor: false,
        align: "center",
        type: "column",
        // Using custom React component
        renderer: ({ record, grid }) =>
          record.isLeaf ? (
            <DemoButton
              text={"Edit"}
              onClick={() => handleEditClick(record, grid)}
            />
          ) : (
            ""
          ),
      },
      {
        field: "draggable",
        text: 'Draggable<div class="small-text">(React editor)</div>',
        htmlEncodeHeaderText: false,
        width: 120,
        align: "center",
        type: "column",
        editor: (ref) => <DemoEditor ref={ref} />,
        renderer: ({ value }) => (value ? "Yes" : "No"),
      },
    ],
    viewPreset: "weekAndDayLetter",
    barMargin: 10,
  };
};

export { useGanttConfig };

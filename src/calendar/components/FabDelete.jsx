import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSeleted } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSeleted ? "" : "none",
      }}
    >
      <i className="fas fa-trash"></i>
    </button>
  );
};

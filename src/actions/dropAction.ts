type DataType = 'LIST' | 'CARD';

export function dropAction(
  node: HTMLElement,
  { dataType }: { dataType: DataType }
) {
  const dropHandler = (event: DragEvent) => {
    event.preventDefault();

    const id = event.dataTransfer.getData(dataType);

    if (!id) {
      return;
    }
    const afterEl =
      dataType === 'LIST'
        ? getAfterElement(node, event.clientX)
        : getVerticalAfterElement(node, event.clientY);

    const afterId = afterEl?.dataset?.id;

    node.dispatchEvent(new CustomEvent('reorder', { detail: { id, afterId } }));
    console.log('id : ', id, ' / afterId : ', afterId);
  };

  node.addEventListener('drop', dropHandler);
  node.addEventListener('dragover', e => e.preventDefault());

  return {
    destroy() {
      node.removeEventListener('drop', dropHandler);
    },
  };
}

function getAfterElement(containerEl: HTMLElement, x: number) {
  const draggableElements = [
    ...containerEl.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const rect = child.getBoundingClientRect();
      const offset = x - rect.left - rect.width / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: undefined }
  ).element;
}

function getVerticalAfterElement(containerEl: HTMLElement, y: number) {
  const draggableElements = [
    ...containerEl.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const rect = child.getBoundingClientRect();
      const offset = y - rect.top - rect.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: undefined }
  ).element;
}

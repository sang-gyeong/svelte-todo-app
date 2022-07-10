export function dragAndDrop(node) {
  const dragHandler = event => {
    event.preventDefault();
    const afterEl = getAfterElement(node, event.clientX);
    const draggableEl = document.querySelector('.dragging');
    node.appendChild(draggableEl);

    if (!afterEl) {
      node.appendChild(draggableEl);
    } else {
      node.insertBefore(draggableEl, afterEl);
    }
  };

  node.addEventListener('dragover', dragHandler);
}

function getAfterElement(containerEl, x) {
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
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

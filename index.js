// script.js

const listItems = document.querySelectorAll('#draggable-list li');

let draggedItem = null;

listItems.forEach(item => {
    item.addEventListener('dragstart', () => {
        draggedItem = item;
        setTimeout(() => {
            item.classList.add('dragging');
        }, 0);
    });

    item.addEventListener('dragend', () => {
        setTimeout(() => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }, 0);
    });

    item.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(item, e.clientY);
        const list = item.parentNode;
        if (afterElement == null) {
            list.appendChild(draggedItem);
        } else {
            list.insertBefore(draggedItem, afterElement);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.parentNode.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

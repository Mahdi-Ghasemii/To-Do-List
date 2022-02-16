let $ = document;

let mainOfDOM = $.querySelector('main');
let taskGroupNameInput = $.querySelector('#user-task-grup-input');
let form = $.querySelector('form');
let addNewTaskGroupBtn = $.querySelector('.add-task-grup');
let deleteTaskGroup = $.querySelectorAll('#delete-group-icon');
let deleteTask = $.querySelectorAll('#delete-task-icon');
let editIcons = $.querySelectorAll('.fa-pen');
let showAddTaskModal = $.querySelectorAll('.add-task-btn');
let addTaskDiv = $.querySelector('#add-task-btn1');
let addNewTaskUserInput = $.querySelectorAll('.user-new-task-input');
let addCardBtn = $.querySelectorAll('.add-card-btn');
let closeIcons = $.querySelectorAll('.fa-close');
let taskTemplate = $.querySelectorAll('.task-template');
let taskTitle = $.querySelectorAll('h3');
let taskGroupHeader = $.querySelectorAll('.task-group-header');
let allTaskTitles = $.querySelectorAll('.task-group-title');
console.log(allTaskTitles);

let toggleModals = (hiddenModal, shownModal) => {
    hiddenModal.style.display = "block";
    shownModal.style.display = "none";
}

let removeTaskGroup = (event) => {
    event.target.parentElement.parentElement.parentElement.remove();
}
let removeTask = (event) => {
    event.target.parentElement.parentElement.remove();
}

let displayTaskIcons = (template, iconsContainer) => {
    template.addEventListener('mouseover', function () {
        iconsContainer.firstElementChild.style.visibility = 'visible';
        iconsContainer.lastElementChild.style.visibility = 'visible';
    })
    template.addEventListener('mouseleave', function () {
        iconsContainer.firstElementChild.style.visibility = 'hidden';
        iconsContainer.lastElementChild.style.visibility = 'hidden';
    })
}

let editIconsHandler = (event) => {
    let input = event.target.parentElement.previousElementSibling;
    input.setAttribute('contenteditable', true);
    input.focus();
}
let closeIconsHandler = (event) => {
    console.log("object2");
    event.target.parentElement.parentElement.previousElementSibling.style.display = "block";
    event.target.parentElement.parentElement.style.display = "none";
}
let removeEditOptionFromLabels = (event) => {
    event.target.setAttribute('contenteditable', false);
}
let addCardBtnHandler = (event) => {
    let newTaskHeader = event.target.parentElement.previousElementSibling;
    if (newTaskHeader.value) {
        buildNewTaskTemplate(newTaskHeader, event.target.parentElement.parentElement.parentElement.previousElementSibling);
    }
}
let addNewTaskHandler = (element) => {
    element.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
            toggleModals(event.target.parentElement.previousElementSibling, event.target.parentElement);
        } else if (!event.target.value) {
            return
        } else if (event.keyCode === 13) {
            buildNewTaskTemplate(event.target, event.target.parentElement.parentElement.previousElementSibling);
        }
    });
}

let buildNewTaskGroupTemplate = () => {

    if (taskGroupNameInput.value) {
        let newHeader = $.createElement('header');
        let newh2 = $.createElement('h2');
        let newSpan = $.createElement('span');
        let newEditIcon = $.createElement('i');
        let newTrashIcon = $.createElement('i');
        let newCloseIcon = $.createElement('i');
        let newSecondVersionBtn = $.createElement('button');
        let newChildDivElem = $.createElement('div');
        let newInputElem = $.createElement('input');
        let newParentDivElem = $.createElement('div');
        let newFirstVersionBtn = $.createElement('button');
        let newAddIcon = $.createElement('i');
        let newGrandParentDivElem = $.createElement('div');
        let taskContainer = $.createElement('div');
        let newTaskTemplateGroupArticle = $.createElement('article');

        newTrashIcon.className = 'fa fa-trash-o';
        newTrashIcon.id = 'delete-group-icon';
        newEditIcon.className = 'fas fa-pen';
        newSpan.className = 'edit-delete-icons';
        newSpan.id = 'edit-delte-group-task';
        newh2.className = 'task-group-title';
        newh2.innerHTML = taskGroupNameInput.value;
        newHeader.className = 'task-group-header';

        newCloseIcon.className = "fa fa-close";
        newSecondVersionBtn.className = "add-card-btn";
        newSecondVersionBtn.innerHTML = 'Add Card';
        newChildDivElem.className = 'add-close-card';
        newInputElem.className = 'user-new-task-input';
        newInputElem.type = 'text';
        newInputElem.placeholder = "Enter a title for this card";
        newParentDivElem.className = 'add-task-btn1';
        newFirstVersionBtn.className = 'add-task-btn';
        newAddIcon.className = "fa fa-plus";
        newGrandParentDivElem.className = 'add-title';
        taskContainer.className = 'tasks-container';
        taskContainer.id = 'tasks-container-id';
        newTaskTemplateGroupArticle.className = 'task-group';

        // newTaskTemplateGroupArticle.style.height = '15em';

        newTrashIcon.addEventListener('click', removeTaskGroup);
        newEditIcon.addEventListener('click', editIconsHandler);
        newSecondVersionBtn.addEventListener('click', addCardBtnHandler);
        newCloseIcon.addEventListener('click', closeIconsHandler);
        newh2.addEventListener('blur', removeEditOptionFromLabels);
        newFirstVersionBtn.addEventListener('click', function () {
            console.log(newGrandParentDivElem);
            toggleModals(newParentDivElem, newFirstVersionBtn);
        });
        addNewTaskHandler(newInputElem);
        displayTaskIcons(newHeader, newSpan);

        newSpan.append(newEditIcon, newTrashIcon);
        newHeader.append(newh2, newSpan);
        newChildDivElem.append(newSecondVersionBtn, newCloseIcon);
        newParentDivElem.append(newInputElem, newChildDivElem);
        newFirstVersionBtn.append(newAddIcon);
        newFirstVersionBtn.append('Add a Card');
        newGrandParentDivElem.append(newFirstVersionBtn, newParentDivElem);
        newTaskTemplateGroupArticle.append(newHeader, taskContainer, newGrandParentDivElem);
        mainOfDOM.append(newTaskTemplateGroupArticle);

        taskGroupNameInput.value = '';
    }
}


let buildNewTaskTemplate = (title, taskContainer) => {

    let editIcon = $.createElement('i');
    let trashIcon = $.createElement('i');
    let newSpan = $.createElement('span');
    let newTaskH3 = $.createElement('h3');
    let newDivElem = $.createElement('div');

    editIcon.className = 'fas fa-pen';
    trashIcon.className = 'fa fa-trash-o';
    trashIcon.id = 'delete-task-icon';
    newSpan.className = 'edit-delete-icons';
    newDivElem.className = 'task-template';
    newDivElem.id = 'task-template-id';
    newTaskH3.innerHTML = title.value;
    newTaskH3.className = 'task-title';

    trashIcon.addEventListener('click', removeTask);
    editIcon.addEventListener('click', editIconsHandler);
    newTaskH3.addEventListener('blur', removeEditOptionFromLabels);
    displayTaskIcons(newDivElem, newSpan);
    title.value = '';

    newSpan.append(editIcon, trashIcon);
    newDivElem.append(newTaskH3, newSpan);
    taskContainer.append(newDivElem);
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    buildNewTaskGroupTemplate();
})

deleteTaskGroup.forEach(icon => {
    icon.addEventListener('click', removeTaskGroup)
});

editIcons.forEach(icon => {
    icon.addEventListener('click', editIconsHandler)
});

deleteTask.forEach(icon => {
    icon.addEventListener('click', removeTask)
});

showAddTaskModal.forEach(element => {
    element.addEventListener('click', function (event) {
        toggleModals(event.target.nextElementSibling, event.target);
    });
});

addNewTaskUserInput.forEach(element => {
    addNewTaskHandler(element);
});

addCardBtn.forEach(element => {
    element.addEventListener('click', addCardBtnHandler);
});

closeIcons.forEach(element => {
    element.addEventListener('click', function () {
        toggleModals(element.parentElement.parentElement.previousElementSibling, element.parentElement.parentElement)
    })
});

taskGroupHeader.forEach(element => {
    displayTaskIcons(element, element.lastElementChild);
});
taskTemplate.forEach(element => {
    displayTaskIcons(element, element.firstElementChild.nextElementSibling);
});

allTaskTitles.forEach(title => {
    console.log("object");
    title.addEventListener('blur', removeEditOptionFromLabels)
});
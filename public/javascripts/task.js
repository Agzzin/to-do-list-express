const setTagAsdone = async(event ,element, id) => {
    event.preventDefault();
    try {
        let headers = new Headers({'content-type': 'application/json'});
        let body = JSON.stringify({task: {done: element.checked}});
        let response = await fetch(`/tasks/${id}?_method=put`, {headers: headers, body: body, method: 'PUT'});
        let data = await response.json();
        let task = data.task;
        let parent = element.parentNode;

        if(task.done) {
            element.checked = true;
            parent.classList.add('has-text-success')
            parent.classList.add('is-italic')
        }else{
            element.checked = false;
            parent.classList.remove('has-text-success')
            parent.classList.remove('is-italic')
        }
    } catch (error) {
        console.log(error);
        alert('Tarefa ao atualizar a tarefa')
    }
}
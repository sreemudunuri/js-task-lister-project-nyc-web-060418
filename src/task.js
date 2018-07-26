taskId = 0
const tasks = []

class Task {
  constructor(description, priority, list){
    this.description = description
    this.priority = priority
    this.id = ++taskId
    this.listId = list.id
    // push the instance to tasks array
    tasks.push(this)
  }
}

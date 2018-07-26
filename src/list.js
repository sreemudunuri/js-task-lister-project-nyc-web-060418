listId = 0
const lists = []

class List {
  constructor(title){
    this.title = title
    this.id = ++listId
    // push the instance to lists array
    lists.push(this)
  }
}

import LinkedList from './linkedList.js'

const List = new LinkedList()

List.append(50)
List.append(54)
List.prepend(13)

console.log(List.head()) // 13

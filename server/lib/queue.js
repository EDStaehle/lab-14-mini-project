'use strict';


class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}




class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }

  enqueue(value) {
    let newNode = new Node(value);
    if (!this.front) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = this.back.next;
    }
    console.log('a new ticket was added to the queue')
  }

  dequeue() {
    if (!this.isEmpty()) {
      console.log('a ticket was removed from the student queue')
      let oldFront = this.front;
      this.front = oldFront.next;
      oldFront.next = null;
      return (oldFront.value);
    } else {
      throw new Error('Queue is empty.');
    }
  }

  peek() {
    if (!this.isEmpty()) {
      return this.front.value;
    } else {
      throw new Error('Queue is empty.');
    }
  }

  isEmpty() {
    return this.front === null;
  }
}
module.exports = Queue;

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
    this.length = 0;
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
    this.length += 1;
  }

  dequeue() {
    if (!this.isEmpty()) {
      let oldFront = this.front;
      this.front = oldFront.next;
      oldFront.next = null;
      this.length -= 1;
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

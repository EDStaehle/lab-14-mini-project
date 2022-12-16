'use strict';

class Queue{
  constructor(){
    this.data = {},
    this.helping = false;
  }
  store(key, value){
    this.data[key] = value;
    console.log('a new ticket was added to queue');
    return key;
  }
  read(key){
    return this.data[key];
  }
  remove(key){
    console.log('a ticket was removed from queue');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue;

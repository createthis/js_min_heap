module.exports = class MinHeap {
  constructor() {
    this.heap = []; // Array representation of the heap
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break; // Heap property satisfied
      }
    }
  }

  removeMin() {
    if (this.heap.length === 0) return null;

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return min;
  }

  heapifyDown() {
    let currentIndex = 0;
    const length = this.heap.length;

    while (true) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex !== currentIndex) {
        this.swap(currentIndex, smallestIndex);
        currentIndex = smallestIndex;
      } else {
        break; // Heap property satisfied
      }
    }
  }
}

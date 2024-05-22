const should = require('should');
const MinHeap = require('./min_heap.js');

describe('MinHeap', () => {
  let minHeap;

  beforeEach(() => {
    minHeap = new MinHeap();
  });

  describe('insert', () => {
    it('should insert values and maintain the min-heap property', () => {
      minHeap.insert(5);
      minHeap.insert(3);
      minHeap.insert(8);
      minHeap.insert(1);

      minHeap.heap.should.eql([1, 3, 8, 5]);
    });

    it('should handle inserting into an empty heap', () => {
      minHeap.insert(7);
      minHeap.heap.should.eql([7]);
    });
  });

  describe('peek', () => {
    it('should return null when peeking an empty heap', () => {
      should(minHeap.peek()).be.null();
    });

    it('should return the minimum value when peeking a non-empty heap', () => {
      minHeap.insert(5);
      minHeap.insert(3);

      minHeap.peek().should.equal(3);
    });
  });

  describe('removeMin', () => {
    it('should remove and return the minimum value', () => {
      minHeap.insert(5);
      minHeap.insert(3);
      minHeap.insert(8);

      minHeap.removeMin().should.equal(3);
      minHeap.heap.should.eql([5, 8]);

      minHeap.removeMin().should.equal(5);
      minHeap.heap.should.eql([8]);
    });

    it('should handle removing from an empty heap', () => {
      should(minHeap.removeMin()).be.null();
    });
  });

  describe('heapifyDown (internal)', () => {
    it('should restore the heap property after the root is removed', () => {
      minHeap.heap = [8, 5, 3];  // Manually set an invalid heap
      minHeap.heapifyDown();

      minHeap.heap.should.eql([3, 5, 8]);
    });

    it('should do nothing if the heap property is already satisfied', () => {
      minHeap.heap = [1, 3, 5];
      minHeap.heapifyDown();

      minHeap.heap.should.eql([1, 3, 5]); 
    });

    it('should restore the heap property for a larger, unsorted heap', () => {
      minHeap.heap = [10, 15, 20, 30, 40, 50];
      minHeap.heapifyDown();

      minHeap.heap.should.eql([10, 15, 20, 30, 40, 50]); // Heap property should be satisfied now
    });

    it('should heapify down for another specific heap', () => {
      minHeap.heap = [50, 20, 30, 10, 40, 35];
      minHeap.heapifyDown();

      function* inorder(a, i=0, depth=0) {
        if (i >= a.length) return;
        yield* inorder(a, i*2+1, depth+1);
        yield [a[i], depth];
        yield* inorder(a, i*2+2, depth+1);
      }
      function heapToString(a) {
        return Array.from({length: 32 - Math.clz32(a.length)}, (_, level) =>
          Array.from(inorder(a), ([val, depth], i) =>
            depth === level ? val : " ".repeat((val+"").length)
          ).join("")
        ).join("\n");
      }
      console.log('heap=');
      console.log(heapToString(minHeap.heap));
      minHeap.heap.should.eql([20, 10, 30, 50, 40, 35]);
    });
  });
});

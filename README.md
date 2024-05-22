# js_min_heap

This is a minHeap implementation in JS that I yoinked from the web somewhere while doing leetcode while
unemployed in early 2024. Later, I worked with various AIs (ChatGPT and others) and had them write some 
unit tests, which were interesting. It took ChatGPT a few tries and I had to lead it by the nose to get
the last test. I just thought I would save the work here.

## heapToString
Of interesting note in `min_heap.test.js` is a function called `heapToString()` that pretty prints the
heap as a tree. Example, this heap: `[20, 10, 30, 50, 40, 35]` becomes this string:

```
          20    
      10      30
    50  40  35
```

I found this useful when visualizing heaps.

# Run tests

```bash
npm install
npx jest min_heap.test.js
```

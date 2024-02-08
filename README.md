# Instructions

For this assignment, I coded a solution for task #1 and task #2.  I believe the desired output for task #3 is closely demonstrated in task #1, so I did not code that.

#### To display output from task 1, run

`$ npm run task-1`

_Note, there are 3 examples of output provided in the output for task 1_

#### To display output from task 2, run

`$ npm run task-2`

### Big O

- ASIN store operation and calculation assignment are each O(n) in time and space complexity.
- Sort operation will depend on the number of unique ASINs in the dataset.  My understanding is that in Chrome, `.sort()` is O(n log n).
- Interestingly, in this excercise there could very well be 1,000,000 reviews but only 500 unique ASINs, potentially adding only minimal complexity impact to O(n) overall.
- Overall Big O would be greater than O(n) up to O(n log n), depending on the number of unique ASINs.

### Opportunities

Some additional things we could do to improve upon the script:
 - Store static data like title, image outside of reviews data (unless a review is mapped to a 'title/image' at a point in time)
 - Output data as csv, including image url
 - Function to display output for each product row with flags to control fields to be displayed
 - Add the ability to specify a range of total reviews
 - Use library or function for cleaner/prettier console output instead of console.log()
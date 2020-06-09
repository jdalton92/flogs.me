The efficiency of algorithms, in computer science, can be described using **Big O notation**. Big O notation takes into account both the amount of time and the amount of memory use, referred to as _time complexity_ and _space complexity_ respectively. Big O notation is referred to with the following expression _O(f(n))_, where the function of n is the Big O complexity. Essentially, Big O notation is the worst-case scenario for an algorithms efficiency. This means that if the number of steps for an algorithm to run is noted by _n_, and governed by the following quadratic formula:

&nbsp;

<blockquote>
T(n) = 5n<sup>2</sup> − 5n + 10
</blockquote>

&nbsp;

The Big O notation for the above formula would be O(_n_<sup>2</sup>). This is because for a very large number _n_, the _n_<sup>2</sup> term of the formula will dominate, meaning the remaining terms _-5n + 10_ can be ignored. The coefficient of **n<sup>2</sup>** is also ignored in Big O notation, as it is not an absolute measure but more a purely mathematical concept. One way to visual this is to compare the following formula;

&nbsp;

<blockquote>
T(n) = n<sup>2</sup>
</blockquote>

&nbsp;

and

&nbsp;

<blockquote>
T(n) = 10n<sup>2</sup>
</blockquote>

&nbsp;

If we remove the scale from the graphs, then they would look the same. The Big O notation O(n<sup>2</sup>) would be the algorithmic efficiency for both these cases.

&nbsp;

Big O notation is an important concept to master in computer science, as algorithms form the base for many products and applications. There is almost multiple algorithms to solve a problem, and creating an algorithm that is more efficient in terms of memory use, and time, will lead to a better outcome for both end users and product owners. An example of where alogirthm efficiency is important is Google's search results. There are billions of websites that Google has indexed, and creating a highly efficient algorithm to sort these results is part of the reason why Google is so popular.

&nbsp;

## Common Big O Runtimes

&nbsp;

The below give examples of common Big O algorithm efficiencies, and gives a simplfied example script (in JavaScript). Each chart shows the time efficiency with growing _n_. Pay close attention to the y-axis scale, as many algorithms have similar shaped curves, however are very different efficiencies when you consider the y-axis scale.

&nbsp;

**O(1): Constant**

&nbsp;

```js
function compare(a, b) {
  if (a <= b) {
    return 1;
  }
  return 0;
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/jAlQK3Z.jpg" />

&nbsp;

The above algorithm does a constant amount of work for every number _a_, and _b_, meaning it takes _O(1)_ time

&nbsp;

**O(_n_): Linear**

&nbsp;

```js
function total(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }

  return total;
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/TJmcOIq.jpg" />

&nbsp;

The above algorithm takes _linear_ time, as for each increase in arr size _n_ will increase the number of steps by _n_

&nbsp;

**O(_n_<sup>2</sup>): Quadratic**

&nbsp;

```js
function total(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      total += arr[i];
    }
  }

  return sum;
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/DVE6u7q.jpg" />

&nbsp;

The above algorithm has two nested for loops that both loop _n_ times over the same array, meaning the total run time is _n_<sup>2</sup>.

&nbsp;

**O(_ab_): AB**

&nbsp;

```js
function total(arrA, arrB) {
  let total = 0;

  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrB.length; j++) {
      total += arrA[i] + arrB[j];
    }
  }

  return sum;
}
```

&nbsp;

The above algorithm has two nested for loops that loop _a_ times over array A, and _b_ times over array B, meaning the total run time is _ab_. This differs from _n_<sup>2</sup> runtime, as the array's may be different sizes.

&nbsp;

**O(log*n*): Logarithmic**

&nbsp;

```js
function log(n) {
  for (let i = 1; i < n; i *= 2) {
    console.log(i);
  }
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/rnurlO1.jpg" />

&nbsp;

The above script's time complexity is a proportion of the _log_ of the input size, meaning it has log*n* complexity. A more complex example of log*n* efficiency is the [binary search algorithm](https://en.wikipedia.org/wiki/Binary_search_algorithm)

&nbsp;

**O(*n*log*n*): Linearithmic**

&nbsp;

```js
function quickSort(list) {
  let pivot = list[list.length - 1];
  let listA = [];
  let listB = [];

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] < pivot) {
      listA.push(list[i]);
    } else {
      listB.push(list[i]);
    }
  }

  return quickSort(listA).concat(pivot).concat(quickSort(listB));
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/SEdNacF.jpg" />

&nbsp;

*n*log*n* time complexity is common in sorting algorithm's including [mergesort](https://en.wikipedia.org/wiki/Merge_sort) and [quicksort](https://en.wikipedia.org/wiki/Quicksort). A simple quicksort algorithm is demonstrated above

&nbsp;

**O(2<sup>_n_</sup>): Exponential**

&nbsp;

```js
function powerset(arr) {
  const results = arr.reduce((previous, element) => {
    const previousPlusElement = previous.map((el) => `${el}${element}`);
    return previous.concat(previousPlusElement);
  }, "");

  return results;
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/o3wOnlR.jpg" />

&nbsp;

The above algorithm returns all the possible subsets, or combinations of elements, of an array. For each extra element in the array, the output gets twice as long. This example has a time complexity that is referred to as _exponential_. These algorithms do not scale very well, as the complexity increases greatly with increases in input size.

&nbsp;

**O(_n_<sup>c</sup>): Polynomial**

&nbsp;

```js
function cube(n) {
  const arr = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        arr.push(i * j * k);
      }
    }
  }

  return arr;
}
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/8byWafG.jpg" />

&nbsp;

Polynomial runtimes are similar to what has already been demonstrated with _quadratic_ runtime example above. A quadratic runtime is essentially the same as a polynomial runtime to the second degree. The simplest example of a polynomial runtime is shown above, with each nested for loop runs through _n_ times, meaning the above example if O(_n_<sup>3</sup>). For every additional loop will add an additional number to the power of _n_. If there were 10 nested loops, then the Big O notation would be _n_<sup>10</sup>.

&nbsp;

**O(_n_!): Factorial**

&nbsp;

```js
function factorial (n) {
    let num = n;

    if (n === 0) {
        return 1;
    }

    for (let i = 0; i < n; i++) {
        num = n \* factorial(n - 1);
    };

    return num;
};
```

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/2jPAgcD.jpg" />

&nbsp;

Factorial algorithms are one of the most time expensive, for a large number _n_. The above function simply finds the factorial of a given positive integer _n_ and returns this number.

&nbsp;

# Conclusion

&nbsp;

The above time complexities are some of the most common referred to in computer science courses, and commonly queried in software engineering interviews. Further, there are many implementations to solve challenges faced by software engineers, and data scientists, and a strong grasp of the Big O notation of the solutions may enable more efficient outcomes with better performing software with less time and memory required.

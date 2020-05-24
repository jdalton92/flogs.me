A fundamental part of computer science, and programming, is the concept of data structures and algorithms. Many developers are very knowledgable on syntax and use-cases of their most commonly used libraries, however many miss the fundamental understanding of how methods, functions, and operations are implemented. First, a simple definitions of both key terms:

&nbsp;

**1. data structure:** refers to the way in which data is stored and then the data can be manipulated,or transformed, by _algorithms_ and _functions_

&nbsp;

**2. algorithm:** in computer science an _algorithm_ refers to a set of instructions that are used to perform a calculation. This is easy to be confused for the definintion of a _function_ which is used to implement the algorithm

&nbsp;

A summary of some of the most fundamental data structures and algorithms are summarised below.

&nbsp;
&nbsp;

# Data Structures

&nbsp;
&nbsp;

**- Linked List:** if you imagine a string saved in a computers memory. The string is interpreted as a word by the user if the letters are in a specific order. However, the letters are not going to be saved in the correct order in (heap) memory. A linked list will store the character in memory with meta data that points to the location of the next character in the string. Therefore, referring to the string will only require the location of the first character, as this will point to the second character, which points to the third, and so on. This structure is a simplified explanation of a _linked list_, as the items in the list are linked together

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/VN08B4G.jpg" />

&nbsp;

**- Binary Tree** a binary search tree orders data in such a way that enables a binary comparison when searching from the root of the tree, to the leaf. This means that with each level of the tree sorted results in the comparison skipping approximately 50% of the data. An example is shown below, where integers are sorted in an ordered fashion.

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/0X5MMe2.png" />

&nbsp;

Each level of the tree has the data sorted with the lesser amount on the left and greater amount on the right. Thi means each lookup, search, or deletion will be able to remove approximately 50% of the data for each level of the tree. This means the binary tree is complexity in Big O notation is O(log n). There is more information on complexity and Big O notation further below.

&nbsp;

**- Data Trie**

&nbsp;

**- Hash Table** a hash table is an unordered group of key-value pairs. The key's of the hash table are assigned an index (usually an integer), using a _hash function_, and the values stored are associated with a specific index. Hash tables are generally considered more efficient than other table alternates, and are commonly used in software programs such as database indexing, caches, and sets. A problem commonly encountered with hash tables, called collisions, where the hash function calculates an index that is already in use. There are multiple ways in which the collision problem is handled, with a simple example outlined below.

&nbsp;

A simple example is to store every word of a dictionary as a hash table. Each letter of the alphabet could be assigned an index, from 0 to 25, and each word starting with that letter could be organised in a linked list that is associated with the starting letter of the word. TO find a word, you simple go straight to the index of the first letter of the word, and then walk through the linked list until your answer is found.

&nbsp;

**- Min Heap:**

&nbsp;

**- Max Heap:**

&nbsp;
&nbsp;

# Algorithms

&nbsp;
&nbsp;

**Sorting Algorithms**

&nbsp;

**- Insertion Sort:**
**- Selection Sort:**
**- Bubble Sort:**
**- Merge Sort:**
**- Quick Sort:**
**- Heap Sort:**

&nbsp;
&nbsp;

**Searching Algorithms**

&nbsp;
&nbsp;

**- Binary search:**

&nbsp;
&nbsp;

TO DO

&nbsp;
&nbsp;

**Hashing Algorithms**

&nbsp;
&nbsp;

TO DO

&nbsp;
&nbsp;

**Matching Algorithms**

&nbsp;
&nbsp;

TO DO

&nbsp;
&nbsp;

# Algorithm efficiency

&nbsp;
&nbsp;

**O(1)**
**Constant**

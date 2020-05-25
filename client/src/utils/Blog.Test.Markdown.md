A fundamental part of computer science, and programming, is the concept of primitive data types and data structures. These form the basis of the most commonly used programming languages. With the increasing popularity of dynamically typed languages, such as Python and JavaScript, it is important to have a fundamental understanding of data before learning how to program. First, simple definition of both terms:

&nbsp;

**1. Primitive data type:** a basic building block of programming that is used to store data, and create more complicated data types

&nbsp;

**2. Data structure:** refers to the way in which data is stored and then the data can be manipulated, or transformed, by _algorithms_ and _functions_

&nbsp;

A summary of some of the most common primitive data types and structures is below:

&nbsp;
&nbsp;

# Primitive Data Types

&nbsp;

**- Character:** a _character_ is essentially the smallest building block of a writing system, such as a letter, number, punctuation mark, or whitespace.

&nbsp;

**- Integer:** an _integer_ is a whole number. Depending on how much memory is allocated to the _integer_, they may be restricted to a certain range. There are similar data types where more memory can be allocated for negative, or very large numbers.

&nbsp;

**- Float:** a _float_ is short for floating point number, and is represented by a decimal number. _Floats_ are generally more precise than an _integer_, however are still allocated a fixed amount of memory. For that reason, a _float_ will not equal the exact number required where the number extends more decimal places than the allocated memory. This is usually not an issue in theory, however, in practice for large volume calculations and applications that require exact results (eg. banking) a fundamental understanding of the limitations of _floats_ is very important.

&nbsp;

**- Boolean:** a _boolean_ can have two possible values, and is usually represented by _true_ and _false_

&nbsp;

**- Reference:** a reference refers to another variable, and may be simply imagined as an _alias_ for the variable it is referencing. This differs from the _pointer_ as the _pointer_ is a store of the location in memory of another variable. A _pointer_ can also be reassigned, where a _reference_ cannot

&nbsp;
&nbsp;

# Data Structures

&nbsp;

**- Record:** a record is a basic data structure that is easiest to visualise as a row in a database. A record can contain fields of different data types.

&nbsp;

**- Union:** a union can store a fixed amount of data types eg. character, integer, or float. While a union can have different values in its instance, it can only store one value at a time. This differs from a record that can store multiple types of values at once.

&nbsp;

**- Array:** an array is a data structure that stores items next to each other. In lower order languages, arrays are generally fixed in size, and to modify would require creating a new array.

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/rmUPP6l.png" />

&nbsp;

**- Object:** an object is similar to a record where it can contain data field's, however an object also contains various _methods_ that can be performed on the data. A _method_ defines the behaviour of the data within the object.

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/rmUPP6l.png" />

&nbsp;

**- Linked List:** if you imagine a string saved in a computer’s memory, the user will interpret the string as a word if the letters are in a specific order. However, the letters are not going to be saved in the correct order in (heap) memory. A linked list will store the character in memory with meta data that points to the location of the next character in the string. Therefore, referring to the string will only require the location of the first character, as this will point to the second character, which points to the third, and so on. This structure is a simplified explanation of a _linked list_, as the items in the list are linked together

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/VN08B4G.jpg" />

&nbsp;

**- Binary Tree** a binary search tree orders data in such a way that enables a binary comparison when searching from the root of the tree, to the leaf. This means that with each level of the tree sorted results in the comparison skipping approximately 50% of the data. An example is shown below, where integers are sorted in an ordered fashion.

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/0X5MMe2.png" />

&nbsp;

Each level of the tree has the data sorted with the lesser amount on the left and greater amount on the right. Thi means each lookup, search, or deletion will be able to remove approximately 50% of the data for each level of the tree. This means the binary tree is complexity in Big O notation is O(log n). There is more information on complexity and Big O notation further below.

&nbsp;

**- Hash Table** a hash table is an unordered group of key-value pairs. The keys of the hash table are assigned an index (usually an integer), using a _hash function_, and the values stored are associated with a specific index. Hash tables are generally considered more efficient than other table alternates, and are commonly used in software programs such as database indexing, caches, and sets. A problem commonly encountered with hash tables, called collisions, where the hash function calculates an index that is already in use. There are multiple ways in which the collision problem is handled, with a simple example outlined below.

&nbsp;

To store every word of a dictionary as a hash table, each letter of the alphabet could be assigned an index from 0 to 25, and each word starting with that letter could be organised in a linked list that is associated with the starting letter of the word. To find a word, you simple go straight to the index of the first letter of the word, and then walk through the linked list until your answer is found.

&nbsp;

**- Heap:** in the most simple form, a binary heap is conceptually similar to a binary tree, in the sense that the data is structured in a very similar way to a tree, however with 2 most common use cases being a _max heap_ and a _min heap_. A _max heap_ has the data ordered where each parent node has the key being of greater value than the child node. A _min heap_ is the opposite, where the child node is of greater value than the parent node. A simple heap

&nbsp;

<img class="blog-content-img-medium" src="https://i.imgur.com/nPoXzKS.jpg" />

&nbsp;
&nbsp;

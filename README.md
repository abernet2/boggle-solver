# boggle-solver

Prior to Dev Bootcamp, I took the Coursera Algorithms course and one of the challenges was to take an existing boggle board and create a solver class that finds all possible solutions from a given dictionary.

During Devbootcamp, one of my challenges was to build a boggle board and a method that can detect if a given phrase is in the board.This is basically my attempt to combine the two by writing the solver in ruby instead of java and by touching my original boggle board as little as possible.

Upon Graduation I ported the solver into Javascript. As I have been learning more and more about Javascript, I have repeatedly used this project as grounds for practicing new techniques and ideas such as modules, factory methods, curried functions and getter/setter methods.

## React

Originally I implemented the boggle board in React. I have since moved that to a react branch.

## No-React

In order to learn a little about requirejs and javascript modules I decided to remove all of the react and port everything back to non-react javascript. I also added tests in Jasmine for parts of my functionality.

A side effect has been figuring out ways to optimize using the DOM. The speed of highlighting is noticeably faster in React than in normal Javascript nad so it's been interesting to learn about the dangers of HTML collections and the like.

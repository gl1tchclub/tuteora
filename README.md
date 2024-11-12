# Tuteora
<img src="./Capture.PNG" width="100">

Tuteora - inspired by "Tutoring" and "ora" (well-being), reflecting the positive outcomes of learning.

Mobile app for students to connect with a tutor and book sessions in a more organized, streamlined fashion. 

## Online Resources Used
When making this app, I used the React Native documentation as well as documentation for Firebase, Expo, and community packages.

For generating random color, I used a line of code from [this source](https://css-tricks.com/snippets/javascript/random-hex-color/)

For starting my auth component and logic, I referred to this [github repo](https://github.com/nisha8c/ReactNative-FirebaseAuthentication), though I didn't end up using most of the code in the end.

I also referred to W3Schools, MDN Web Docs, and medium.com for assistance with basic JS concepts like Sets, array methods, and react hooks. I implemented Sets when changing arrays and array methods like filter, map, reduce, and forEach.

---

I used chatgpt to generate JSDoc header comments with the following prompt: 

"Please add jsdoc header comments to the top of each code file I will be sending you from now on. Do not add additional comments anywhere else. Just send the jsdoc comment. Dont worry about sending the whole code file back to me"

---

I asked chatgpt to help me figure out why my handleCreateSessionRequest function in CreateSession.jsx was executing the success content when it should've displayed an error message:

"When I press the create session button with fields missing, it executes the success code (lines 109 - 120) in the finally statement. The text component that renders the error message displays the error message correctly though and the handleCreate function doesn't call the createRequest function." 

The response was to create a local error message value within the function, to which I implemented.

---

I had trouble with getting the next session in Sessions.jsx, so I asked chatgpt to help find what error I made caused the issue:

"In my sessions.jsx component, I'm trying to store the session with the earliest date. I'm also trying to compare times when dates match, but when I print the variable, it isn't displaying the earliest session and is having trouble with comparison. I think it's because it's not being parsed correctly. What is the best way to parse the dates in my sessions and what is the best array method to use for this comparison? Please don't send me the complete working function and just suggest possible ideas/methods"

Chatgpt suggested making a parse datetime function to convert it to a Date object and use either reduce or for loop. I chose reduce as I wanted to learn something new, although a for loop would've provided better readability. I also asked chatgpt to provide the basic syntax for using reduce.

---

I wanted to display a specific error message in Auth.jsx when a Firebase error occurred i.e. providing invalid login details. I asked chatgpt how to use FirestoreError as I couldn't find helpful info on the Firebase docs: 

"I want to be able to display a different error message when there is a Firebase error. How do I do this in an if statement?"

Chatgpt sent ```js if (error instanceof FirestoreError) //... ``` along with an example switch case of all the possible errors that FirestoreError can throw. I didn't need a whole switch case as I only wanted to display "Invalid credentials" when a FirestoreError occurs. I just changed the condition in my finally if/else statement to ```js error instanceof FirestoreError```.
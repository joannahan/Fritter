Fritter 
==========

Fritter App deployed here: https://jmhan-fritter.herokuapp.com/


*Notes:*

Users must register first in the top right of the page. After registering, they are taken to the login page. Once logged in, a logout link appears in the top right, along with their fritter feed. 

The Fritter page has a Search button, a Get All button, and a Get All Following button. When searching for a specific username, a follow button will appear immediately after searching for the user. The Search button searches for a specific user's freets; the Get All button displays all freets by all users; the Get All Following button displays all the freets of those that the logged in user is following.  

Post a freet allows a user to post a freet onto the Freets Board.  

The Freets feed displays the freets from the users. There is a delete button on each freet to allow for deletion of the freet. The delete button only appears on freets that are the logged in user's freets. There is also a refreet button on each freet, allowing the logged in user to refreet other freets. The refreet button does not appear on the user's own freets. Once refreeted, the refreet appears on the top of the feed. The original freet is also updated with a list of users on the side that refreeted that freet. 


Dependency Graphs for Part 1 and Part 2 and the Fritter data model can be found in the root directory:
- FritterDependency.png (Part 1)
- Fritter2Dependency.png (Part 2)
- FritterModel.png (Data Model)


*Testing:*

Tested methods in freet and user models.



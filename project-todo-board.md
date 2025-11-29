# FIX

PROFILE:
- logout doesn't work
- delete profile or delete my data feature

GENERAL:
- rename scenario-intro to lobby



# IMPLEMENT

GAMEPLAY:
- Implement "Start Game" logic (transition from lobby to playing)
- Create the main gameplay view/component
- Sync game state (clues, progress) between players

GENERAL:
- translate to slovenian and german
- continue game on app restart


# TEST

PROFILE:
- check if the username is stored in firebase


# DONE

LOBBY:
- Verify "Host Game" creates a document in Firestore (DONE)
- Verify "Join Game" adds player to the document (DONE)
- Verify Role Selection updates the document (DONE) 

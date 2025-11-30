# FIX

PROFILE:
- logout doesn't work
- delete profile or delete my data feature

GENERAL:
- translate to slovenian and german
- continue game on app restart

GAME:
- fix setTimeout hack in onJoinGame() -> implement properly


# TEST


# FUTURE

ARCHITECTURE:
- Migrate critical game logic to Firebase Cloud Functions (Backend approach) for security and validation


# DONE

GENERAL:
- rename scenario-intro to lobby (DONE)

LOBBY:
- Verify "Host Game" creates a document in Firestore (DONE)
- Verify "Join Game" adds player to the document (DONE)
- Verify Role Selection updates the document (DONE) 

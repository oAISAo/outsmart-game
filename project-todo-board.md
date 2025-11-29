# FIX

PROFILE:
- logout doesn't work
- delete profile or delete my data feature

GENERAL:
- rename scenario-intro to lobby
  
GAME:
- fix setTimeout hack in onJoinGame() -> implement properly

FIREBASE:
- Restrict your API Key (Important):
  Since the key was briefly exposed, you should restrict it to prevent misuse:
  Go to the Google Cloud Console Credentials page.
  Select your project (outsmart-game).
  Click on the Browser key (auto-created by Firebase).
  Under Application restrictions, select HTTP referrers (web sites).
  Add your domains (e.g., localhost:8100, localhost:4200, and your production domain like outsmart-game.web.app).
  Click Save.



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

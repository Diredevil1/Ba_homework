<B>Ba_homework!!!</B>

Decided to add this readme so its a little bit clearer on couple of the decisions:

You can increase the amount of gifs in the code by increasing the amount of array objects there, I kept only 2 during dev as giphy api provides only 100 calls/hour, also feel free to use or replace existing api key with your own!

1. Question - you might be asking why there is no state management tool, when there was technical requirement?
    Answer - I decided not to use it, as there literally was no reason to, and to use just for the sake to use it went against my better judgment. If there WAS a good reason to use it, I will gladly take it to heart once I hear it ^^
2. Question - why the locked gifs move around in the grid and doesnt keep the same index?
    Answer - This point kind of goes against the sorting by import_datetime. As the fetch gets random gif it also contains random import_datetime, so in order to fulfil sorting requirement, I made this decision.

I think these 2 are the main ones you might wonder about and of course if anything else, feel free to let me know!

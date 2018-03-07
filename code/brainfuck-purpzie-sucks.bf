The following outputs 'Purpzie sucks!'
++++++++[>++++++++++<-]>.<++[>++++++++++<-]+++[>+++++<-]>+
+.---.--.++++++++++.<++[>----------<-]>+++.----.<+++++++[>
----------<-]>+.<++++++++[>++++++++++<-]>+++.++.<+++[>----
--<-]>.++++++++.++++++++.<++++++++[>----------<-]>--.

[-][ Begin comment.

Here's the same code but more in-depth.
++++++++[>++++++++++<-]>. add 80 to cell 2 ~ print 'P'
<++[>++++++++++<-]>       add 20 to get 100
<+++[>+++++<-]>++.        add 17 to get 117 ~ print 'u'
---.                      subtract 3 to get 114 ~ print 'r'
--.                       subtract 2 to get 112 ~ print 'p'
++++++++++.               add 10 to get 122 ~ print 'z'
<++[>----------<-]>       subtract 20 to get 102
+++.                      add 3 to get 105 ~ print 'i'
----.                     subtract 4 to get 101 ~ print 'e'
<+++++++[>----------<-]>  subtract 70 to get 31
+.                        add 1 to get 32 ~ print '(space)'
<++++++++[>++++++++++<-]> add 80 to get 112
+++.                      add 3 to get 115 ~ print 's'
++.                       add 2 to get 117 ~ print 'u'
<+++[>------<-]>.         subtract 18 to get 99 ~ print 'c'
++++++++.                 add 8 to get 107 ~ print 'k'
++++++++.                 add 8 again to get 115 ~ print 's'
<++++++++[>----------<-]> subtract 80 to get 35
--.                       subtract 2 to get 33 ~ print '!'

How this works:
We turn cell 2 into the ascii code for the letter we need.
Using cell 1, we can loop a few things to make the code shorter.
Then we just simply print cell 2 to get the letter.
Example of looping:

+++     Add 3 to cell 1. This is how many times it will loop.
 [      Begin loop.
  >     Move pointer to cell 2.
   +++  Add 3 to cell 2.
  <     Move pointer back to cell 1.
  -     Finally, subtract 1 from cell 1.
 ]>.    End loop, move pointer to cell 2, and print.

Condensed: +++[>+++<-]>.

When cell 1 reaches 0, the loop ends.
This results in the following cells:

0 9
^

We looped '+++' three times on cell 2, which results in 9.
The minimum number that can be looped that shortens code (or doesn't affect code length) is 15.

Character codes used here:
80 P, 117 u, 114 r, 112 p, 122 z, 105 i, 101 e, 32 space, 115 s, 117 u, 99 c, 107 k, 115 s, 33 !
]

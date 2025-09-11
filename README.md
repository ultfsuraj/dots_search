## Dribble Search

### [Live Link](https://dots-search.vercel.app/)

#### Open in Desktop, Click on the Link above search for 'li' (20 results) or 'ee' (5 results) or empty string '' (100) results.... to check how it works on different number of results

## optimization remaining

1. this works fine for around 60 results in one go. but then you will experience input delay when trying to switch tabs quickly. Carefully Implementing a virtual list for long list of scrollable results (taking results down to around 15 at a time, will result in no lag for large number of results data) along with the animations after user scroll is quite advanced, and will take considerable dev time.
2. debounce search -> cancel api request if no response yet but request sent for new query

(search for max 3 letters for better results, because dummy data isn't spreaded evenly)

Design issues:

1. it doesn't show what happens for large number of results (may take performance hit if cool animations are applied on large number of results)
2. for less than 6 results it kept a skeleton at the bottom
3. Didn't account for width, when both chats and lists are selected along with files and people in settings tab

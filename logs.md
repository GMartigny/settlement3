# Logs

I'll use this for to dump all my ideas and thinking process all along the development. This is not going to be pretty, but I hope it will help with saving history and explain my choices.


## 29/08/2023 The start

The other day, I couldn't sleep because I was too eager to start this project. I'm currently on the bus to Kuala Lumpur after a 10 months trip around the world. Honestly, I really miss development.
About 7 years ago (2016) I started to create my first ambitious game idea; [Settlement](https://github.com/GMartigny/settlement). Sadly, I abandoned it. It has become too difficult to maintain because of my lack of experience and outdated build technologies (Grunt).
In 2020, with some experience with Vue.js, I [revive the project](https://github.com/GMartigny/settlement2). However, I quickly give up again. Vue is not really made to create games. Fighting to bend it to my needs was tiring. Also, I guess the will was not really there.
So, third time the charm I hope. The goal will be to ship a working prototype as soon as possible to avoid scope creep like the first time. Secondly, I choose to create my own "game engine". I don't need anything complicated, and it will be more flexible this way. I also hope to learn a bit about JS framework creation.
Before coming back home, I will try to lay down all I need to do for a fun and engaging version 1 and gather some building material.

## 06/09/2023 Where to begin ?

After being settled in 😏, I can finally start the dev. Problem is, I have no idea where to go from here. My first task would be to create a simple, yet powerful enough view framework. I love Vue/Svelte one file component, but that would mean writing a template parser and I don't think that's a good idea. I'm more leaning onto a template string style component like React JSX. Then, the issue is how to make reference to a node inside the component.
Finally, the best solution was inspired by Vue [``h``](https://vuejs.org/guide/extras/render-function.html) function with some memoization to reduce unnecessary renders. 
Holy cow, [Nested vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) ? This allows me to easily style to a component using JS.
I add a simple event listener logic to top it off.
For now the code is still a mess, but with a better separation of concern, I think I'm on the right tracks.
Oh, and I quickly configured an eslint.

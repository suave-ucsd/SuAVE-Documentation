---
title: Adding static map layers
parent: Publishing surveys
nav_order: 5
---

# {{page.title}}

In version 2 of SuAVE, survey authors can add static map layers to the map view. These layers will be displayed below the dynamic layers representing SuAVE records. For example, in a SuAVE application showing researchers working on transboundary aquifers, the map can also show boundaries of such transboundary aquifers (see https://suave2.sdsc.edu/main/file=suavedemos_Transboundary_Aquifers_Research_Landscape.csv&view=map). Or, in a SuAVE applications showing trees in San Diego, the map can also show canoy polygons.

To add such static layers, you can create a map using Google My Maps (https://urldefense.com/v3/__https://mymaps.google.com/__;!!Mih3wA!AUr5yIdI7cIr0cT6rlh9lMQfNzwSJWf9oyWCK48f6LVzBrMbnK42hyHYwpPpQU0UbRePLVgIkqy5nX38le4Y$  ). Once the map is ready, share it such that anyone with the map link can view it. Then, once you creates a new SuAVE survey, start editing survey settings (Edit - Settings), and  paste in a link to the map or to the map layers. The link can be in one of three formats:
 - pointer to the MyMap map, e.g. https://urldefense.com/v3/__https://www.google.com/maps/d/u/0/embed?mid=1Fi77O_glgGeWVqq4Tlo9cIPJIq2kU0A&ll=8.65445187143855*2C10.794804500000055&z=2__;JQ!!Mih3wA!AUr5yIdI7cIr0cT6rlh9lMQfNzwSJWf9oyWCK48f6LVzBrMbnK42hyHYwpPpQU0UbRePLVgIkqy5nRN3Uph8$  
 - link to the same map as embedded in iFrame (as constructed by Google for embedding in web pages), e.g. <iframe src="https://urldefense.com/v3/__https://www.google.com/maps/d/embed?mid=1Fi77O_glgGeWVqq4Tlo9cIPJIq2kU0A__;!!Mih3wA!AUr5yIdI7cIr0cT6rlh9lMQfNzwSJWf9oyWCK48f6LVzBrMbnK42hyHYwpPpQU0UbRePLVgIkqy5nQEbu6xo$  " width="640" height="480"></iframe>
 - link to the MyMap itself, e.g. https://urldefense.com/v3/__https://www.google.com/maps/d/u/0/viewer?ll=0.04074742145755227*2C0&z=2&mid=1Fi77O_glgGeWVqq4Tlo9cIPJIq2kU0A__;JQ!!Mih3wA!AUr5yIdI7cIr0cT6rlh9lMQfNzwSJWf9oyWCK48f6LVzBrMbnK42hyHYwpPpQU0UbRePLVgIkqy5nXRelwG4$  


As always, try to make the static layers as small as possible, by simplifying geometries and removing attribute information that is not absolutely necessary. 
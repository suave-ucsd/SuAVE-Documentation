---
title: Static Map Layers in SuAVE
parent: SuAVE Bibliographic Network
nav_order: 1
---

# Static Map Layers in SuAVE

In version 2 of SuAVE, survey authors can add static map layers to the map view. These layers will be displayed below the dynamic layers representing SuAVE records. For example, in a SuAVE application showing researchers working on transboundary aquifers, the map can also show boundaries of such transboundary aquifers (see [here](https://suave2.sdsc.edu/main/file=suavedemos_Transboundary_Aquifers_Research_Landscape.csv&view=map)). Or, in a SuAVE applications showing trees in San Diego, the map can also show canoy polygons.


1. **Create the map**: Navigate to [https://www.google.com/maps/d/u/0/?hl=en](https://www.google.com/maps/d/u/0/?hl=en). Click on "CREATE A NEW MAP" in the top left. Name the map and the level fittingly.

2. **Import survey to map**: Make sure your dataset has a location identifier (Latitude and Longitude). Under your map layer, click "Import", and choose the spreadsheet of the dataset from your Google Drive. 

    1. Please make sure it is the dataset, not a downloaded version. This will allow the map and SuAVE gallery map to update automatically if more entries are added.

3. Click the bubble next to "Latitude", and click on "Latitude" when prompted to say whether you marked Latitude or Longitude. Repeat this for "Longitude". Next, click on "Name" (or whichever column is most relevant) to title the markers. This will populate the dataset on the map.

4. **Copy map**: Under "Share" click on "Anyone with a link can view", and copy the link.

5. **Add map to SuAVE Visualization**: Follow the normal steps for uploading a dataset to SuAVE. Once the visualization is done, navigate to the "Settings" of the survey. Click on "Map" under "Public View Options". Then, under "Overlay KML Link", link your map.

6. This will populate a SuAVE gallery with a static map, which can be seen by clicking "Map View" in the top right of the screen when viewing the visualization.



Beyond SuAVE, you can add these maps to web pages. You can  add the map by linking the map as embedded in iFrame (as constructed by Google for embedding in web pages), e.g. <iframe src="https://urldefense.com/v3/__https://www.google.com/maps/d/embed?mid=1Fi77O_glgGeWVqq4Tlo9cIPJIq2kU0A__;!!Mih3wA!AUr5yIdI7cIr0cT6rlh9lMQfNzwSJWf9oyWCK48f6LVzBrMbnK42hyHYwpPpQU0UbRePLVgIkqy5nQEbu6xo$ " width="640" height="480"></iframe>. You also have the option to directly embed the url to the map.

As always, try to make the static layers as small as possible, by simplifying geometries and removing attribute information that is not absolutely necessary.

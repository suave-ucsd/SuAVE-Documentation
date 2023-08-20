---
title: Share Different Views with Collaborators
parent: Main Workflows
nav_order: 8
---

# Share Different Views with Collaborators

When looking at a SuAVE visualization, you can look at the different view options by clicking the options in the top right corner. In order to share a specific view, follow these instructions.

1. Navigate to your SuAVE Visualization.

2. Copy the url.

   1. The url should look something like this: 

      > suave-net.sdsc.edu/main/[SURVEY INFO]&view=grid

3. Change the url from &view=grid to &view=[new_view_option]
   1. You can choose from the following: Grid, Bucket, Crosstab, Map, Table, List, Network, Heatmap, QCA, R, Jupyter, Netvis
      - You need to enable some of these viewing options. To do this, go back to gallery view of all SuAVE visualizations, click "Edit" under the visualization, then "Settings", and then under "View Options", select the viewing options you want to enable.
      - Some of these views require additional files. For example, Netvis requires a Netvis .json file. Be sure you have all the necessary files for the viewing option.
   3. Your url should look something like this now:

      > suave-net.sdsc.edu/main/[SURVEY INFO]&view=[new_view_option]

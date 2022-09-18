---
title: Finding Images for your Survey
parent: Publishing surveys
nav_order: 5
---

# {{page.title}}

Sometimes you start a survey from a spreadsheet and then need to find appropriate images for each record in the spreadsheet. One method is to use Google or Bing search by keywords that reflect the content of each record. This is rather tedious and time-consuming. Alternatively, you can create a file with a list of search strings (as a CSV file), and loop over this list, feeding the search strings to Bing image search. A sample Jupyter notebook to do this search is available at .

The Jupyter notebook will generate a copy of the original spreadsheet with the search strings, with the added #img column. If the original file is called abc.csv, the resultant CSV file will be called "abc_processed.csv". In addition, a folder with the download images will be created.

Of course, such a search does not guarantee that the discovered images are a perfect match to the content of your spreadsheet. You may have to tweak the search strings, and/or download some images manually. 



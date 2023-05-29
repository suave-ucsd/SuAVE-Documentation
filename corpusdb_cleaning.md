---
title: CorpusDB Dataset Cleaning
parent: Data Generation and Filtering Using CorpusDB
nav_order: 4

---
# CorpusDB Dataset Cleaning

1. Go to [https://suave-net.sdsc.edu](https://suave-net.sdsc.edu).
2. Enter the username and password.
3. Click on "New Survey".
4. Appropriately name the dataset and, under 'Upload CorpusDB Zip File', upload the **.zip** file of the dataset you previously downloaded.
    - When creating the dataset and downloading it, you will have downloaded a folder with 3 files. Please create a .zip file with these three items and upload them as directed above.
5. Next, navigate back to [https://corpus-db.sdsc.edu](https://corpus-db.sdsc.edu). 
6. Again, fill in your login credentials to [https://suave-net.sdsc.edu](https://suave-net.sdsc.edu). 
7. Navigate to 'Curation'.
8. Select the dataset you want to clean. After selecting the dataset, click 'Select or Upload Survey' above the list of datasets.
9. If you would like to edit some values in a row or delete the row all-together, click on the row. Then, scroll to the bottom on the page. When you are done making your edits, click on 'Save Changes'. If you want to delete the row, click 'Delete Row'. To not commit the changes, clikc 'Close' instead.
10. If you would like to remove Non-Latin characters in all cells, select 'Remove Non-Latin (ISO/IEC 8859-1)'.
11. Sometimes, the Corpus-DB dataset generation will have multiple rows for the same individual. To consolidate the rows such that it is one row per person, do the following steps:
    - First, click on 'Match Duplicated Name' or 'Match Duplicated Name/Afil' depending on your preference. If you want to merge rows with the same name, click on 'Match Duplicated Name'. If you want to merge rows with the same name and affiliation (more selective option), click on 'Match Duplicated Name/Afil'.
    - After clicking on this, scroll to the bottom of the page to see the possible duplicates. Either select the the checkbox next to the rows to merge (if there is an issue with merging of rows when you do not want to) or 'Select All'. Click 'Merge' on the bottom left of the screen.
    - Now, clck on 'Fuzzy Match Name'. This will further merge rows.  Scroll to the bottom on the page again. For each fuzzy match, either click on 'Select All and Merge', select some of the rows and click 'Merge Selected', or 'Skip to Next' based on your preferences. You also have the option to select with row the rows will merge into under 'Choose item into which others will be merged'; it is automatically set to 'Auto'. If you would like to change this, click the button you want the rows merged into, where they are in the format 'CI {row number}'.
    - 

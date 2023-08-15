---
title: Curate Network Files
parent: SuAVE Bibliographic Network
nav_order: 3
---

# Curate Network Files

You will need OpenRefine to curate network files. If you do not already have it, you can download it here: [https://openrefine.org](https://openrefine.org).

The goal of the curation process is to unify author names such that all records for the same person have identical spelling (ideally, as full a name as possible: with spelled out first name and perhaps middle name(s) as well), while different people would have different spelling. 

Once that is done, 

1. Load the csv file from corpus-db in OpenRefine
2. Click "Create Project" based on this file and give it a name
3. Click the arrow next to Name, and choose Edit cells – Cluster and Edit
4. Work through the found clusters and unify the names, by placing checkmarks under the Merge? column. If you need to change the assigned name from the one suggested by OpenRefine, click that name or type in your preferred option. Try to have them in the form of First name followed by Last name, for consistency.
5. Click Merge Selected and re-cluster once you are worked through all suggested clusters.
6. Experiment with other methods and keying functions to unify as many records as feasible. When you use n-Gram fingerprint, make sure you experiment with n-Gram size of 1 as well.
7. If in doubt, click “Browse this cluster”. To return to the previous mode, click Reset All.
8. If you notice records that should be clustered but not found by the program, edit Name in one of them to match the other, and they recluster.
9. Remove records with names such as Anonymous, Author, and et al.,For this, select Name – Facet – text Facet, navigate to such abnormal entries, and click “include”. Then under All, select Edit Rows – remove matching rows.
10. Split the name into first name and last name, and run clustering on the last names only.
    1. Edit column – Add column based on this column: specfy columnname such as “Lastname”, select “copy value from original column”, and enter value.split(" ")[-1] as expression
    2. Cluster on the last names, but this time open each cluster and only merge if other fields look matching. If not, just close this browser tab and move to the next cluster
    3. If there are matches, the best option would be to Edit cell values such that the values under Names are matching, then click Apply
11. Finally, facet on LastName and manually go over the facets that have more than 2 values. Sort by count to do this. Click on each cluster (the cluster name will turn red) to see the records included in it and edit them as necessary. Click on the cluster again to deselect it. If you need to edit the entire name in the cluster, click Edit. Once done, remove the LastName column (edit column – remove this column)


Make sure that when you save the file, it is saved in UTF-8 encoding.





Part 2. Run the script to merge the reconciled records.

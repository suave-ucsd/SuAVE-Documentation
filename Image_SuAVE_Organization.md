---
title: Organizing Images for SuAVE Galleries
parent: SuAVE Bibliographic Network
nav_order: 2

---

# Organizing Images for SuAVE Galleries

To obtain the best searches for images for each name in a dataset, first run the code in "Generating Images for SuAVE Bibliographic Network".

Once you have run that, add this to the end of the code:

>     best_search = []
>     for i in range(len(names)):
>         to_add = {}
>         to_add[names[i]] = list(final_results[i].keys())[0]
>         best_search.append(to_add)
>     best_search

This will return a list of dictionaries, where the xth dictionary corresponds to the xth person in the dataset, where the dictionary follows this format: {name: best search for image}.

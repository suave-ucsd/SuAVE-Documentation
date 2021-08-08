---
title: Data views
parent: Key Concepts
nav_order: 4
---

# {{page.title}}

# SuAVE Data Views

Survey data in SuAVE can be shown as several types of interactive data views. Data views currently include:

1. Grid view
2. Bucket (bar chart, histogram) view
3. Cross-tab view
4. QCA (Qualitative Comparative Analysis)
5. Map view

Survey publishers decide which views to make available in a specific  application. Users can switch between the views by clicking respective  view icons (at the top right of the screen.)

Further survey publishers decide which of the views should be the  default one. Views 1-3 and 5 can be setup as initial views to be shown  when SuAVE loads the data.

In addition, the icons at the top right would let the user invoke  integrations that provide gateways to additional analysis. These  include:

1. R integration
2. Jupyter notebook integration

Which views or integrations to show in an application can be also controlled in SuAVE survey URLs. In the “**views**” parameter in the survey URL, “1”s mean that the respective view is  included, and “0”s mean that the view is excluded. For example, URL  parameter

```
views=1110101
```

means that the following views will be included: 1. Grid; 2. Bucket; 3. Cross-tab; 5. Map; 7. Jupyter.

An additional “**view**” parameter in the URL specifies  which view will be the default one when users open the SuAVE  application. This parameter can have a value grid, bucket, crosstab, or  map. For example:

```
view=grid
```

in this case, the default view is “grid”. Other options are “bucket”, “crosstab”, and “map”.
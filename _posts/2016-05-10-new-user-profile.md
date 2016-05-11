---
layout: post
title: New User Profile & Other Site Updates
---

Today marks 6 months since PeakBucket <a href="http://blog.peakbucket.com/hello-world" target="_parent">went live</a>, and we're excited to ship the first major update to the site. Here's a rundown of what's changed:

- - -

## User Profile

The lion's share of this update is an overhaul of the <a href="http://www.peakbucket.com/users" target="_parent">user</a> profile. There are still two primary sections; however, we've added a few new features to the Log section and renamed the Views section to Stats, reorganizing it to eliminate the dropdown:

![Top Selections](/images/new_user_profile/top_selections.jpg "Old vs. new user profile selections")

Before giving you an overview of the new Log and Stats sections, we want to introduce two important additions to the user profile.

### Date Selectors

In the old user profile, the Log section always displayed a heat map of summits for the last 365 days above a table of activities for all time, while the Views section defaulted to the last 30 days but could be changed with a slider. We received feedback from a few users (thank you!) asking for a way to customize the Activity Log heat map in addition to a means of changing the date range that was not a slider. As a result, we've introduced the date selector dropdown, which lets you choose between three different date selector components:

![Date Selectors](/images/new_user_profile/date_selectors.jpg "Date selector dropdown and components")

The new user profile defaults to the last 365 days in both the Log and Stats sections; however, you're able to change the date range anytime by using one of these selector components. The **Presets** component enables you to choose from predefined date ranges by days, month, year or all time. The **Picker** component enables you to pick exact start and end dates for a custom date range. Finally, the **Slider** component lets you click and drag start and end dates within the current date range, just like before. When you make a date range selection using any of these components, it applies to both the Log and the Stats section so they're always in sync.

### Peak Search

Another area of user feedback focused on having a means of searching for peaks within activities. Therefore, we've introduced the peak search icon, which will open an input in which you can search and select multiple peaks within the current date range:

![Peak Search](/images/new_user_profile/peak_search.jpg "Peak search input and selections")

When a peak search selection is made, you'll see a gray pill containing the peak name appear. Similar to date range selections, peak search selections apply to both the Log and the Stats section. To remove a peak search selection, click the pill with the peak name you'd like to remove.

### Log Section

The new Log section looks a lot like the old one, but with a number of new features. Here are a few of the highlights:

#### Heat Map

The Activity Log heat map will now reflect the current date and peak search selections, and can display activities, summits, distance, elevation or duration:

![Activity Log Day Heat Map](/images/new_user_profile/activity_log_heat_map_days.jpg "Activity log heat map by day for the last 365 days")

![Activity Log Year Heat Map](/images/new_user_profile/activity_log_heat_map_years.jpg "Activity log heat map by year for all time")

#### Table Sorting

You can now sort the Activity Log table by date, summits, distance, elevation gain or duration:

![Activity Log Table Sorting](/images/new_user_profile/activity_log_table_sorting.jpg "Activity log table sorting")

#### Click For Activity Details

Click on a row in the Activity Log table to see the details for an activity:

![Activity Details](/images/new_user_profile/activity_click_details.jpg "Activity details")

### Stats Section

The Views section, which used to have a dropdown, has been renamed Stats and now has Activity and Peak subsections:

![Stats Sections](/images/new_user_profile/stats_sections.jpg "Activity and peak stats sections")

#### Activity

The activity stats section contains a highlights section, a trends section, which can display activities, summits, distance, elevation and duration, in addition to a sortable activities table, below which you can extract your activity data when you're logged in.

![Activity Stats Trends](/images/new_user_profile/activity_stats_trends.jpg "Activity stats trends")

#### Peak

The peak stats section contains a highlights section, a location section, which can display peaks by continent, country and state, in addition to a sortable summits table, below which you can extract your peak data when you're logged in.

![Peak stats location](/images/new_user_profile/peak_stats_location.jpg "Peak stats location")

### Future Enhancements

There's more to come for the user profile, including filters for peak elevation, distance, location and more so stay tuned.

- - -

## Activities

<a href="https://peakbucket.com/faq#what-is-an-activity" target="_parent">Activities</a> are the foundation of the PeakBucket platform, and we're happy to introduce the following changes with this update:

### Comments

Several users requested the ability to add comments with an activity, and now you can:

![Activity Comments](/images/new_user_profile/activity_comments.jpg "Activity comments")

### Submit & Cancel Button Positioning

A number of users felt that the submit button should be the rightmost button when adding or editing an activity, and now it is:

![Activity Submit & Cancel](/images/new_user_profile/activity_submit_cancel_buttons.jpg "Activity sumbit and cancel button positioning")

### Confirm Cancel

We understand that entering all of the data for an activity and then accidentally hitting cancel can be frustrating (we do it to from time to time). So we've added a confirmation prompt if you hit cancel after entering data for a new activity:

![Activity Confirm Cancel](/images/new_user_profile/activity_confirm_cancel.jpg "Activity confirm cancel")

### Identify Activity Being Deleted

Deleting an activity can be serious business, especially if you accidentally delete the wrong one. So we've added identifying details about the activity being deleted to help you verify that it's the right one before hitting delete:

![Activity Identify On Delete](/images/new_user_profile/activity_identify_on_delete.jpg "Identify activity being deleted")

- - -

That's it for major changes. As you can see, a number of the changes in this update were the result of user feedback, so don't hesitate to <a href="https://peakbucket.com/contact" target="_parent">contact us</a> if there's a feature you'd like to see on PeakBucket. Additionally, we're already hard at work on the next update to the site, so be sure to check back here soon!

– Colin & Max

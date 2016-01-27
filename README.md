The Calorific App

Calorific allows the user to track calorie intake, either through the built in JSON database(foods.json, obtained from the USDA website-public domain), or via a feature that allows the user to create custom dishes. This allows the user the ability to add entire meals, with custom serving types and sizes. Everthing the user enters is saved in local storage, the "historySet" contains "sets" which are objects containing that days date, goal, calories burnt through exercise, a running tally of all calories consumed, and an array of foods consumed. Food consumed are stored as objects as well, with each one containing caloric values, serving types(measure), size, and number of servings.

```js
var test = 10;
```
There are 4 tabs, Dash, Lookup, History, and Favorite Meals.

Dash is a quick view of the current day's calorie stats. A goal, calories consumed, calories burnt, and net calories are displayed here. Under that, there is a list of everything consumed that day.

The lookup page is a massive list of foods from the USDA database. I couldnt find one for ireland or the UK (As an american I'm not sure where to look), as such, there are a fair number of american products that may be unfamiliar. It's more of a proof of concept of something I wanted to try. The user can tap the green plus to add N number of servings using the popup displayed.

The history tab shows everything that has been entered by the user, as well a tally of each day's calorie values. The bar is green if the user achieved their goal, and red if not. A blue bar is displayed if no goal was set.

Favorite Meals allows the user to create custom entries for meals they commonly eat. This makes up for any shortcomings of the database in the lookup tab.



The history service is the primary service behind the model, it has getters and setters for historySet, and it's sets. Data input from the user is primary done with popups in each page's controller. Every time a set is changed, the historySet value in local storage is updated for data persistence.

The historySet that stores everything looks a bit like this:

historySet-----set: {date: dd/mm/yyyy, totalCals: ##, goal: ##, spent: ##, totalCals:## foods:[{name:"XXXXX", calories:##, measure:"XXXXX", servings: ##}]}
				|
				|--set: {date: dd/mm/yyyy, totalCals: ##, goal: ##, spent: ##, totalCals:## foods:[{name:"XXXXX", calories:##, measure:"XXXXX", servings: ##}]}
				|
				|--set: {date: dd/mm/yyyy, totalCals: ##, goal: ##, spent: ##, totalCals:## foods:[{name:"XXXXX", calories:##, measure:"XXXXX", servings: ##}]}

	

The FavsService handles the storage of custom menu items. These are smaller simpler versions of the foods that are entered through the lookup tab, but have the minimum amount of fields to work with the app.  

The food service serves the USDA database.

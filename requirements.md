_Vision of this Product_
1. A visually stimulating product—chocolate for the eyes—for logging your past trips and planning your future ones. 
2. \[empty].

_The Pain Point_
1. This product puts all of your travel-related notes, thoughts, packing lists, and experiences all in one place. 
2. This product is an aesthetically pleasing, one-stop “shop” for the key bits of information related to places you’ve been, places you are, and places you hope to be. 
3. When you need to remember where you’ve been (and, perhaps, what you did there), this product will show you and the friends you’re bragging to. 

_The Problem Domain_
1. Because of COVID, we can’t currently travel abroad.
2. This app allows us to reminisce about the traveling we’ve done and plan our next trip, whenever that may be. 
3. A visual country counter to show off when you’re bragging about your collection. 

_Why Should We Care about Your Product?_
1. Because you’re a friend or a family member of ours.
2. Because you can access reliable, pithy, and useful travel info in one place, instead of having to scour the internet yourself.
3. Because you can store your own notes, packing lists, thoughts, and places visited in one place. 

_Scope (in/out)_
1. In: what your product will do?
	* provide users the ability to save a list of places they’ve visited with a link to those places’ info page;
	* provide users the ability to search cities throughout the world by name, posting brief information, several pictures, and the current weather of each city;
	* provide users the ability to create personalized packing lists and notes for specific locations;
	* provide users with information about the safety of traveling to those locations;
	* provide users with information about the top diversity-loving destinations;
2. Out: what your product will not do?
	* make toast;
	* allow users to view or make bookings (e.g., airline, hotel, museum, excursions);
	* provide access to user-to-user interaction, ratings, or commentary by non-proprietary users.

_Minimal Viable Product (MVP)_
1. Functionality
	* Search location by city/country name. (LocationIQ API for lat and lon; or Google Places).
	* Save locations visited; sort that list alphabetically and geographically. (Database.)
	* Provision of the most salient facts about a location. (Google Places API.)
	* Provision of photographs of locations. (Google Places API or Unsplash or something else.) 
	* Add to and delete from a list of places to be visited in the future (wishlist). (Database.)
	* Add to and delete from a checklist on a location’s page for things to pack. (Database.)
	* View a page of information about the top diversity-loving destinations.
2. Stretch Goals
	* Each location shows its current weather.
	* Each location links to a travel advisory page.
	* A translator and/or phrasebook for each location. 
	* Provide information about whether Uber works in the location (API).
	* Add a map of the destination from the Google Places API.
	* Map a trip out.
	* A trips page that would show you a whole itinerary, whether visited or planned.

_Data Flow_
1. Homepage
	* Search field: city+country
	* Country-counter link
	* Wishlist link
	* Link to diversity page

2. Location Page
	* Picture/pictures
	* City info
	* Packing list
	* Notes/journal
	* Dates visited (ability to add additional)
	* (Link to country info)
	* (Map or link to map)
	* Link to travel advisory
	* Link to save location to visited or wishlist
	* Link to home
	* (User-added photos)

3. Country counter / Places visited [Stamped]
	* List of places visited, each linked to their location’s page.
	* Dates visited. (Calendar picker = stretch goal.)
	* Order by geography (by country), by date visited, alphabetically.
	* nav bar.
	* (Map with pins of where you’ve been.)

4. Wishlist
	* List of places to visit, each linked to their location’s page.
	* Ability to order and reorder by priority / country / date. 
	* (Group the locations into a trip.)
---
(Stretch)
5. Advisories Page
	* Modal that pops up over the location’s page
	* (Or a link to the State Department’s page?)

7. Diversity Page
	* Likely just links
	* (Goal: start a RESTful API.) 

_Non-functional Requirements_
1. Security: none required, because we’re not authenticating users. 
2. Usability: how intuitive to navigate; tabbing priorities; alt text.
3. Testability: does the app work? 

_Audience_
1. Veteran and would-be travelers who, in the age of COVID, find themselves reminiscing about where they’ve been and dreaming about where they’ll go.
2. The authors’ academic cohort, friends, and family.

# BackRental Car App

Description
Rental Car App is a web application for searching, booking, and confirming car rentals online. Built with React, Redux, Vite, Axios for asynchronous requests, and React Hot Toast for user notifications.

Design mockup: Figma

Car API documentation: GoIT Car Rental API

Custom backend for orders: GitHub Repository (routes for orders implemented; documentation coming soon)

Routes & Pages
Route Page Description
/ HomePage
/catalog CatalogPage
/catalog/:carId Car Details Page with BookingForm
/favorites FavoritesPage
/orders OrdersPage
/orders/:carId/:orderId Order Details Page
/orders/:carId/:orderId?token=... Confirm Order Page

- NotFoundPage
  Key Features
  Search cars by brand, price, and mileage

View detailed car information

Book a car via form

Confirm booking via email token

View active orders

View order details

Async requests with loader indicators

Toast notifications for user feedback

App Structure

1. **Home Page** (/)
   Banner with call-to-action

Navigation buttons (Catalog, Home) always visible in header

2. **Catalog Page** (/catalog)
   Displays all available cars

Backend-powered filtering by:

Brand

Price

Mileage (with validation: "to" must be ≥ "from")

Reset filters button appears after first search

Favorites functionality (stored in Redux + persisted via Redux Persist)

"Read more" button navigates to car details

"Load More" button fetches additional cars (pagination via backend)

Loader shown during async operations

3.** Car Details Page** (/catalog/:carId)
Car photo, specs, accessories

Booking form

Booking triggers email with confirmation token

Unconfirmed orders are not processed until confirmed

Loader shown during data fetch

4. **Favorites Page** (/favorites)
   Displays list of favorited cars

5. **Orders Page** (/orders)
   List of all orders with status

Button to view order details

6. **Order Details Page** (/orders/:carId/:orderId)
   Displays full order info

Reuses layout from car details, but replaces booking form with order info

7. **Confirm Order Page** (/orders/:carId/:orderId?token=...)
   Same as order details page, but includes "Confirm Order" button if token is present

Clicking the button sends confirmation request to backend

Status updates to "confirmed" upon success

8. **Not Found Page** (\*)
   Shown for invalid URLs

Redirects to home after 5 seconds

Components
BookingForm — car booking form

OrderDetails — order info display

ImgCar, SectionBase, SectionConditions, CarSpecifications, CarAccessories — car detail blocks

FilterPanel, FilterSelect, FilterInput, ClearFiltersButton — filtering UI

Loader — loading indicator

Demo
Live Demo on Vercel

Installation
bash
git clone <repository-url>
cd rental-car-app
npm install
npm run dev

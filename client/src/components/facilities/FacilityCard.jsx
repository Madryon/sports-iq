import React, { useState } from 'react';

export default function FacilityCard({ facility }) {
  const [booked, setBooked] = useState(false);

  if (!facility) return null;

  const {
    id,
    name,
    sport,
    sportIcon = '🏟️',
    city,
    address,
    location,
    hours = '06:00 AM - 10:00 PM',
    priceRange = '₹500 - ₹1,200 / hr',
    rating = 4.7,
    reviewsCount = 42,
    amenities = ['Floodlights', 'Parking', 'Locker Room', 'Equipment Rental'],
    photos,
    image = (facility.photos && facility.photos[0]) || facility.image,
  } = facility;

  const displayLocation = typeof location === 'string'
    ? location
    : location?.address || (location?.city ? `${location.city}${location.state ? `, ${location.state}` : ''}` : null) || (city ? (address ? `${address}, ${city}` : city) : 'City Center');

  const handleBooking = (e) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/70 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between">
      {/* Top Media / Header */}
      <div className="relative h-44 bg-gradient-to-br from-blue-700 via-indigo-800 to-gray-900 text-white p-4 flex flex-col justify-between">
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
        ) : null}

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20">
            <span>{sportIcon}</span>
            <span className="capitalize">{sport || 'Multi-Sport'}</span>
          </span>

          <div className="inline-flex items-center gap-1 bg-amber-400/90 text-gray-950 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
            <span>★</span>
            <span>{rating}</span>
            <span className="text-gray-700 text-[10px]">({reviewsCount})</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <h3 className="text-lg font-bold text-white drop-shadow-sm leading-snug">{name}</h3>
          <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{displayLocation}</span>
          </p>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Key Info items */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{hours}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{priceRange}</span>
            </div>
          </div>

          {/* Amenities tags */}
          {amenities && amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60">
          <button
            type="button"
            onClick={handleBooking}
            className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 focus-ring ${
              booked
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow'
            }`}
            aria-label={`Book or enquire about ${name}`}
          >
            {booked ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Enquiry Sent!
              </>
            ) : (
              <>
                <span>Book / Enquire</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

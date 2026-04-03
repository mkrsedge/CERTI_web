export const DEFAULT_BOOKING_URL = 'https://calendar.app.google/bBPikunCZbbzPqVHA'

export const getBookingUrl = () => process.env.NEXT_PUBLIC_GOOGLE_SCHEDULER_URL || DEFAULT_BOOKING_URL

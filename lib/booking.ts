export const DEFAULT_BOOKING_URL = 'https://calendar.app.google/UXF4r9RFoiR8kP8L8'

export const getBookingUrl = () => process.env.NEXT_PUBLIC_GOOGLE_SCHEDULER_URL || DEFAULT_BOOKING_URL

// src/lib/calendar-integration.ts
// Calendar integration using NeonDB

import { executeQuery, executeCommand } from '@/lib/neon/client';

// Calendar integration types
export interface AvailabilitySlot {
  id: string;
  start: Date;
  end: Date;
  available: boolean;
  duration: number;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone?: string;
  service: string;
  duration: number;
  preferredDate: Date;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  attendees: string[];
  description?: string;
}

// Calendar integration functions
export async function createCalendarEvent(eventData: CalendarEvent) {
  try {
    await executeCommand(
      'INSERT INTO calendar_events (title, start_time, end_time, attendees, description) VALUES ($1, $2, $3, $4, $5)',
      [
        eventData.title,
        eventData.start.toISOString(),
        eventData.end.toISOString(),
        JSON.stringify(eventData.attendees),
        eventData.description || ''
      ]
    );
    console.log('Calendar event created:', eventData);
    return { success: true };
  } catch (error) {
    console.error('Calendar event creation error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateCalendarEvent(eventId: string, eventData: Partial<CalendarEvent>) {
  try {
    await executeCommand(
      'UPDATE calendar_events SET title = $1, start_time = $2, end_time = $3, attendees = $4, description = $5 WHERE id = $6',
      [
        eventData.title,
        eventData.start?.toISOString(),
        eventData.end?.toISOString(),
        eventData.attendees ? JSON.stringify(eventData.attendees) : null,
        eventData.description,
        eventId
      ]
    );
    console.log('Calendar event updated:', eventId, eventData);
    return { success: true };
  } catch (error) {
    console.error('Calendar event update error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    await executeCommand('DELETE FROM calendar_events WHERE id = $1', [eventId]);
    console.log('Calendar event deleted:', eventId);
    return { success: true };
  } catch (error) {
    console.error('Calendar event deletion error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getAvailableSlots(date: Date, duration: number = 60): Promise<AvailabilitySlot[]> {
  try {
    // Mock implementation - in real app, this would check actual calendar availability
    const slots: AvailabilitySlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      const start = new Date(date);
      start.setHours(hour, 0, 0, 0);
      
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + duration);
      
      slots.push({
        id: `slot-${hour}`,
        start,
        end,
        available: true,
        duration
      });
    }
    
    return slots;
  } catch (error) {
    console.error('Error getting available slots:', error);
    return [];
  }
}

export async function createBooking(bookingData: BookingRequest): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  try {
    const result = await executeQuery(
      'INSERT INTO bookings (name, email, phone, service, duration, preferred_date, notes, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [
        bookingData.name,
        bookingData.email,
        bookingData.phone || null,
        bookingData.service,
        bookingData.duration,
        bookingData.preferredDate.toISOString(),
        bookingData.notes || null,
        'pending'
      ]
    );
    
    const bookingId = result[0]?.id;
    if (!bookingId) throw new Error('Failed to create booking');
    
    return { success: true, bookingId };
  } catch (error) {
    console.error('Booking creation error:', error);
    return { success: false, error: (error as Error).message };
  }
}
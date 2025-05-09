import { CommonModule } from '@angular/common';
//import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent{
 days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  timeSlots: string[] = ['06:00-15:00', '08:00-17:00', 'OFF', '12:00-22:00', '10:00-19:00', 'OFF', 'OFF'];
getEvent(day: string, time: string): string | undefined {
  return this.events[`${day}_${time}`];
}
 events: { [key: string]: string } = {
    'Monday_08:00': 'Hardware Shift',
    'Wednesday_10:00': 'Hardware Shift',
    'Friday_14:00': 'Hardware Shift'
  };
}
export class WeeklyCalendarComponent {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  timeSlots: string[] = ['06:00-15:00', '08:00-17:00', 'OFF', '12:00-22:00', '10:00-19:00', 'OFF', 'OFF'];

  constructor() {
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const startHour = 8; // 8 AM
    const endHour = 17;  // 5 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      this.timeSlots.push(`${hour}:00`);
    }
  }
}

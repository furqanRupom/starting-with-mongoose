import { Days, ISchedules } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';

export const hasTimeConflict = (
  assignedSchedules:ISchedules[],
  newSchedule: ISchedules,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`2023-01-01T${schedule.startTime}:00`);
    const existingEndTime = new Date(`2023-01-01T${schedule.endTime}:00`);
    const newStartTime = new Date(`2023-01-01T${newSchedule.startTime}:00`);
    const newEndTime = new Date(`2023-01-01T${newSchedule.endTime}:00`);
    /*

     newStartTime = 10:00
     newEndTime = 12:00
     existingStartTime = 8:00
     existingEndTime =   9:00


     */
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './../api/api.service';
import { Assessment } from './assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  readonly RESOURCE_NAME = 'assessments';

  constructor(private api: ApiService<Assessment>) { }

  getAll(): Observable<Assessment[]> {
    return this.api.getAll(this.RESOURCE_NAME);
  }

  get(id): Observable<Assessment> {
    if (id) {
      return this.api.getOne(this.RESOURCE_NAME, id);
    } else {
      return new Observable((observer) => {
        observer.next(new Assessment());
      });
    }
  }

  create(assessment): Observable<Assessment> {
    return this.api.post(this.RESOURCE_NAME, assessment);
  }

  update(assessment) {
    return this.api.update(this.RESOURCE_NAME, assessment);
  }

  delete(assessment) {
    return this.api.delete(this.RESOURCE_NAME, assessment);
  }

  getStudents(assessment) {
    return this.api.get(`${this.RESOURCE_NAME}/${assessment.id}/students`);
  }

  addGrade(assessment, student) {
    let data = {student_id: student.id,
                assessment_id: assessment.id,
                grade: student.grade
                };

    return this.api.post('grades', data);
  }
}

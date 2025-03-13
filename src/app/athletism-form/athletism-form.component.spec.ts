import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletismFormComponent } from './athletism-form.component';

describe('AthletismFormComponent', () => {
 it('Launch test', () => {
   cy.visit('http://localhost:8080/athletism-form');
   cy.title().should('Olimpiadas especiales')
 })
});

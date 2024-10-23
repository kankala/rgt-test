import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkComponent } from './artwork.component';

describe('ArtworkComponent', () => {
  let component: ArtworkComponent;
  let fixture: ComponentFixture<ArtworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworkComponent]
    });
    fixture = TestBed.createComponent(ArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

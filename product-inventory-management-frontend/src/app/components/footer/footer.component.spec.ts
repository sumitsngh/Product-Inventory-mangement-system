import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the footer text', () => {
    const footerElement = fixture.debugElement.query(By.css('.footer span'));
    expect(footerElement.nativeElement.textContent).toContain('© 2025 Products Inventory');
  });

  it('should have the correct class in footer', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement.classes['footer']).toBeTruthy();
  });
});

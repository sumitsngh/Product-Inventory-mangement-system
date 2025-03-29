import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading', () => {
    const h2Element = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2Element.textContent).toContain('About This Application');
  });

  it('should render the correct paragraph text', () => {
    const pElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pElement.textContent).toContain('This is a simple inventory management system');
  });
});

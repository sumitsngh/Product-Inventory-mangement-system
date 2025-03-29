import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const activatedRouteStub = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      }
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details on init', () => {
    const mockProduct = { id: 1, name: 'Test Product', description: 'Test Description', manufacturer: 'Test Manufacturer', price: 100, quantity: 10 };
    productServiceSpy.getProduct.and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productServiceSpy.getProduct).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProduct);
  });

  it('should handle error when product details cannot be loaded', () => {
    productServiceSpy.getProduct.and.returnValue(throwError(() => new Error('Error fetching product')));
    
    component.ngOnInit();

    expect(productServiceSpy.getProduct).toHaveBeenCalledWith(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inventory/home']);
  });
});

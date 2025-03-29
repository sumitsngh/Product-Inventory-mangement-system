import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct', 'updateProduct']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule,EditProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
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

  it('should call updateProduct on button click when form is valid', () => {
    component.product = { id: 1, name: 'Updated Product', description: 'Updated Description', manufacturer: 'Updated Manufacturer', price: 200, quantity: 5 };
    productServiceSpy.updateProduct.and.returnValue(of({}));

    component.updateProduct();

    expect(productServiceSpy.updateProduct).toHaveBeenCalledWith(1, component.product);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inventory/home']);
  });

  it('should handle error when updating product fails', () => {
    spyOn(console, 'error');
    productServiceSpy.updateProduct.and.returnValue(throwError(() => new Error('Error updating product')));

    component.updateProduct();

    expect(console.error).toHaveBeenCalledWith('Error updating product:', jasmine.any(Error));
  });
});

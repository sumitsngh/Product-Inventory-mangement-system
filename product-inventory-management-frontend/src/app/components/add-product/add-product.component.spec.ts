import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['addProduct']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule,AddProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button if form is invalid', () => {
    component.product = {}; 
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy(); 
  });

  it('should call addProduct on button click when form is valid', () => {
    component.product = {
      name: 'Test Product',
      description: 'Test Description',
      manufacturer: 'Test Manufacturer',
      price: 100,
      quantity: 10
    };

    productServiceSpy.addProduct.and.returnValue(of({})); 

    component.addProduct();

    expect(productServiceSpy.addProduct).toHaveBeenCalledWith(component.product);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inventory/home']);
  });

  it('should show an error message when product addition fails', () => {
    component.product = {
      name: 'Test Product',
      description: 'Test Description',
      manufacturer: 'Test Manufacturer',
      price: 100,
      quantity: 10
    };

    productServiceSpy.addProduct.and.returnValue(throwError(() => new Error('Error adding product')));

    spyOn(console, 'error');

    component.addProduct();

    expect(console.error).toHaveBeenCalledWith('Error adding product:', jasmine.any(Error));
  });
});

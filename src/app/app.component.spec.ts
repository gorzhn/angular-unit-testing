import { AppComponent } from "./app.component";
import { JsonPlaceholderService } from './shared/services/json-placeholder/json-placeholder.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { LogType } from './shared/models/LogType';
import { Post } from './shared/models/Post';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let spyJsonPlaceholderService: jasmine.SpyObj<JsonPlaceholderService>;
  let component: AppComponent;
  let router : Router;
  beforeEach(() => {
    spyJsonPlaceholderService = jasmine.createSpyObj<JsonPlaceholderService>('JsonPlaceholderService', ['getPosts']);
    router =  jasmine.createSpyObj<Router>('Router',['navigateByUrl']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: JsonPlaceholderService, useValue: spyJsonPlaceholderService
        },
        { 
          provide: Router, useValue: router
        },
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });
  afterEach(() => {
    TestBed.resetTestingModule();
})
  it('should create successfully', () => {
    expect(fixture).toBeDefined();
  });

  it('should set the title correctly', () => {
    component.setTitle('new-title');

    expect(component.title).toEqual('new-title');
  });

  it('should set the posts array to the result of getPosts() called from the jsonPlaceholderService', () => {
    const MOCK_POSTS: Post[] = [
      {
        id: 1,
        userId: 1,
        body: 'body1',
        title: 'title1'
      },
      {
        id: 2,
        userId: 2,
        body: 'body2',
        title: 'title2'
      },
      {
        id: 3,
        userId: 3,
        body: 'body3',
        title: 'title3'
      }
    ];
    spyJsonPlaceholderService.getPosts.and.returnValue(of(MOCK_POSTS));

    component.getPosts();

    expect(component.posts).toEqual(MOCK_POSTS);
  });

  it('should check if there is a div element with content unit-testing-demo', () => {
    const divElement: HTMLElement = fixture.nativeElement.querySelector('#app-title');

    expect(divElement.textContent).toEqual('unit-testing-demo');
  });

  it('should call logMessageInDatabase() when logger() is called with LogType.DATABASE', () => {
    const spyLogMessageInDatabase = spyOn(component, 'logMessageInDatabase');

    component.logger('some message', LogType.DATABASE);

    expect(spyLogMessageInDatabase).toHaveBeenCalledWith('some message');
  });

  it('should call logMessageInFile() when logger() is called with LogType.FILE', () => {
    const spyLogMessageInFile = spyOn(component, 'logMessageInFile');

    component.logger('some message', LogType.FILE);

    expect(spyLogMessageInFile).toHaveBeenCalledWith('some message');
  });

  it('should call console.log() when logger() is called with LogType.CONSOLE', () => {
    const spyLogMessageInConsole = spyOn(console, 'log');

    component.logger('some message', LogType.CONSOLE);

    expect(spyLogMessageInConsole).toHaveBeenCalledWith('some message');
  });



   it('should call console.log() when logger() is called with LogType.CONSOLE', () => {
    const spyLogMessageInConsole = spyOn(console, 'log');

    component.logger('some message', LogType.CONSOLE);

    expect(spyLogMessageInConsole).toHaveBeenCalledWith('some message');
  });
  it('should toggle title from "unit-testing-demo" to "other-title"', () => {
    component.setTitle("unit-testing-demo");
    component.toggleTitle();
    expect(component.title).toEqual("other-title");
  
    });
  
    
   it('should toggle title from "other-title" to "unit-testing-demo"', () => {
    component.setTitle("other-title");
    component.toggleTitle();
    expect(component.title).toEqual("unit-testing-demo");
  
    });
    it('should call navigate() when clicking on about button', () => {
      const navigate = spyOn(component,'navigate');
      const button: HTMLElement = fixture.nativeElement.querySelector('#about');
      button.click();
      expect(navigate).toHaveBeenCalledWith('/about');

    });
    it('should call navigate() when clicking on about button', () => {
      const navigate = spyOn(component,'navigate');
      const button: HTMLElement = fixture.nativeElement.querySelector('#home');
      button.click();
      expect(navigate).toHaveBeenCalledWith('');

    });
    it('should call navigate() when clicking on about button', () => {
      const navigate = spyOn(component,'navigate');
      const button: HTMLElement = fixture.nativeElement.querySelector('#contact');
      button.click();
      expect(navigate).toHaveBeenCalledWith('/contact');

    });
    it('should call navigateByUrl() when clicking on any button', () => {
      
      const button: HTMLElement = fixture.nativeElement.querySelector('button');
      button.click();
      expect(router.navigateByUrl).toHaveBeenCalled()

    });
  
});
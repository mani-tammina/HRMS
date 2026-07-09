import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouteGuardService } from './core/services/route-guard.service';
import { EmployeeService } from './core/services/employee.service';
import { AuthService } from './core/services/auth.service';
import { CustomIconService } from './core/services/custom-icon.service';
import { MenuController, Platform } from '@ionic/angular';
import { InboxService } from './modules/inbox/services/inbox.service';
import './core/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  showIntro = false;
  fadeOutIntro = false;
  showMenu = false;
  isLoginPage = true;
  userRole: string | null = null;
  isAdmin = false;
  userDesignation: string | null = null;
  currentUrl: string = '';

  public appPages = [
    { title: 'Home', url: '/Home', icon: 'home', roles: ['employee', 'manager', 'hr', 'finance'] },


    { title: 'Leave', url: '/leaves', icon: 'leave', roles: ['employee', 'manager', 'hr', 'finance'] },
    { title: 'My Team', url: '/MyTeam', icon: 'team', roles: ['employee', 'manager', 'hr', 'finance'] },
    { title: 'Inbox', url: '/inbox', icon: 'inbox-outline', roles: ['manager', 'hr', 'admin', 'approver'] },
    { title: 'Onboarding', url: '/onboarding', icon: 'onboarding', roles: ['admin', 'hr'] },
    { title: 'Admin', url: '/administration', icon: 'admin', roles: ['admin', 'hr'], exactMatch: true },
    { title: 'Exit Management', url: '/administration/separation', icon: 'leave', roles: ['admin', 'hr', 'manager'] },
    { title: 'Work Track', url: '/workTrack', icon: 'worktrack', roles: ['employee', 'hr', 'finance'] },
    {
      title: 'My Finance', icon: 'admin', roles: ['admin', 'hr', 'employee', 'manager', 'finance'], isExpanded: false, children: [
        { title: 'My Pay', url: '/MyPay', icon: 'payslip', roles: ['hr', 'employee', 'manager', 'finance'] },
        { title: 'Financial Admin', url: '/finance/admin', icon: 'admin', roles: ['admin', 'finance'] }
      ]
    },
  ];

  unreadInboxCount = 0;

  constructor(
    private router: Router,
    private routeGuardService: RouteGuardService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private customIconService: CustomIconService,
    private menuController: MenuController,
    private platform: Platform,
    private inboxService: InboxService
  ) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.isLoginPage = this.currentUrl.includes('/login');
        this.showMenu = !this.isLoginPage;
        this.userRole = this.routeGuardService.userRole;
        this.isAdmin = (this.userRole === 'admin' || this.userRole === 'hr');
        this.fetchProfileInfoIfNeeded();
        this.fetchUnreadInboxCount();
        this.cdr.detectChanges();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isLoginPage || !this.showMenu) return;

    const target = event.target as HTMLElement;
    this.menuController.isOpen().then((isOpen) => {
      if (isOpen) {
        const menuElement = document.querySelector('ion-menu');
        const menuButtonElement = document.querySelector('ion-menu-button');
        if (
          menuElement &&
          !menuElement.contains(target) &&
          (!menuButtonElement || !menuButtonElement.contains(target))
        ) {
          this.menuController.close();
        }
      }
    });
  }

  ngOnInit(): void {
    // Initial visibility fixes
    document.documentElement.style.opacity = '1';
    document.body.style.opacity = '1';

    // Only show animated intro screen if running in a native mobile application (Capacitor/Cordova)
    if (this.platform.is('hybrid')) {
      this.showIntro = true;

      // Start intro screen timer
      setTimeout(() => {
        this.fadeOutIntro = true;
        setTimeout(() => {
          this.showIntro = false;
          this.cdr.detectChanges();
        }, 600); // match transition duration
        this.cdr.detectChanges();
      }, 2500);
    }
  }

  private fetchProfileInfoIfNeeded() {
    if (!this.isLoginPage && this.routeGuardService.isLoggedIn && !this.userDesignation) {
      this.employeeService.getMyProfile().pipe(takeUntil(this.destroy$)).subscribe({
        next: (emp) => {
          if (emp) {
            this.userDesignation = (emp.designation_name || emp.designation || 'N/A').toLowerCase();
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.logout();
          }
        }
      });
    }
  }

  private fetchUnreadInboxCount() {
    const role = this.userRole?.toLowerCase() || '';
    const hasAccess = ['manager', 'hr', 'admin', 'approver'].includes(role);
    if (!this.isLoginPage && this.routeGuardService.isLoggedIn && hasAccess) {
      this.inboxService.getNotifications({ page: 1, limit: 1 }).subscribe({
        next: (res) => {
          if (res && res.success) {
            this.unreadInboxCount = res.unreadCount;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.warn('Could not fetch inbox unread count:', err);
        }
      });
    } else {
      this.unreadInboxCount = 0;
    }
  }

  shouldShowPage(page: any): boolean {
    if (!page.roles) return true;
    const role = this.userRole?.toLowerCase() || '';

    // Custom logic for CEO if needed (preserving existing app logic)
    if (page.title === 'Leave' && this.userDesignation?.includes('ceo')) {
      return false;
    }

    if (page.title === 'Work Track' && (this.userDesignation?.includes('management'))) {
      return false;
    }

    return page.roles.includes(role);
  }

  isSubmenuActive(page: any): boolean {
    if (!page.children) return false;
    return page.children.some((child: any) => {
      if (!child.url) return false;
      return this.currentUrl.toLowerCase().includes(child.url.toLowerCase());
    });
  }


  /**
   * Get custom SVG icon path for a menu item
   */
  getCustomIconPath(iconName: string): string {
    return this.customIconService.getIconPath(iconName);
  }

  toggleSubmenu(page: any) {
    if (page.children) {
      page.isExpanded = !page.isExpanded;
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.clear();
      },
      error: (err) => console.error('Logout failed', err)
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

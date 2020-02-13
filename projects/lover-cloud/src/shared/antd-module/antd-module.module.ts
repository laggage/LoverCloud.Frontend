import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule, NZ_ICONS, NzIconModule, NzAlertModule, NzMessageModule, NzUploadModule, NzAvatarModule } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../app/authentication/services/auth.interceptor';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons)
  .map(key => antDesignIcons[key])


  const authInterceptor = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NzIconModule,
    NzSpinModule,
    NzAlertModule,
    NzMessageModule,
    NzUploadModule,
    NzAvatarModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }, authInterceptor]
})
export class AntdModule { }

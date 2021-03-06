import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule, NZ_ICONS, NzIconModule, NzAlertModule, NzMessageModule, NzUploadModule, NzAvatarModule, NzAffixModule, NzPageHeaderModule, NzInputModule, NzTimelineModule, NzModalModule, NzCarouselModule, NzDatePickerModule, NZ_CONFIG, NzConfig, NzDropDownModule, NzProgressModule, NzCollapseModule } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/zh';
import { AuthenticationImageUrlPipe } from '../../app/lover-cloud/services/authentication-image-url.pipe';
import { AppSpinComponent } from '../../app/lover-cloud/components/app-spin/app-spin.component';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons)
  .map(key => antDesignIcons[key])


const ngZorroConfig: NzConfig = {
  message: { nzDuration: 8000 },
};

@NgModule({
  declarations: [
    AuthenticationImageUrlPipe,
    AppSpinComponent,
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzSpinModule,
  ],
  exports: [
    NzIconModule,
    NzSpinModule,
    NzAlertModule,
    NzMessageModule,
    NzUploadModule,
    NzAvatarModule,
    NzAffixModule,
    NzPageHeaderModule,
    NzInputModule,
    NzTimelineModule,
    NzModalModule,
    NzCarouselModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzProgressModule,
    AuthenticationImageUrlPipe,
    NzCollapseModule,
    AppSpinComponent
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ]
})
export class AntdModule { }

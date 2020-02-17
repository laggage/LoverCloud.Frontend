import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule, NZ_ICONS, NzIconModule, NzAlertModule, NzMessageModule, NzUploadModule, NzAvatarModule, NzAffixModule, NzPageHeaderModule, NzInputModule, NzTimelineModule, NzModalModule, NzCarouselModule, NzDatePickerModule, NZ_CONFIG, NzConfig } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/zh';
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
    NzAvatarModule,
    NzAffixModule,
    NzPageHeaderModule,
    NzInputModule,
    NzTimelineModule,
    NzModalModule,
    NzCarouselModule,
    NzDatePickerModule
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ]
})
export class AntdModule { }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { LoverLogService } from '../../services/lover-log.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { ImagePreviewService } from '../../services/image-preview.service';

@Component({
  selector: 'app-lover-log-add',
  templateUrl: './lover-log-add.component.html',
  styleUrls: ['./lover-log-add.component.css']
})
export class LoverLogAddComponent implements OnInit {
  public loverLogForm: FormGroup = new FormGroup({
    content: new FormControl(''),
  });
  public files: UploadFile[] = [];
  public status: 'none'|'active'|'error'|'success' = 'none';

  constructor(
    private loverLogServ: LoverLogService,
    private message: NzMessageService,
    private router: Router,
    private imagePreviewServ: ImagePreviewService
  ) { 
  }

  ngOnInit(): void {
  }

  previewImage(file: UploadFile) {
    this.imagePreviewServ.previewImage(file.thumbUrl);
  }

  removeImage(file: UploadFile) {
    if(file!=null) {
      this.files.splice(this.files.indexOf(file), 1);
    }
  }

  onSubmit() {
    this.status = 'active';
    this.loverLogServ.addLoverLog({
      content: this.loverLogForm.get('content').value,
      photos: this.files.map(o => o.originFileObj)
    }).subscribe(response => {
      
      AuthService.toAuthPageIfUnauthorized(response, this.router);

      if(response.status === 201) {
        this.message.success('操作成功');
        this.router.navigateByUrl('/lover/log');
        this.status = 'success';
      } else {
        this.status = 'error';
      }
    })
  }
}

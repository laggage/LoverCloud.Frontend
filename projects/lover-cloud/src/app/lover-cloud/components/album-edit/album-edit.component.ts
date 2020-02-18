import { Component, OnInit, Output } from '@angular/core';
import { Album } from '../../models/album';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css']
})
export class AlbumEditComponent {

  @Output() public album: Album = new Album();

  constructor(
    private modalRef: NzModalRef
  ) { 
  }

  onSubmit() {
    this.modalRef.triggerOk();
  }
}

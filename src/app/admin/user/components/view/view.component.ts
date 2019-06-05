import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../../shared/service/data.service';
import { UserModel } from '../../../../shared/model/user-model';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../../../../shared/component/error-dialog/error-dialog.component';
import {MsgDialogComponent} from '../../../../shared/component/msg-dialog/msg-dialog.component';
import {UserphotoModel} from '../../../../shared/model/userphoto-model';

declare let resize: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user: UserModel[];

  userView = [];

  userPhoto: UserphotoModel[] = [];

  photoExist = true;

  src: string | ArrayBuffer = '../../../../../assets/img/avatar-menino-01.png';

  resizeObj: any;

  constructor( private dataService: DataService,
               private route: ActivatedRoute,
               private router: Router,
               private dialog: MatDialog) {

    this.resizeObj = new resize();

  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: any) => {
        const id = params.id;
        const user$ = this.dataService.getUser(id);
        user$.subscribe(user => {
          // @ts-ignore
          this.dataService.getUserPhotoByUserId(user.id)
            .subscribe(
              dados => {
                this.photoExist = true;
                this.onLoadPhoto(dados);
                this.userPhoto = dados;
              },
              error => {
                this.photoExist = false;
                return of();
              });
          // @ts-ignore
          this.dataService.getUserStatusId(user.user_status_id)
            .subscribe(
              dados => {
                this.onLoadStatus(dados);
              });
          // @ts-ignore
          this.dataService.getUserTypeId(user.user_type_id)
            .subscribe(
              dados => {
                this.onLoadTipo(dados);
              });
          this.onLoadView(user);
        });
      });

  }

  onLoadView(user) {
    // @ts-ignore
    this.userView.id = user.id;
    // @ts-ignore
    this.userView.nome = user.name;
    // @ts-ignore
    this.userView.email = user.email;
    // @ts-ignore
    this.userView.data = user.date_create;
    // @ts-ignore
    this.userView.data2 = user.date_update;
  }

  onLoadTipo(tipo) {
    // @ts-ignore
    this.userView.tipo = tipo.name;
  }

  onLoadStatus(status) {
    // @ts-ignore
    this.userView.status = status.name;
  }

  onEdit(e) {
    e.stopPropagation();
    // noinspection JSIgnoredPromiseFromCall
    // @ts-ignore
    this.router.navigate(['/admin/user/editar/', this.userView.id]);
  }

  onLoadPhoto(photo) {
    if (photo) {
      const buffer = window.atob(photo.img);
      this.src = buffer;
    } else {
      this.src = '../../../../../assets/img/avatar-menino-01.png';
    }
  }

  onFindFile(photo) {

    const inputPhoto = photo.target.files[0];

    if ( (inputPhoto.type === 'image/jpeg') || (inputPhoto.type === 'image/png')) {

      const fileReader = new FileReader();

      fileReader.onloadend = () => {

        this.resizeObj.resize(fileReader.result, 200, inputPhoto.type, 'dataURL', (image) => {
          this.onUploadPhoto(image, inputPhoto);
        });

      };

      if (inputPhoto) {
        fileReader.readAsDataURL(inputPhoto);
      } else {
        this.src = '../../../../../assets/img/avatar-menino-01.png';
      }

    } else {
      const mens = 'Os arquivos só podem ser "jpg" ou "png"...';
      this.openDialog(mens, 'Input');
    }

  }

  onUploadPhoto(blob, inputPhoto) {

    this.userPhoto = {
      // @ts-ignore
      event: `MRD_User`,
      // @ts-ignore
      desc: `Foto do usuário ${this.userView.email}`,
      // @ts-ignore
      name: this.userView.email,
      length: blob.toString().length,
      type: inputPhoto.type,
      // @ts-ignore
      user_id: this.userView.id,
      img: btoa(blob)
    };

    if (this.photoExist) {
      // @ts-ignore
      this.dataService.putUserPhoto(this.userView.id, this.userPhoto)
        .subscribe(
          success => {
            // @ts-ignore
            const msg = `Foto do usuário "${this.userView.email}" foi alterada.`;
            this.openMsgDialog(msg, 'success', 2500);
            this.src = blob;
          },
          error => {
            // @ts-ignore
            const msg = `Erro ao tentar alterar foto do usuário "${this.userView.email}".`;
            console.log(error);
            this.openDialog(msg, error.status);
          });
    } else {
      this.photoExist = true;
      this.dataService.postUserPhoto(this.userPhoto)
        .subscribe(
          success => {
            // @ts-ignore
            const msg = `Foto do usuário "${this.userView.email}" incluida.`;
            this.openMsgDialog(msg, 'success', 2500);
            this.src = blob;
          },
          error => {
            // @ts-ignore
            const msg = `Erro ao tentar incluir foto do usuário "${this.userView.email}".`;
            console.log(error);
            this.openDialog(msg, error.status);
          });
    }
  }

  openDialog(mens, status) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: `ERRO ${status}`,
        message: mens,
        type: 'error'
      }
    });
  }

  openMsgDialog(mens, status, timeout?: number) {
    this.dialog.open(MsgDialogComponent, {
      data: {
        title: 'NOVA FOTO',
        message: mens,
        type: status,
        dismissTimeout: timeout
      }
    });
  }
}

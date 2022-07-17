import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public loading: HTMLIonLoadingElement;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  async showAlertAction(
    title: string,
    message: string,
    handler: () => void,
    allowClose = true,
    showCancel = true
  ): Promise<void> {
    const buttons = [];

    if (showCancel) {
      buttons.push({
        text: 'CANCELAR',
        role: 'cancel'
      });
    }

    buttons.push({
      text: 'CONFIRMAR',
      handler
    });

    const alert = await this.alertCtrl.create({
      backdropDismiss: allowClose,
      header: title,
      message,
      buttons
    });
    await alert.present();
  }

  async showAlert(
    title: string,
    message: string,
    closeText = 'FECHAR',
  ): Promise<void> {
    const buttons = [];

    buttons.push({
      text: closeText,
      role: 'cancel'
    });

    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons
    });
    await alert.present();
  }

  async showLoading(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular'
    });
    this.loading.present();
  }

}

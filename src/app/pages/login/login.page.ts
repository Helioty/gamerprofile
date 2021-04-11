import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private common: CommonService,
    private supabaseService: SupabaseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    await this.common.showLoading();
    this.supabaseService.signIn(this.credentials.value).then(async (data) => {
      await this.common.loading.dismiss();
    }, async (err) => {
      await this.common.loading.dismiss();
    });
  }

  signUp() {
    this.supabaseService.signUp({ email: '', password: '' });
  }
}

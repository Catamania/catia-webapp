import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialNavComponent } from './material-nav/material-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatButtonToggleModule, MatSlider, MatSliderModule, MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { PlotlyModule } from 'angular-plotly.js';
import { IndicateurMacdComponent } from './indicateur-macd/indicateur-macd.component';
import { DonneesMarcheComponent } from './donnees-marche/donnees-marche.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WalletComponent } from './wallet/wallet.component';
import { GraphMatCardComponent, IterablePipe } from './graph-mat-card/graph-mat-card.component';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { KrakenAccountComponent } from './kraken-account/kraken-account.component';
import { MarketTradesComponent } from './market-trades/market-trades.component';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    MaterialNavComponent,
    MaterialDashboardComponent,
    IndicateurMacdComponent,
    DonneesMarcheComponent,
    SignInComponent,
    GraphMatCardComponent,
    WalletComponent,
    KrakenAccountComponent,
    MarketTradesComponent,
    IterablePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    PlotlyModule,
    AppRoutingModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'fr' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }

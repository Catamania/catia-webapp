import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialNavComponent } from './material-nav/material-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyExampleComponent } from './graphs/graph.component';
import { IndicateurMacdComponent } from './indicateur-macd/indicateur-macd.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialNavComponent,
    MaterialDashboardComponent,
    PlotlyExampleComponent,
    IndicateurMacdComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    PlotlyModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

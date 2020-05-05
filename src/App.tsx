import React from 'react';
import { L10n, loadCldr } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import './App.css';

export default class App extends React.Component<{}, {}> {

  public scheduleObj: ScheduleComponent = new ScheduleComponent({});
  public cultureData: { [key: string]: Object }[] = [
    { name: "English", value: "en" },
    { name: "Arabic", value: "ar" },
    { name: "French", value: "fr" },
    { name: "Russian", value: "ru" }
  ];
  public onChange(args: ChangeEventArgs & any) {
    this.scheduleObj.enableRtl = args.value === 'ar';
    this.scheduleObj.locale = args.value;
    this.scheduleObj.dataBind();
  }

  public render() {
    this.cultureData.forEach((culture: { [key: string]: Object }) => {
      loadCldr(
        require('cldr-data/supplemental/numberingSystems.json'),
        require('cldr-data/main/' + culture.value + '/ca-gregorian.json'),
        require('cldr-data/main/' + culture.value + '/numbers.json'),
        require('cldr-data/main/' + culture.value + '/timeZoneNames.json')
      );
      let localeName: string = culture.value === 'en' ? 'en-US' : culture.value as string;
      L10n.load(require('@syncfusion/ej2-locale/src/' + localeName + '.json'));
    });
    return (
      <div className="control-section">
        <div className="dropdown-control" style={{ display: "flex", paddingBottom: "10px" }}>
          <div style={{ lineHeight: "35px" }} className="e-control">Localization</div>
          <div style={{ marginLeft: "20px" }}>
            <DropDownListComponent id="games" dataSource={this.cultureData} fields={{ text: 'name', value: 'value' }} change={this.onChange.bind(this)} placeholder="Select a culture" value="en" popupHeight="200px" />
          </div>
        </div>
        <div className="schedule-control">
          <ScheduleComponent id="schedule" ref={(schedule: ScheduleComponent) => this.scheduleObj = schedule} height="550px" selectedDate={new Date(2017, 5, 5)} currentView="Month"
            >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
              <ViewDirective option="Agenda" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
      </div>
    );
  }
}

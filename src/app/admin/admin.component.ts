import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  [x: string]: any;
  totalUsers: any;
  data:any
  currentMonthData: any;
  todayData: any;
  month: any;
  monthdata: any;
  orderList:any;
  showMonth:any
  dataa: any
  week: any;
  weekData:any;
  showWeek:any;
  quaterData:any;
  showQuater:any;
  isWeek =false;
  senddata:any;
  alldata:any;
  year:any;
  yearData:any;
  selectedvalue:any;
  responseData:any;
  name:any;
  graphLabel:any;
  groupDates = [
    {
      label: 'Day',
      value: 'day',
      items: [
        { label: 'Today', value: '0,0,day' },
        { label: 'Yesterday', value: '1,1,day' },
      ],
    },
    {
      label: 'Week',
      value: 'week',
      items: [
        { label: 'This Week', value: '0,0,week' },
        { label: 'Last Week', value: '1,1,week' },
      ],
    },
    {
      label: 'Month',
      value: 'month',
      items: [
        { label: 'This Month', value: '0,0,month' },
        { label: 'Last Month', value: '1,1,month' },
        { label: 'Last Three Month', value: '3,1,month' },
      ],
    },
    {
      label: 'Year',
      value: 'year',
      items: [
        { label: 'This Year', value: '0,0,year' },
        { label: 'Last Year', value: '1,1,year' },
      ],
    },
  ];
  filters: any = {
    selectedUpcomingDates: 'thisweek',
    selectedDates: '0,0,date',
  };
  selectedDateRange = [];
  startDate: any;
  endDate: any;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    
  }
   Fetchdetails() {
    console.log(this.filters);
    
    let fromDate, toDate;
    let startRange = this.filters.selectedDates.split(',')[0];
    let endRange = this.filters.selectedDates.split(',')[1];
    this.graphLabel = this.filters.selectedDates.split(',')[2];
    console.log(startRange, 'ss', endRange, 'ee');
    if (this.filters.selectedDates.includes('day')) {
           fromDate = new Date(
        moment().subtract(startRange, 'days').startOf('days').format()
      );
      toDate = new Date(
        moment().subtract(endRange, 'days').endOf('days').format()
      );

      console.log(fromDate, 'fromdate', toDate, 'todate');
    } else if (this.filters.selectedDates.includes('week')) {
      fromDate = new Date( moment().subtract(startRange, 'week').startOf('week').format()
      );
      toDate = new Date(
        moment().subtract(endRange, 'week').endOf('week').format()
      );
      console.log(fromDate, 'fromdate', toDate, 'todate');
    } else if (this.filters.selectedDates.includes('month')) {
      fromDate = new Date(
        moment().subtract(startRange, 'month').startOf('month').format()
      );
      toDate = new Date(
        moment().subtract(endRange, 'month').endOf('month').format()
      );
      console.log(fromDate, 'fromdate', toDate, 'todate:Month');
    } else if (this.filters.selectedDates.includes('year')) {
      fromDate = new Date(
        moment().subtract(startRange, 'year').startOf('year').format()
      );
      toDate = new Date(
        moment().subtract(endRange, 'year').endOf('year').format()
      );
     
      console.log(fromDate, 'fromdate', toDate, 'todate:Year');
    }
    
     let data = {
      fromDate: fromDate,
      toDate: toDate,
    };
     this.service.adminApi(data).subscribe((response) => {
      this.alldata = response.alldata
      this.responseData = response.responseData
      console.log(response);
      console.log(this.showMonth);
      this.data = {
      labels: ['total',this.graphLabel],
      datasets: [{
          label: 'Orders',
          backgroundColor: ['#f87979','#41B883'],
          data: [this.alldata,this.responseData]
        }]
    };
    });
  }
   getData(){
    
    
  }
  
  // onSelected(data:any){
  //   console.log(data.value);
   
  //   this.selectedvalue = data
  //   console.log(this.showMonth.labels);
   
  //   this.getData()
  // }

 





















   // this.year =response.alldata
      // this.yearData =   {
      // labels: ['CURRENT YEAR'],
      // datasets: [{  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [ this.year]}]
      // }
     // this.monthdata = response.thisMonth
      // this.weekData =response.weekdata 
      // this.quaterData =  response.quarterdata
   // this.totalUsers = response.totalUsers
      // this.currentMonthData = response.currentMonthData
      // this.todayData = response.todayData
      // console.log("admin",response);
      // this.data =   {
      // labels: ['TOATL','CURRENT MONTH', 'TODAY'],
      // datasets: [{  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [ this.totalUsers,this.currentMonthData,this.todayData]}]
      // }
  // onMonthSelected(value:any){
  //   console.log(value);
  //   this.month = value
  //   this.week =''
  //   let data = {
  //     month:value
  //   }
  //    this.service.adminApi(data).subscribe((response) => {
  //     this.alldata = response.alldata
  //     this.monthdata = response.thisMonth
  //     console.log(this.monthdata);
  //     this.showMonth = {
  //     labels: [ 'Total',this.month],
  //     datasets: [{backgroundColor: '#f87979',data: [this.alldata,this.monthdata]}]
  //     };
  //   });
  // }

  // getData(){
  //   let data = {
  //     month:this.month,
  //     week:this.week
  //   }
  //    this.service.adminApi(data).subscribe((response) => {
  //     this.totalUsers = response.totalUsers
  //     this.currentMonthData = response.currentMonthData
  //     this.todayData = response.todayData
  //     console.log(this.todayData);
      
  //     this.data =   {
  //     labels: ['CURRENT MONTH', 'TODAY'],
  //     datasets: [{  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],data: [ this.currentMonthData,this.todayData]}]
  //     }

      
  //   });

  // }
  


}

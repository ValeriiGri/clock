'use strict';
    
      class Clock {
        //in empty object data we can put any data
        constructor(el, data = {}){

          this.el = el;
          
          //create object with data for render()
          this.data = Object.assign({
            tz:0,
            timezone:'',
            hh: 0,
            mm: 0,
            ss: 0
          }, data);

          this.TIME_ZONE_MS = this.data.tz*3600*1000;
        }

        //creating HTML
        render() {
          this.el.innerHTML = `
            <div>
              ${this.data.timezone}:<span class = "hours">${this.data.hh}</span>
              :<span class = "mins">${this.data.mm}</span>
              :<span class = "secs">${this.data.ss}</span>
            </div>
          `;
        }
  
        getTime() {
          
          this.date =   new Date(Date.now() + this.TIME_ZONE_MS);
          this.hours =  this.date.getUTCHours();
          this.mins =   this.date.getMinutes();
          this.secs =   this.date.getSeconds();
          
          (this.hours < 10) ? this.data.hh = '0' + this.hours : 
            this.data.hh = this.hours;
            
          (this.mins < 10) ? this.data.mm = '0' + this.mins : 
            this.data.mm = this.mins;
            
          (this.secs < 10) ? this.data.ss = '0' + this.secs : 
            this.data.ss = this.secs;
            
          this.render();
        }
     
        start() {
            this.id = setInterval (this.getTime.bind(this), 1000);
            this.getTime();
        }
        
        stop() {
            clearInterval(this.id); 
        }
      }
/**
 * URL:  https://touchstoneclimbing.com/ironworks/fitness-classes-rgp/
 *
 * var s = document.createElement('script');s.src='http://localhost/autoSignUp/app.js';document.body.appendChild(s);
 **/
(function(){

  var userData = {
    isMember   : true, // user is a member, false if non-member
    firstName  : 'Logan',
    lastName   : 'Esenther',
    middleName : '',
    email      : atob('bGVAYmVya2VsZXkuZWR1'),
    phone      : atob('NTEwLTIwMC04MDA5'),
    dob        : [7, 2, 1983], // m, d, yyyy

    className  : 'TRX', // 'Deep Core Strength', 'Cardio Boxing', 'Sparring', 'The Eves Spin'
    targetTime : '5:00 PM', // '4:20 PM', '5:40 PM', - Note this needs to be 5 PM and not 5:00 PM

    signUpTime : '12:00 PM', // noon

    siteUrl    : 'https://touchstoneclimbing.com/ironworks/fitness-classes-rgp/',
  };

  /**
   * Initialize the app
   */
  function init(){
    if(document.location.href !== userData.siteUrl) // if app not run from page
      createIFrame(function(){ createAppGUI(); }); // open site in iframe
    else
      createAppGUI(); // add gui to page
  }

  /**
   * Start the sign up flow with timeouts between the steps
   *
   * TODO: Rewrite step detection with listeners
   *
   **/
  function trySignUp(){
    // TODO: check to make sure we're on the correct page

    if(selectEvent())
    setTimeout(function(){
      if(fillOutMemberData())
      setTimeout(function(){ completeBooking(); }, 5000);
    }, 5000);
  }

  /**
   * Get a list of classes, times and days
   * @return {array}
   */
  function getClassList(){
    return ['TRX']; // TODO: Make this work for other classes if useful?

    var classes = document.querySelectorAll('fieldset.standard-fieldset');

    var classList = [];
    var newClass = {};

    for(var i = 0; i < classes.length; i++){
      var classInfo = classes[i].querySelectorAll('div.link-safe-string')[0].innerText.split('\n');

      // Problem is format is different for classes.  TRX and Deep Core Strength are both 'Class Times' but Cardio Boxing and Sparring is 'Schedule'

      var classTimes = classInfo.indexOf('Class Times:');

      if(!classTimes){ // skip
        continue;
      }

      newClass.title = classes[i].querySelectorAll('legend.list-view-category-legend')[0].innerText;
      newClass.days  = classInfo[classTimes+1].split(' and ');
      newClass.times = classInfo[classTimes+2].split(', ');
    }
  }

  /**
   * Get a list of times for a class (given it's title)
   * @return {array}
   */
  function getClassTimes(classTitle){
    // TODO: Pull times from page and remove hardcoding
    return ['4:20 PM', '5:00 PM', '5:40 PM']; // TRX
  }

  /**
   * Get a list of days for a class (given it's title)
   * @return {array}
   */
  function getClassDays(classTitle){
    // TODO: Pull days from page and remove hardcoding
    return ['Monday', 'Wednesday']; // TRX
  }

  /**
   * Create the user interface
   **/
  function createAppGUI(){
    var appBack = document.createElement('div');
    appBack.style.backgroundColor = 'rgba(0,0,0,0.1)';
    appBack.style.zIndex = '999999';
    appBack.style.position = 'fixed';
    appBack.style.left = '0';
    appBack.style.right = '0';
    appBack.style.top = '0';
    appBack.style.bottom = '0';
    appBack.style.height = '100%';
    appBack.style.width = '100%';

    var app = document.createElement('div');
    app.style.outline = '1px solid black';
    app.style.width = '800px';
    // app.style.height = '100px';
    app.style.position = 'absolute';
    app.style.left = '100px';
    app.style.top = '100px';
    app.style.backgroundColor = 'rgba(0,0,0,0.8)';
    app.style.color = '#fff';

    appBack.appendChild(app); // add app to back

    // Create the application title

    var appTitle = document.createElement('h1');
    var countDown = document.createTextNode('');

    appTitle.appendChild(document.createTextNode('Automatically Signing Up '));
    appTitle.style.cssText = 'font-size: 24px; font-family:consolas,monospace;';
    appTitle.appendChild(countDown);

    updateCountDown();

    app.appendChild(appTitle); // add title to app

    // Create inputs

    var fName = document.createElement('input');
        fName.type = 'text';
        fName.placeholder = 'First Name';
        fName.value = userData.firstName;
        fName.style.cssText = 'width:80px';
    var mName = document.createElement('input');
        mName.type = 'text';
        mName.placeholder = 'Middle Name';
        mName.value = userData.middleName;
        mName.style.cssText = 'width:80px';
    var lName = document.createElement('input');
        lName.type = 'text';
        lName.placeholder = 'Last Name';
        lName.value = userData.lastName;
        lName.style.cssText = 'width:80px';

    var isMember = document.createElement('input');
        isMember.type = 'checkbox';
        isMember.checked = userData.isMember;

    var email = document.createElement('input');
        email.type = 'text';
        email.value = userData.email;

    var phone = document.createElement('input');
        phone.type = 'text';
        phone.value = userData.phone;

    var dobm = document.createElement('input');
        dobm.style.width = '20px';
        dobm.type = 'text';
        dobm.value = userData.dob[0];
    var dobd = document.createElement('input');
        dobd.style.width = '20px';
        dobd.type = 'text';
        dobd.value = userData.dob[1];
    var doby = document.createElement('input');
        doby.style.width = '40px';
        doby.type = 'text';
        doby.value = userData.dob[2];

    var className = document.createElement('select');
        // className.type = 'text';
        // className.value = userData.className;

    var classes = getClassList();

    for(var i = 0; i < classes.length; i++){
      var classOption = document.createElement('option');
          classOption.value = classes[i];
          classOption.text = classes[i];

      if(classes[i] === userData.classTitle)
        classOption.selected = true;

      className.appendChild(classOption);
    }

    var time = document.createElement('select');
        // time.type = 'select';

    // time.value = userData.targetTime;
    var times = getClassTimes();

    for(var i = 0; i < times.length; i++){
      var timeOption = document.createElement('option');
          timeOption.value = (times[i] === '5:00 PM') ? '5 PM' : times[i]; // hack
          timeOption.text = times[i];

      if(times[i] === userData.targetTime)
        timeOption.selected = true;

      time.appendChild(timeOption);
    }

    app.appendChild(document.createTextNode('Name:'));
    app.appendChild(fName);
    app.appendChild(mName);
    app.appendChild(lName);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Member:'));
    app.appendChild(isMember);
    app.appendChild(document.createElement('br'));


    app.appendChild(document.createTextNode('Email:'));
    app.appendChild(email);
    app.appendChild(document.createElement('br'));
    app.appendChild(document.createTextNode('Phone:'));
    app.appendChild(phone);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('DOB:'));
    app.appendChild(dobm);
    app.appendChild(dobd);
    app.appendChild(doby);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Class:'));
    app.appendChild(className);
    app.appendChild(document.createElement('br'));

    app.appendChild(document.createTextNode('Time:'));
    app.appendChild(time);
    app.appendChild(document.createElement('br'));

    if(!document.body){
      alert('Document body not ready');
      return false;
    }

    document.body.appendChild(appBack);

    // -------------------------------------------------------------------------
    //  T E S T   B U T T O N
    // -------------------------------------------------------------------------
    var testButton = document.createElement('button');
    testButton.appendChild(document.createTextNode('Test'));
    testButton.addEventListener('click', function(){
      selectEvent();
    });
    app.appendChild(testButton);

    // -------------------------------------------------------------------------

    return true;

    /**
     * Automatic countdown - update the countdown node text and call the countdown function again
     */
    function updateCountDown(){
      var today = new Date();
      var countDownTime = getTimeRemaining(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+' '+userData.signUpTime);

      if(countDownTime.total <= 0){
        countDown.nodeValue = 'NOW!';
        // TODO: Comment out code below after testing
        // trySignUp();
        return true; // do not run updateCountDown anymore
        // user started it at 12:01 so we should try to register immediately
        // maybe they clicked it the night before and we should check for classes tomorrow
      }

      if(!countDownTime.total){
        alert('Error parsing time');
        return false;
      }

      // Update countdown
      countDown.nodeValue = 'in '+countDownTime.hours+' hours, '+countDownTime.minutes+' minutes, '+countDownTime.seconds+' seconds';

      setTimeout(function(){
        updateCountDown();
      }, 1000);
    }
  }

  /**
   * @param  {function} Callback function when iFrame is loaded
   * @return {[type]}
   */
  function createIFrame(callback){
    var iFrame = document.createElement('iframe');
    iFrame.id = 'trx';
    iFrame.src = userData.siteUrl;
    iFrame.width = '90%';
    iFrame.height = '600px';
    iFrame.frameborder = 0;
    iFrame.addEventListener('load', function(){ callback(); });

    document.body.appendChild(iFrame);

    return true;
  }

  /**
   * @return {[type]}
   */
  function chooseClass(){
    var classes = document.getElementsByClassName('standard-fieldset');

    for(var i = 0; i < classes.length; i++){
      var classTitle = classes[i].getElementsByClassName('list-view-category-legend')[0].innerText;
      if(classTitle === userData.className){
        classes[i].querySelectorAll('a.btn')[0].click();
        return true;
      }
    }

    alert('Class not found.');
    return false;
  }

  /**
   * Find the event button and click on it
   */
  function selectEvent(){
    console.log(document.getElementsByClassName('shaded-section-header'));
    if(document.getElementsByClassName('shaded-section-header') &&
      document.getElementsByClassName('shaded-section-header')[0] &&
      document.getElementsByClassName('shaded-section-header')[0].innerText.trim() !== 'Confirm Booking Details'){
      alert('Page not ready');
      return false;
    }

    var memberCount = document.getElementById('pcount-pid-1-3138387');

    console.log('memberCount is ', memberCount)

    if(!memberCount || memberCount === null){
      alert('Can not find member count element');
      return false;
    }

    memberCount.value = 1;

    // TODO : Add functionality for non-members
    // var nonMemberCount = document.getElementById('pcount-pid-1-3135790');

    var eventsTable = document.getElementById('offering-page-select-events-table');

    for (var i = 0, row; row = eventsTable.rows[i]; i++){
      var matchingRow = row.cells[0].innerText.indexOf(userData.targetTime) ? true : false;
      var isFull = row.cells[1].innerText.indexOf('Full.') ? true : false;

      if(isFull){
        alert('Class is full, exiting.');
        return false;
      }

      row.cells[3].getElementsByClassName('book-now-button')[0].click();
    }

    return true;
  }

  /**
   * @return {[type]}
   */
  function fillOutMemberData(){
    if(document.getElementsByClassName('shaded-section-header')[0].innerText.trim() !== 'Confirm Booking Details'){
      alert('Page not ready');
      return false;
    }

    var firstNameInput = document.getElementById('pfirstname-pindex-1-1');
    var lastNameInput = document.getElementById('plastname-pindex-1-1');
    var middleNameInput = document.getElementById('pmiddle-pindex-1-1');

    var dobMonthInput = document.getElementById('participant-birth-pindex-1month');
    var dobDayInput = document.getElementById('participant-birth-pindex-1day');
    var dobYearInput = document.getElementById('participant-birth-pindex-1year');

    if(firstNameInput === null){
      alert('Error : Inputs not found');
      return false;
    }

    firstNameInput.value = userData.firstName;
    middleNameInput.value = userData.middleName;
    lastNameInput.value = userData.lastName;
    dobMonthInput.value = userData.dob[0];
    dobDayInput.value = userData.dob[1];
    dobYearInput.value = userData.dob[2];

    // agree to all terms
    var checkboxInputs = document.querySelectorAll("input[type='checkbox']");

    for (var i = 0; i < checkboxInputs.length; i++){
      checkboxInputs[i].checked = true;
    }

    var theForm = document.getElementById('theform');
    theForm.getElementsByClassName('navforward')[0].click();

    return true;
  }

  /**
   * @return {[type]}
   */
  function completeBooking(){
    if(document.getElementsByClassName('shaded-section-header')[0].innerText.trim() !== 'Confirm Booking Details'){
      alert('Page not ready');
      return false;
    }

    var firstNameInput = document.getElementById('customer-firstname');
    var lastNameInput = document.getElementById('customer-lastname');
    var middleNameInput = document.getElementById('customer-middlename');
    var emailInput = document.getElementById('customer-email');
    var phoneInput = document.getElementById('customer-phone');
    var dobMonthInput = document.getElementById('customer-birth-month');
    var dobDayInput = document.getElementById('customer-birth-day');
    var dobYearInput = document.getElementById('customer-birth-year');

    firstNameInput.value = userData.firstName;
    middleNameInput.value = userData.middleName;
    lastNameInput.value = userData.lastName;
    emailInput.value = userData.email;
    phoneInput.value = userData.phone;
    dobMonthInput.value = userData.dob[0];
    dobDayInput.value = userData.dob[1];
    dobYearInput.value = userData.dob[2];

    var book = document.getElementById('confirm_booking_button');

    if(book == null){
      alert('Failed');
      return false;
    }

    book.click();
    return true;
  }

  /**
   * Src:  https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
   **/
  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());

    return {
      total   : t,
      days    : Math.floor( t/(1000*60*60*24) ),
      hours   : Math.floor( (t/(1000*60*60)) % 24 ),
      minutes : Math.floor( (t/1000/60) % 60 ),
      seconds : Math.floor( (t/1000) % 60 )
    };
  }

  init();
})();
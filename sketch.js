// variables
var background_img
var button, button_img;
var txt_x = 75, txt_y = 100, txt_s = 100;
var appState = ""
var got_submittedno,submittedno = 1;
var image1 = "not got"
var image2 = "not got"
var loaded_img
var assigned_img;
var issue = "";
var phone_number;
var i = 1;
var z = "not done"
var upload_img 
var type = "png"
var taketask
var latitude,longitude
var clickHere
var img_y,img_x,img_s
var h
var next,previous, assign
var is = ""
var assigned_img;
var assigned = "true";
var assigned_no = [];
var animaltype,assigned_s_img;
var index = 0

function preload() {
  //loading images
  button_img = loadImage ("dash opt.png");
  background_img = loadImage ("dashboad.png");
  taketask = loadImage("db2.png");
  clickHere = loadImage("click here button.png");
  assigned_img = loadImage("assigned.png");
  assigned_s_img = loadImage("assigned_s.png")
}

function setup() {
  //creating canvas
  canvas = createCanvas(250, 400);

  // initialization of the database.
  database = firebase.database();

  //creating the buttons
  next = createButton('Next')
  previous = createButton('Previous')
  assign = createButton('Assign')

  //giving position to the buttons
  next.position(180,355)
  previous.position(30,355)
  assign.position(100,355)

  //hiding the buttons
  next.hide()
  previous.hide()
  assign.hide()

  // getting the var which was stored in the local storage
  assigned_no = getItem('assigned_no');

  // if the got storage is null. changing the var to ""
  if (assigned_no === null) {
    assigned_no = [];
  }
}



function draw() {
  // to set background image 
  background(background_img);

  // to keep on getting the submition count
  var ngoRef = database.ref('ngo_count');
  ngoRef.on("value", (data) => {
    got_submittedno = data.val();
  });

  // to show loading till the fire base is connected
  if (got_submittedno === "undefined"){
    appState = ""
    text ("loading pls wait",10,190)
  }else if (appState === "") {
    appState = "dashboard"
  }

  // to give the pop-up effect when the mouse is over the button. 
  if (mouseX > 25&&mouseY>125&&mouseX<75&&mouseY<175&& appState === "dashboard"){
    txt_y = 122.5;
    txt_x = 22.5;
    txt_s = 55;
    image(button_img ,txt_x ,txt_y,txt_s,txt_s)
  }else if (appState === "dashboard"){
    // else to push back the button
    txt_y = 125;
    txt_x = 25;
    txt_s = 50;
    image(button_img ,txt_x ,txt_y,txt_s,txt_s)
  };

  // to give the pop-up effect when the mouse is over the button. 
  if (mouseX > 140&&mouseY>125&&mouseX<190&&mouseY<175&& appState === "dashboard"){
    txt_y = 122.5;
    txt_x = 138.5;
    txt_s = 55;
    image(assigned_img ,txt_x,txt_y,txt_s,txt_s)
  }else if (appState === "dashboard"){
    // else to push back the button
    txt_y = 125;
    txt_x = 140;
    txt_s = 50;
    image(assigned_img ,txt_x ,txt_y,txt_s,txt_s)
  };

  // to call the show functon when the state is show  
  if (appState === "show"){
    Show()
  }

  // to call the assigned function when the state is assigned
  if (appState === "assigned"){
    Assigned()
  }

  // passing hte above got var from the database to another variable
  submittedno = got_submittedno
}

function mousePressed(){
  // to change the state when take a task button is pressed
  if (mouseX > 25&&mouseY>125&&mouseX<75&&mouseY<175&& appState === "dashboard"){
    appState = "show"
  }

  // to open the map when the map-button is pressed
  if (mouseX > 125&&mouseY>50&&mouseX<125+53&&mouseY<50+23&& appState === "show"){    
    window.open("https://vigneshkumar212.github.io/Map/")
  }

  // to change the state when assigned by you button is pressed
  if (mouseX > 140&&mouseY>125&&mouseX<190&&mouseY<175&& appState === "dashboard"){
    appState = "assigned"
  }
}
function Assigned(){
  //when the index (i) is less the the total no of cases 
  if (i <= submittedno){
    //getting the stored cases form the dataase
    var path = "ngo submitions/"+ assigned_no[index] + "/latitude"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      latitude = data.val();
    });
    
    var path = "ngo submitions/"+ assigned_no[index] + "/longitude"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      longitude = data.val();
    });
    
    var path = "ngo submitions/"+ assigned_no[index] + "/phone_number"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      phone_number = data.val();
    });

    var path = "ngo submitions/"+ assigned_no[index] + "/animal_type"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      animaltype = data.val();
    });
   
    var path = "ngo submitions/"+ assigned_no[index] + "/issue"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      issue = data.val();
    });
    
    var path = "ngo submitions/"+ assigned_no[index] + "/assigne"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      assigned = data.val();
    });

    var path = "ngo submitions/"+ assigned_no[index] + "/image1"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      image1 = data.val();
    }); 

    var path = "ngo submitions/"+ assigned_no[index] + "/image2"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      image2 = data.val();
    }); 

    var path = "ngo submitions/"+ assigned_no[index] + "/type"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      type = data.val();
    }); 

    //showing the buttons
    next.show();
    previous.show(); 
    
    //reposition-ing the buttons
    previous.position(20,370)
    next.position(125,370)

    //resizing the buttons
    previous.size(105,18)
    next.size(109,18)
  }

  //changing the background
  background_img = taketask;

  // changing the text color
  fill("black")

  // showing the data
  text(issue,70,92)
  text(animaltype,110,213)
  text(phone_number,90,192)

  //when next button is pressed
  next.mousePressed(()=>{
    // when the index is less than the total 
    // add the index so that the next frame gets the next case form -
    // the database
    if (index < assigned_no.length-1){
      index+=1
      z = "not done"
    }
  })

  //when previous button is pressed
  previous.mousePressed(()=>{
    // when the index is less than 0
    // subtract the index so that the next frame gets the previous -
    // case from the database
    if (index>0){
      index-=1
      z = "not done"
    }
  })

  // to show the image only when the image is got
  if (image1 !== "not got" && image2 !== "not got"){

    // to create a blank image before the next one
    upload_imgs = createImg("data:image/png;base64,iVBORw0KGgoAA"+"AANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABa0lEQVR4Xu3VwQkAMAzDwHb/oV3oFPdQJhASJnfbTscYuAVhWnyQglg9CoL1KEhBNAMYTz+kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDeaY+juTosfx4AAAAAElFTkSuQmCC",'')
    upload_imgs.position(200,200)
    upload_imgs.size(160,100)
    upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)

    //creating the image uploaded by the user
    upload_imgs = createImg("data:image/"+type+";base64,"+image1+image2,'');
    upload_imgs.position(200,200)
    upload_imgs.size(160,100)
    upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)
  }
}

function Show(){

  // changing the color of the text
  fill("black");
  textStyle(BOLD)

  // showing the case no
  text("case number: "+i,25,235 )

  //changing the background
  background_img = taketask

  //when the index (i) is less the the total no of cases 
  if (i <= submittedno){

    //getting the info given by the user
    var path = "ngo submitions/"+ i + "/latitude"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      latitude = data.val();
    });

    var path = "ngo submitions/"+ i + "/longitude"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      longitude = data.val();
    });

    var path = "ngo submitions/"+ i + "/animal_type"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      animaltype = data.val();
    });
    
    var path = "ngo submitions/"+ i + "/phone_number"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      phone_number = data.val();
    });
   
    var path = "ngo submitions/"+ i + "/issue"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      issue = data.val();
    });
    
    var path = "ngo submitions/"+ i + "/assigned"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      assigned = data.val();
    });

    var path = "ngo submitions/"+ i + "/image1"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      image1 = data.val();
    }); 
     
    var path = "ngo submitions/"+ i + "/image2"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      image2 = data.val();
    }); 

    var path = "ngo submitions/"+ i + "/type"
    var ngoRef = database.ref(path);
    ngoRef.on("value", (data) => {
      type = data.val();
    }); 

    //showing the buttons
    next.show() ;
    previous.show();  
    assign.show();
  }

  //to change the index so that the  next frame can get the next case
  next.mousePressed(()=>{
    if (i < submittedno){
    i+=1
    z = "not done"
    }
  })

  // if the case is assigned to some one it shows a assigned image
  if (assigned === "true"){
    // to create a blank image before the next one
    upload_imgs = createImg("data:image/png;base64,iVBORw0KGgoAA"+"AANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABa0lEQVR4Xu3VwQkAMAzDwHb/oV3oFPdQJhASJnfbTscYuAVhWnyQglg9CoL1KEhBNAMYTz+kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDeaY+juTosfx4AAAAAElFTkSuQmCC",'')
    upload_imgs.position(200,200)
    upload_imgs.size(160,100)
    upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)

    //to create the assigned image
    image(assigned_s_img, 0,0,250,400)
  }

  if (assigned === "true"&& longitude === undefined){
    // when there is no entry to show no data
    background("white");
    textSize(30);
    fill("red");
    text("No Data",70,100);
    text("No Submmstions Here",0,130)
  }

  //to change the index so that the  next frame can get the previous case
  previous.mousePressed(()=>{
    if (i>1){
      i-=1
      z = "not done"
    }
  }) 

  //repostion-ing the buttons
  previous.position(22,370)
  next.position(164,370)
  assign.position(93,370)

  //resizing the buttons
  previous.size(70,18)
  next.size(70,18)
  assign.size(70,18)

  //hiding the assign button
  assign.hide();
   
  //text re - (styling,sizing,coloring) the texts
  textStyle(BOLD);
  textSize(20);
  fill("black")
  
  //if the case is not assigned 
  if (assigned !== "true" ){

    // to give the pop-up effect when the mouse is over the button. 
    if (mouseX > 125&&mouseY>50&&mouseX<125+53&&mouseY<50+23&& appState === "show"){
      txt_y = 50+4;
      txt_x = 125+1.5;
      image(clickHere ,txt_x ,txt_y,50,20)
    }else if (appState === "show"){
      // else to push back the button
      txt_y = 53;
      txt_x = 125;
      image(clickHere ,txt_x ,txt_y,53,23)
    };

    // showign the assign button      
    assign.show();

    //position-ing the buttons
    previous.position(22,370)
    next.position(164,370)
    assign.position(93,370)

    // re-sizing the buttons
    previous.size(70,18)
    next.size(70,18)
    assign.size(70,18)
 
    // when the mouse is pressed on the assing button
    assign.mousePressed(()=>{
      //creating a path
      var path = "ngo submitions/"+ i

      //updating the database with that, that case is being assinged
      assigned = "true"
      database.ref(path).update({
         assigned:assigned
      });
      // pushing the index to the array
      assigned_no .push(i)
      
      //storing the array to the local storage
      storeItem('assigned_no', assigned_no);
    })

    // showing the data gathered from the database
    textSize(15)
    text(issue,70,92)
    text(animaltype,110,213)
    text(phone_number,90,192)
    //sizing the text
    textSize(14)

    //if the images a defined
    if (image1 !== "not got" && image2 !== "not got"){ 
      z = "done"

      // to create a blank image before the next one
      upload_imgs = createImg("data:image/png;base64,iVBORw0KGgoAA"+"AANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABa0lEQVR4Xu3VwQkAMAzDwHb/oV3oFPdQJhASJnfbTscYuAVhWnyQglg9CoL1KEhBNAMYTz+kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDeaY+juTosfx4AAAAAElFTkSuQmCC",'')
      upload_imgs.position(200,200)
      upload_imgs.size(160,100)
      upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)

      //creating the image uploaded by the user
      upload_imgs = createImg("data:image/"+type+";base64,"+image1+image2,'');
      upload_imgs.position(200,200)
      upload_imgs.size(160,100)
      upload_imgs.position (125-(upload_imgs.width/2)+2.5,260)
    }
  
  
  



    if (image1 !== "not got"&& z === "not done" && image2 !== "not got"){ 
      z = "done"

      // to create a blank image before the next one
      upload_imgs = createImg("data:image/png;base64,iVBORw0KGgoAA"+"AANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABa0lEQVR4Xu3VwQkAMAzDwHb/oV3oFPdQJhASJnfbTscYuAVhWnyQglg9CoL1KEhBNAMYTz+kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDeaY+juTosfx4AAAAAElFTkSuQmCC",'')
      upload_imgs.position(200,200)
      upload_imgs.size(200,120)
      upload_imgs.position (25,220)

      //creating the image uploaded by the user
      upload_imgs = createImg("data:image/"+type+";base64,"+image1+image2,'');
      upload_imgs.position(200,200)
      upload_imgs.size(200,120)
      upload_imgs.position (125-(upload_imgs.width/2),220)
    }
  }
}

///////////////////////////////////////////////////////////////
//
// "Dynamic Registration form using JQuery"
//
// Author: Gonzalo Oyarce
// Date: 2019-05-10
// email: gonzalo.oyarce@gmail.com
// 
///////////////////////////////////////////////////////////////

// Submits the form
$("#registrationForm").submit(function(e){
    
    e.preventDefault();
    
    let URL = "http://localhost:8081/test"; // hard coded, dev purposes
    let data = getObject();
    let method = "POST"; // hard coded, dev purposes
    
    $.ajax({
        type: method,
        url: URL,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(){
                    console.log("posted: ");
                },
        failure: function(error){
                    console.log("error: " + error);
                }
    })
    .done(function(){
        console.log("x posted: ");
    })
    .fail(function(error){
        console.log("x error: " + error);
    });
});


// Holds the forms that are specific for each type of user
let forms = {}; 

// Display the object on the document for dev purposes
var devTestGetObject = function(){
    $("#output").html(JSON.stringify(getObject(), undefined,2));
};

// Dinamycally creates an object base on the inputs available in the DOM
var getObject = function(){
    
    // Output object
    let data = {};
    
    // Generates the keys arrays from the names of input and select elements
    var keys = $.map($("#registrationForm input[name] , #registrationForm select"),function(element, i){
        let name = element.name;
        return name;
    });

    // Retrieves the values the input and select elements
    var values = $.map($("#registrationForm input[name] , #registrationForm select"),function(element, i){
        let value = $(element).val();
        return value;
    });

    // populates the output object
    for (let i = 0; i < keys.length; i++) {
        data[keys[i]] = values[i];
    }

    return data;
};

var checkUserType = function(target){
    
    // When the checkbox clicked is the "Player" option:
    // Clears and disables the user type checkboxes other than Player
    ////////////////////////////////////////////
    if(target == 'isPlayer'){


        let isPlayer = $("input[id='isPlayer']").get(0).checked;
        
        // clear the other user options
        $(".userType2").prop('checked', false);
        

        // Selects the checkboxes for the other players
        let userTypeList2 = $(".userType2");
        if (!isPlayer){ // when player is unselected enables the other options
            userTypeList2.removeAttr('disabled');
        } else { // when player is selected disables the other options
            userTypeList2.attr('disabled', true);
        }
    }
    
    // Then updates the form to match the current
    // user type selection
    ////////////////////////////////////////////
    // selects all the checkbox options
    let userTypeList = $(".userType");
    // loops to add/remove the corresponding forms
    userTypeList.each(function() {

        let userTypeActive = $(this).get(0).checked; // to decide add/remove form
        let userType = $(this).get(0).value; // gets the user type

        if (userTypeActive){ // add form
            // gets the form from the storage and appends it to the holder in the DOM
            $(`.${userType}`).append($(forms[userType]));
            // clears the form from the storage
            forms[userType] = [];           
        
        } else { // remove form
            if(forms[userType].length == 0){ // checks if the form was already removed
                // clones the form and puts it in storage 
                forms[userType] = $(`.${userType} .myContent`).clone().get();
                // clears the form from the DOM
                $(`.${userType} .myContent`).remove();
            }
        }
    });
}

var handler = function(){

    // Initializing the form object
    $(".userType").each(function(userType) {
        forms[$(this).get(0).value] = [];
    });

    // validate players only can be players
    // and shows apropiated sections of the form for each user type:
    // when the page is loaded:
    checkUserType();
    // when any of the checkboxes is clicked:
    $(".userSelector").click(function(event){checkUserType(event.target.id)});
};

$(document).ready(handler);
/**
 * Created by wsm on 5/4/2017.
 */
/// <reference path="angular.js" />
     app.filter("gender", function(){
    return function(gender){
        switch(gender){
            case 1:
                return "Male";
            case 2:
                return "Female";
            case 3:
                return "Not disclosed";
        }
    }
})
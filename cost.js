//duplicate values remove
//
var data = jsonstr;
var servicesData = jsonstr;
var vendor, min, service, max;

var encodings = {
  "anti_vir" : "Anti Virus",
  "wan" : "Wide Area Network",
  "sym_connection" : "System Connection",
  "firewall" : "Fire Wall",
  "filtering" : "Filtering",
  "speed" : "Speed",
  "vendor" : "Vendor",
  "vpn" : "VPN",
  "service" : "Service",
  "e_rate" : "E Rate",
  "_4hr_response" : "Lessthan 4 Hour Response",
  "_27_7_support" : "24/7 Support",
  "monthly_cost" : "Monthly Cost",
  "voip" : "Voip"
};

var addOnSettings = {
  "anti_vir" : "0",
  "wan" : "0",
  "sym_connection" : "0",
  "firewall" : "0",
  "filtering" : "0",
  "vpn" : "0",
  "e_rate" : "0",
  "_4hr_response" : "0",
  "_27_7_support" : "0",
  "voip" : "0",
};

$(document).ready(function() {
      //debugger;
    // Get unique vendor from the list
    var uniqueVendorNames = _.pluck(_.uniq(servicesData, function(obj)
                   {return obj.vendor;}), 'vendor'); 

    _.each(uniqueVendorNames, function(obj) {
        $("#vendor_type").append("<li><a>" + obj + "</a></li>");
    });

   $('.dropdown-menu li a').click(function() {
		//console.log("enterres");
        
        var that = this;
        $('#service2').show();
        $(this).parents(".input-group-btn").find('.btn').html($(this).text() + '&nbsp;&nbsp;<span class="caret"></span>');
        
        // Declare sected vendor name as global function
        window.vendor = $(this).text();
        //var data = jsonstr;

        // Pick objects with selected vendor name and then find unique service types
        window.selectedVendorObjects = _.where(servicesData, {vendor: $(this).text()});
        var uniqueObjects = _.uniq(selectedVendorObjects, function(obj) {
           return obj.service;
        });
        var uniqueServiceNames = _.pluck(uniqueObjects, 'service');
        $("#service_type").empty();
         _.each(uniqueServiceNames, function(obj) {
            $("#service_type").append("<li><a>" + obj + "</a></li>");
        });
        clearTable();

          $('#service_type a').click(function() {
                $('#range1').show(); 
                  $('#serviceType').html($(this).text() + '<span class="caret"></span>');
                  var selectedServiceObjects = _.where(selectedVendorObjects, {service: $(this).text()});
                  window.speedRanges = _.pluck(selectedServiceObjects, 'speed');
                     _.each(speedRanges, function(obj) {
                        $("#bandwidth_range").append("<li><a>" + obj + "</a></li>");
                    });
                    clearTable();

                   $("#bandwidth_range a").click(function() {
                        $(this).parents(".input-group-btn").find('.btn').html($(this).text() + '<span class="caret"></span>');
                        min = $(this).text();
                        maxRange(min, speedRanges);
                        clearTable();
                         $("#max_bandwidth a").click(function() {
                                max = $(this).text();
                                $(this).parents(".input-group-btn").find('.btn').html(max + '<span class="caret"></span>');
                                $('#toggle').show();
                                $('#res').show();
                                clearTable();
                         });
                    });     
                 clearTable();    
            });    
    });

});


function maxRange(min,speedRanges) {

    var that = this;
     $("#max_bandwidth").empty();
     _.each(speedRanges, function(obj) {
            if(parseInt(obj) > that.parseInt(min)) {
                $("#max_bandwidth").append("<li><a>" + obj + "</a></li>"); 
            }       
        }, that);   
}

function result() {
    $('table').show();
    $("#costData").empty();
    var selectedService = $("#serviceType").text();
    var min = parseInt($("#minSpeed").text());
    var max = parseInt($("#maxSpeed").text());

    var that = this;
    
    window.speedRangeSeviceObjects = [];
     _.each(servicesData, function(obj) {
     
            if( (obj.service == selectedService) && (parseInt(obj.speed) > that.parseInt(min))  && (parseInt(obj.speed) < that.parseInt(max))) {
                    window.speedRangeSeviceObjects.push(obj);
                    var matchedAddOns = '';
                    for (var prop in obj) {
                          if( obj[prop] == "1")
                            {   
                                
                                matchedAddOns = matchedAddOns +  window.encodings[prop] + ',';
                            }
                        }

               $("#costData").append("<tr>" + "<td >" + obj.vendor + "</td>" + "<td>" + obj.service + "</td>" + "<td>" + obj.speed + "</td>" + "<td>" + obj.monthly_cost + "</td>" +
                        "<td>" + matchedAddOns + "</td>" + "</tr>");
            }       
        }, that);   

    $('#costtable').dataTable();
}


//check box functionality
$('.customservice').change(function() {
    //debugger;
    $("#costData").empty();
     var propName = $(this).attr('id'); 
     window.addOnSettings[propName] = $('#'+propName).is(':checked') ? "1" : "0";
    renderTable();
});

function renderTable() {
 
 var enabledProps = {};
 for (prop in addOnSettings) {
    if(addOnSettings[prop] == "1") {
        enabledProps[prop] = addOnSettings[prop];
    }
 };

 //debugger;
 var customServiceObjects = _.where(window.speedRangeSeviceObjects, enabledProps);
 _.each(customServiceObjects, function(obj) {
    var selectedAddOns = '';
    for (prop in window.addOnSettings)
    {
        if(window.addOnSettings[prop] == "1") {
            selectedAddOns = selectedAddOns + window.encodings[prop] + ','; 
             $("#costData").append("<tr>" + "<td >" + obj.vendor + "</td>" + "<td>" + obj.service + "</td>" + "<td>" + obj.speed + "</td>" + "<td>" + obj.monthly_cost + "</td>" +
                            "<td>" + selectedAddOns + "</td>" + "</tr>");
        }
    }
    
  });
};

function clearTable()
{
 var tsize=$("#costData tr").size();
                    if(tsize>0)
                    {                       
                        $("#costData").empty();
                        result();
                    }   
}

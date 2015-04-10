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
      
    // Get unique vendor from the list
  
    var uniqueVendorNames = _.pluck(_.uniq(servicesData, function(obj)
                   {return obj.service;}), 'service'); 
         
    _.each(uniqueVendorNames, function(obj) {
        $("#service_type").append("<li><a>" + obj + "</a></li>");
    });

          $('#service_type a').click(function() {
                $('#range1').show(); 
                  $('#serviceType').html($(this).text() + '<span class="caret"></span>');
                  //debugger;
                  var selectedServiceObjects = _.where(servicesData, {service: $(this).text()});
                  
                var selectedServiceTypes  = _.pluck(selectedServiceObjects, 'speed');
                //extracting unique elements from the service type
               var uniqueObjects = _.uniq(selectedServiceObjects, function(obj) {
                            return obj.speed;
                          });
                window.speedRanges=_.pluck(uniqueObjects, 'speed');
                     console.log(selectedServiceObjects);
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

//});


function maxRange(min,speedRanges) {

    var that = this;
     $("#max_bandwidth").empty();
     _.each(speedRanges, function(obj) {
            if(parseInt(obj) > that.parseInt(min)) {
                $("#max_bandwidth").append("<li><a>" + obj + "</a></li>"); 
            }       
        }, that);   
}
  var matchedAddOns = '';
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

console.log(window.matchedAddOns);
//check box functionality
var propName;
$('.customservice').change(function() {
    
    $("#costData").empty();
     propName = $(this).attr('id'); 
    // debugger;
     for(var key in addOnSettings)
     {
     window.addOnSettings[key] = $('#'+key).is(':checked') ? "1" : "0";
     }
    renderTableOverride();
  });

function renderTableOverride()
{
 var selectedService = $("#serviceType").text();
    var min = parseInt($("#minSpeed").text());
    var max = parseInt($("#maxSpeed").text());

    var that = this; 
    window.speedRangeSeviceObjects = [];
     _.each(servicesData, function(obj) {
     
            if( (obj.service == selectedService) && (parseInt(obj.speed) > that.parseInt(min))  && (parseInt(obj.speed) < that.parseInt(max))) {
                    window.speedRangeSeviceObjects.push(obj);
                    var matchedAddOns = '';
                    var matchedAddOns2 = '';
                
                    for (var prop in obj) {
                  
                          
                             if( obj[prop] == "1")
                            {   
                             
                              if(window.addOnSettings[prop] == "1")
                              {
                                 matchedAddOns = matchedAddOns + window.encodings[prop]+',';
                              }
                              else
                              {
                                 matchedAddOns = matchedAddOns+  window.encodings[prop] + ',';
                              }
                            
                            }
                        }

                           for (var prop in obj) {
                            if( obj[prop] == "1"&&window.addOnSettings[prop] == "1")
                            {   

                              matchedAddOns2=matchedAddOns;
                           }
                         }
                       
                   
                 
                   /*if(matchedAddOns2.match(/E Rate/g))
                   {
                   // debugger;
               $("#costData").append("<tr>" + "<td >" + obj.vendor + "</td>" + "<td>" + obj.service + "</td>" + "<td>" + obj.speed + "</td>" + "<td>" + obj.monthly_cost + "</td>" +
                        "<td>" + matchedAddOns2 + "</td>" + "</tr>");
             }*/

            // $("#costData").empty();
             var m=matchedAddOns2.split(",");
             for (j=0;j<m.length-1;j++)
             {
               
                for(var key in addOnSettings)
                {
                window.addOnSettings[key] = $('#'+key).is(':checked') ? "1" : "0";
                   //debugger;
                   if(window.addOnSettings[key]==1)

                   {
                 if(m[j].toLowerCase()==window.encodings[key].toLowerCase())
                 {
                  alert("inner loop");
                  $("#costData").append("<tr style=color:red>" + "<td >" + obj.vendor + "</td>" + "<td>" + obj.service + "</td>" + "<td>" + obj.speed + "</td>" + "<td>" + obj.monthly_cost + "</td>" +
                     "<td>" + matchedAddOns2 + "</td>"  +"</tr>");
                 }
               }
             }
         
             }
            }       
        }, that); 
}


function clearTable()
{
 var tsize=$("#costData tr").size();
                    if(tsize>0)
                    {                       
                        $("#costData").empty();
                        result();
                    }   
}
